import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);

function argValue(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] || null;
}

const dateArg = argValue("--date");
const searchArg = (argValue("--search") || "").toLowerCase();
const today = dateArg || new Date().toISOString().slice(0, 10);

function read(file) {
  try {
    return fs.readFileSync(path.join(root, file), "utf8");
  } catch {
    return "";
  }
}

function listFiles(dir) {
  try {
    return fs.readdirSync(path.join(root, dir)).map((name) => path.join(dir, name));
  } catch {
    return [];
  }
}

function gitLog() {
  try {
    return execFileSync(
      "git",
      [
        "log",
        `--since=${today} 00:00`,
        "--pretty=format:%h | %ad | %an | %s",
        "--date=short",
      ],
      { cwd: root, encoding: "utf8" },
    );
  } catch {
    return "";
  }
}

function matchesSearch(text) {
  if (!searchArg) return true;
  return text.toLowerCase().includes(searchArg);
}

function isRoryLike(text) {
  const lower = text.toLowerCase();
  return (
    lower.includes("author: claude") ||
    lower.includes("author: ro") ||
    lower.includes("author: rory") ||
    lower.includes("cowork") ||
    lower.includes("claude-heartbeat") ||
    lower.includes("updated_by\": \"claude") ||
    lower.includes("updated_by\": \"ro")
  );
}

const bridgeRaw = read("OPS/BRIDGE.json");
let bridge = null;
try {
  bridge = JSON.parse(bridgeRaw);
} catch {
  bridge = null;
}

const receiptHits = [];
for (const file of listFiles("OPS/receipts")) {
  if (!file.endsWith(".md")) continue;
  const body = read(file);
  if (!body.includes(`Date: ${today}`)) continue;
  if (!isRoryLike(body)) continue;
  if (!matchesSearch(`${file}\n${body}`)) continue;
  const intent = body.match(/^Intent:\s*(.+)$/m)?.[1] || "No intent line";
  const result = body.match(/^Result:\s*(.+)$/m)?.[1] || "No result line";
  const author = body.match(/^Author:\s*(.+)$/m)?.[1] || "Unknown author";
  receiptHits.push({ file, author, intent, result });
}

const commitHits = gitLog()
  .split("\n")
  .filter(Boolean)
  .filter((line) => /rory|ro|claude|cowork/i.test(line))
  .filter(matchesSearch);

const questionHits = [];
for (const file of listFiles("OPS/questions")) {
  if (!file.endsWith(".md")) continue;
  const body = read(file);
  if (!body.includes(today)) continue;
  if (!matchesSearch(`${file}\n${body}`)) continue;
  const status = body.match(/^Status:\s*(.+)$/m)?.[1] || "Unknown";
  const to = body.match(/^To:\s*(.+)$/m)?.[1] || "Unknown";
  questionHits.push({ file, to, status });
}

const bridgeLines = [];
if (bridge) {
  const globalText = JSON.stringify(bridge.global || {}, null, 2);
  if (matchesSearch(globalText)) {
    bridgeLines.push(`Global: ${bridge.global?.sync_status || "UNKNOWN"} | ${bridge.global?.next_action || "No next action"}`);
  }
  for (const [key, product] of Object.entries(bridge.products || {})) {
    const text = JSON.stringify(product, null, 2);
    if (!matchesSearch(`${key}\n${text}`)) continue;
    const roryOwned = /claude|cowork|ro|rory|human/i.test(text);
    if (!roryOwned && searchArg) continue;
    bridgeLines.push(
      `${key}: ${product.sync_status || "UNKNOWN"} | lane ${product.current_lane || "none"} | next ${product.next_action || "none"}`,
    );
  }
}

console.log(`# Rory Activity Query`);
console.log(`Date: ${today}`);
if (searchArg) console.log(`Search: ${searchArg}`);
console.log("");

if (!receiptHits.length && !commitHits.length && !questionHits.length && !bridgeLines.length) {
  console.log("MISSING: I do not see a receipt, commit, bridge item, or question entry proving Rory activity for this query.");
  process.exit(0);
}

if (receiptHits.length) {
  console.log("## Receipts");
  for (const hit of receiptHits) {
    console.log(`- ${hit.file} | ${hit.author} | ${hit.result} | ${hit.intent}`);
  }
  console.log("");
}

if (commitHits.length) {
  console.log("## Commits");
  for (const line of commitHits) console.log(`- ${line}`);
  console.log("");
}

if (questionHits.length) {
  console.log("## Questions");
  for (const hit of questionHits) {
    console.log(`- ${hit.file} | to ${hit.to} | ${hit.status}`);
  }
  console.log("");
}

if (bridgeLines.length) {
  console.log("## Bridge State");
  for (const line of bridgeLines) console.log(`- ${line}`);
}

