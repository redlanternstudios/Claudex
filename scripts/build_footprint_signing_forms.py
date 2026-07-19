from pathlib import Path
import subprocess
import sys
from zipfile import ZIP_DEFLATED, ZipFile

from PIL import Image
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf"
TMP = ROOT / "tmp" / "pdfs" / "footprint_signing_forms"
LOGO = ROOT / "rls_logo_v2.png"
FLAT_LOGO = TMP / "rls_logo_flat.jpg"
LOGO_FILES = [TMP / f"rls_logo_flat_{index}.jpg" for index in range(1, 4)]

BLACK = HexColor("#07080D")
INK = HexColor("#1B1C24")
RED = HexColor("#D92532")
CREAM = HexColor("#F7F2EE")
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#6B727C")
LINE = HexColor("#DDD6CF")


FORMS = [
    {
        "slug": "Rory_Semeah",
        "title": "RORY SEMEAH",
        "subtitle": "MANAGING AUTHORITY",
        "role": "Managing member and executive authority for Footprint under By Red, LLC",
        "grants": [
            "Approve or deny Footprint public posts, responses, and introductions.",
            "Direct corrections, pauses, removals, and emergency stops.",
            "Authorize the team monitored Footprint approval inbox.",
        ],
        "limits": [
            "No public action without recorded human approval during the first ninety days.",
            "No financial, legal, employment, or partnership commitment through Footprint.",
            "No password, token, or personal account credential sharing.",
        ],
        "statement": "I grant Footprint the limited authority stated here for ninety days. I may revoke it at any time in writing.",
        "name_label": "Rory Semeah",
    },
    {
        "slug": "Homira_Gitesatani",
        "title": "HOMIRA GITESATANI",
        "subtitle": "FOUNDING STEWARD",
        "role": "Public founding steward for the invite only Footprint founding cohort",
        "grants": [
            "Use her own LinkedIn account for personal and permitted founding invitations.",
            "Operate the Footprint Page within approved content and consent rules.",
            "Own participant care, responses, corrections, and relationship follow through.",
        ],
        "limits": [
            "No mass outreach, automated personal invitations, or account credential sharing.",
            "No promise of a job, placement, interview, introduction, reach, or outcome.",
            "No public action without recorded human approval during the first ninety days.",
        ],
        "statement": "I accept the Founding Steward role and grant the limited authority stated here for ninety days. I may revoke it at any time in writing.",
        "name_label": "Homira Gitesatani",
    },
    {
        "slug": "Keymon",
        "title": "KEYMON",
        "subtitle": "BACKUP REVIEW AND STOP AUTHORITY",
        "role": "Backup human reviewer and emergency stop authority when Ro or Homira is unavailable",
        "grants": [
            "Review evidence, demand, public candidates, and introduction candidates.",
            "Approve, deny, pause, or stop Footprint actions inside the recorded policy.",
            "Escalate unsafe, unclear, unfair, or unsupported actions.",
        ],
        "limits": [
            "This form does not authorize Footprint to publish as Keymon.",
            "This form does not authorize external messages or commitments as Keymon.",
            "Identity use requires separate written permission for the exact action.",
        ],
        "statement": "I accept backup review and emergency stop authority for ninety days. I may revoke it at any time in writing.",
        "name_label": "Legal name",
    },
]


def fit_text(c, text, x, y, max_width, font="Helvetica", size=8.2, leading=11, color=INK):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def section(c, label, y):
    c.setFillColor(RED)
    c.setFont("Helvetica-Bold", 6.5)
    c.drawString(44, y, label.upper())
    c.setStrokeColor(RED)
    c.setLineWidth(0.8)
    c.line(44, y - 4, 568, y - 4)
    return y - 17


def bullet_list(c, items, y):
    for item in items:
        c.setFillColor(RED)
        c.circle(49, y + 2, 1.7, fill=1, stroke=0)
        y = fit_text(c, item, 58, y, 500, size=8.1, leading=10.5) - 3
    return y


def field(c, prefix, label, field_name, x, y, width):
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 6.2)
    c.drawString(x, y + 17, label.upper())
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.rect(x, y, width, 15, fill=1, stroke=1)


def draw_form_page(c, data, page_number=1, page_count=1, logo_index=0):
    width, height = letter

    c.setFillColor(CREAM)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    c.setFillColor(BLACK)
    c.rect(0, height - 78, width, 78, fill=1, stroke=0)
    logo = ImageReader(str(LOGO_FILES[logo_index]))
    c.drawImage(logo, 34, height - 61, width=226, height=52, preserveAspectRatio=True, anchor="w")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 7)
    c.drawRightString(576, height - 33, "FOOTPRINT AUTHORITY")
    c.setFont("Helvetica", 6.2)
    c.drawRightString(576, height - 45, "BY RED, LLC  |  EST. 2015")

    c.setFillColor(WHITE)
    c.rect(0, height - 90, width, 12, fill=1, stroke=0)
    c.setStrokeColor(BLACK)
    c.setLineWidth(4)
    for x in range(-20, 640, 18):
        c.line(x, height - 90, x + 12, height - 78)

    y = height - 120
    c.setFillColor(RED)
    c.setFont("Helvetica-Bold", 6.5)
    c.drawString(44, y, "NINETY DAY HUMAN APPROVAL AGREEMENT")
    y -= 26
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(44, y, data["title"])
    y -= 22
    c.setFillColor(RED)
    c.setFont("Helvetica-Bold", 15)
    c.drawString(44, y, data["subtitle"])
    y -= 24

    c.setFillColor(BLACK)
    c.rect(44, y - 37, 524, 42, fill=1, stroke=0)
    c.setFillColor(RED)
    c.setFont("Helvetica-Bold", 6.2)
    c.drawString(58, y - 9, "ROLE")
    c.setFillColor(WHITE)
    y = fit_text(
        c,
        data["role"],
        58,
        y - 22,
        490,
        font="Helvetica-Bold",
        size=8.4,
        leading=10,
        color=WHITE,
    ) - 28

    y = section(c, "Authority granted", y)
    y = bullet_list(c, data["grants"], y)
    y = section(c, "Hard limits", y - 2)
    y = bullet_list(c, data["limits"], y)

    y = section(c, "Approval loop", y - 1)
    y = fit_text(
        c,
        "For the first ninety days, every public post and every introduction requires a recorded approval sent to the dedicated team monitored Footprint inbox. Silence is not approval. The approval record must name the approver, action, date, and final version.",
        44,
        y,
        524,
        size=8.1,
        leading=10.3,
    ) - 9

    field(c, data["slug"], "Dedicated Footprint approval inbox", "approval_inbox", 44, y - 15, 524)
    y -= 48

    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.rect(44, y - 47, 524, 52, fill=1, stroke=1)
    c.setFillColor(RED)
    c.setFont("Helvetica-Bold", 6.2)
    c.drawString(56, y - 11, "AGREEMENT")
    fit_text(c, data["statement"], 56, y - 25, 498, size=8.1, leading=10.2)
    y -= 68

    field(c, data["slug"], data["name_label"], "printed_name", 44, y, 250)
    field(c, data["slug"], "Date", "date", 318, y, 110)
    field(c, data["slug"], "Authority granted", "authority_granted", 446, y, 122)
    y -= 53

    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 6.2)
    c.drawString(44, y + 17, "SIGNATURE")
    c.setStrokeColor(INK)
    c.setLineWidth(0.8)
    c.line(44, y, 568, y)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 6.5)
    c.drawString(44, y - 13, "Sign with Preview, Adobe Acrobat, or by hand after printing.")

    c.setFillColor(BLACK)
    c.rect(0, 0, width, 28, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 5.7)
    c.drawString(28, 11, "BUILD IN PUBLIC. OPERATE IN TRUTH.")
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 5.5)
    c.drawCentredString(width / 2, 11, "REDLANTERN STUDIOS  |  EST. 2015  |  BY RED, LLC")
    c.drawRightString(584, 11, f"PAGE {page_number} OF {page_count}")


def draw_form(data, path, logo_index=0):
    c = canvas.Canvas(str(path), pagesize=letter)
    c.setTitle(f"Footprint Authority Form - {data['title']}")
    draw_form_page(c, data, logo_index=logo_index)

    c.save()


def draw_packet(forms, output_path):
    c = canvas.Canvas(str(output_path), pagesize=letter)
    c.setTitle("Footprint Authority Signing Packet")
    page_count = len(forms)
    for page_number, form in enumerate(forms, start=1):
        draw_form_page(c, form, page_number, page_count, page_number - 1)
        c.showPage()
    c.save()


def build_forms_bundle(paths, output_path):
    with ZipFile(output_path, "w", ZIP_DEFLATED) as bundle:
        for path in paths:
            bundle.write(path, arcname=path.name)


def prepare_assets():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    with Image.open(LOGO) as source_logo:
        flat_logo = source_logo.convert("RGB")
        flat_logo.save(FLAT_LOGO, format="JPEG", quality=96, optimize=True)
        for logo_file in LOGO_FILES:
            flat_logo.save(logo_file, format="JPEG", quality=96, optimize=True)


def main():
    prepare_assets()
    if len(sys.argv) == 3 and sys.argv[1] == "--form":
        index = int(sys.argv[2])
        form = FORMS[index]
        path = OUTPUT / f"Footprint_Authority_{form['slug']}.pdf"
        draw_form(form, path, index)
        return

    paths = []
    for index, form in enumerate(FORMS):
        path = OUTPUT / f"Footprint_Authority_{form['slug']}.pdf"
        subprocess.run([sys.executable, str(Path(__file__).resolve()), "--form", str(index)], check=True)
        paths.append(path)
    bundle_path = OUTPUT / "Footprint_Authority_Forms.zip"
    build_forms_bundle(paths, bundle_path)
    print("\n".join(str(path) for path in [*paths, bundle_path]))


if __name__ == "__main__":
    main()
