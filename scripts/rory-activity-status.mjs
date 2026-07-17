#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { routeArtifact } from "./lib/content-routing.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const args = process.argv.slice(2);

function argValue(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] || null;
}

function pacificParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    date: `${map.year}-${map.month}-${map.day}`,
    hhmm: `${map.hour}${map.minute}`,
    display: `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute} America/Los_Angeles`,
  };
}

function runActivity(date, search = null) {
  const command = [path.join(root, "scripts", "rory-activity.mjs"), "--date", date];
  if (search) command.push("--search", search);
  return execFileSync(process.execPath, command, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function openQuestionCounts() {
  const indexPath = path.join(root, "OPS", "questions", "INDEX.md");
  try {
    const index = fs.readFileSync(indexPath, "utf8");
    return {
      asked: (index.match(/\|\s*Q-/g) || []).length,
      answered: (index.match(/\|\s*ANSWERED\s*\|/g) || []).length,
      open: (index.match(/\|\s*OPEN\s*\|/g) || []).length,
    };
  } catch {
    return { asked: 0, answered: 0, open: 0 };
  }
}

function bridgeSummary() {
  try {
    const bridge = JSON.parse(fs.readFileSync(path.join(root, "OPS", "BRIDGE.json"), "utf8"));
    const global = bridge.global || {};
    const products = bridge.products || {};
    const active = Object.entries(products)
      .filter(([, product]) => /claude|cowork|ro|rory|human/i.test(JSON.stringify(product)))
      .map(([key, product]) => ({
        product: key,
        lane: product.current_lane || "none",
        status: product.sync_status || "UNKNOWN",
        next: product.next_action || "none",
        blockers: product.blockers || [],
      }));
    return { global, active };
  } catch {
    return { global: {}, active: [] };
  }
}

function writeError(error, parts) {
  const errorDir = path.join(root, "OPS", "receipts", "heartbeat-errors");
  ensureDir(errorDir);
  const errorPath = path.join(errorDir, `RORY_HEARTBEAT_ERROR_${parts.date}_${parts.hhmm}.md`);
  const content = `# Rory Heartbeat Error

Failure timestamp: ${parts.display}
Scenario name: Rory Activity Heartbeat
Failed module: scripts/rory-activity-status.mjs
Error message: ${String(error.message || error).replace(/\n/g, " ").slice(0, 1000)}
Fallback action: Keep last status file. Answer status questions from live query helper if available.
KP review status: Needs Review
`;
  fs.writeFileSync(errorPath, content, "utf8");
  return errorPath;
}

const requestedDate = argValue("--date");
const shouldGit = args.includes("--git");
const parts = requestedDate ? { ...pacificParts(), date: requestedDate } : pacificParts();

function gitCommitStatus(paths) {
  if (!shouldGit) return;
  const relativePaths = paths.map((item) => path.relative(root, item));
  const status = execFileSync("git", ["status", "--porcelain"], { cwd: root, encoding: "utf8" });
  const allowed = new Set(relativePaths);
  const dirty = status
    .split("\n")
    .filter(Boolean)
    .map((line) => line.slice(3));
  const unrelated = dirty.filter((item) => !allowed.has(item));
  if (unrelated.length) {
    console.log(`Skipped status commit because unrelated Claudex changes exist: ${unrelated.join(", ")}`);
    return;
  }
  execFileSync("git", ["add", ...relativePaths], { cwd: root, stdio: "inherit" });
  const commitMessage = `status: Rory activity ${parts.date} ${parts.hhmm}`;
  try {
    execFileSync("git", ["commit", "-m", commitMessage], { cwd: root, stdio: "inherit" });
  } catch (error) {
    console.log(`Skipped status commit: ${error.message}`);
  }
}

try {
  const activity = runActivity(parts.date);
  const amina = runActivity(parts.date, "amina");
  const questions = openQuestionCounts();
  const bridge = bridgeSummary();
  const hasProof = !activity.includes("MISSING: I do not see");
  const directAnswer = hasProof
    ? `VERIFIED: Claudex has same-day Rory/Ro/Claude/Cowork activity evidence for ${parts.date}.`
    : "MISSING: I do not see a receipt or bridge update proving Rory started this.";
  const activeLines = bridge.active.length
    ? bridge.active.map((item) => `- Product: ${item.product}\n  Lane: ${item.lane}\n  Work: ${item.next}\n  Status: ${item.status}\n  Evidence: OPS/BRIDGE.json`).join("\n")
    : "- MISSING: No Rory-linked active work found in OPS/BRIDGE.json.";
  const blockers = bridge.active
    .flatMap((item) => (item.blockers || []).map((blocker) => `- ${item.product}: ${blocker}`));
  const content = `# Rory Activity Status

Receipt timestamp: ${parts.display}

## Direct Answer

${directAnswer}

## Evidence

\`\`\`text
${activity}
\`\`\`

## Active Work

${activeLines}

## Questions

- Asked: ${questions.asked}
- Answered: ${questions.answered}
- Still open: ${questions.open}

## Blockers

${blockers.length ? blockers.join("\n") : "- VERIFIED: No Rory-linked blocker extracted from active bridge products."}

## Missing Proof

- Rory activity is only visible after Rory or his heartbeat writes and pushes receipts, bridge updates, commits, question answers, or directives with evidence.
- Mobile Codex can answer only when it can access this Claudex repo state or a synced copy.

## Amina Search Snapshot

\`\`\`text
${amina}
\`\`\`

## Truth Rule

Rory did something only if proven by same-day receipt, commit, bridge update, question answer, or directive marked done with evidence.
`;

  const snapshotRoute = routeArtifact({
    type: "status_snapshot",
    product: "Claudex",
    topic: "Rory activity",
    date: parts.date,
    time: parts.hhmm,
  });
  const liveRoute = routeArtifact({
    type: "live_status",
    product: "Claudex",
    topic: "Rory activity",
    date: parts.date,
  });
  const stampPath = path.join(root, snapshotRoute.canonical_path);
  const todayPath = path.join(root, liveRoute.canonical_path);
  ensureDir(path.dirname(stampPath));
  ensureDir(path.dirname(todayPath));
  fs.writeFileSync(stampPath, content, "utf8");
  fs.writeFileSync(todayPath, content, "utf8");
  console.log(`Wrote ${path.relative(root, stampPath)}`);
  console.log(`Wrote ${path.relative(root, todayPath)}`);
  gitCommitStatus([stampPath, todayPath]);
} catch (error) {
  const errorPath = writeError(error, parts);
  console.error(`Rory activity heartbeat failed. Error receipt: ${path.relative(root, errorPath)}`);
  process.exitCode = 1;
}
