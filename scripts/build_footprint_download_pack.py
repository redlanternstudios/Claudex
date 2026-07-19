from __future__ import annotations

import html
import re
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

from pypdf import PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "footprint_download_pack"
TMP = ROOT / "tmp" / "pdfs" / "footprint_download_pack"
LOGO = ROOT / "rls_logo_v2.png"

BLACK = HexColor("#07080D")
INK = HexColor("#1B1C24")
RED = HexColor("#D92532")
CREAM = HexColor("#F7F2EE")
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#6B727C")
LINE = HexColor("#DDD6CF")

DOCUMENTS = [
    ("OPS/FOOTPRINT_N8N_KEYMON.md", "Footprint_n8n_Keymon_Instructions.pdf"),
    ("OPS/FOOTPRINT_SUPABASE_SETUP.md", "Footprint_Supabase_Instructions.pdf"),
    ("OPS/FOOTPRINT_POSTHOG_SETUP.md", "Footprint_PostHog_Instructions.pdf"),
    ("OPS/FOOTPRINT_SENTRY_SETUP.md", "Footprint_Sentry_Instructions.pdf"),
    ("OPS/FOOTPRINT_DOWNSTREAM_ACCOUNT_MAP.md", "Footprint_Downstream_Account_Map.pdf"),
    (
        "OPS/FOOTPRINT_SELF_SUSTAINING_CANDIDATE_ENGINE_CTP_20260714.md",
        "Footprint_Self_Sustaining_Candidate_Engine_CTP.pdf",
    ),
]

SIGNING_FORMS = [
    ROOT / "output/pdf/Footprint_Authority_Rory_Semeah.pdf",
    ROOT / "output/pdf/Footprint_Authority_Homira_Gitesatani.pdf",
    ROOT / "output/pdf/Footprint_Authority_Keymon.pdf",
]


def styles():
    base = getSampleStyleSheet()
    return {
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=21,
            leading=24,
            textColor=INK,
            spaceAfter=15,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=RED,
            borderColor=RED,
            borderWidth=0,
            borderPadding=(0, 0, 4, 0),
            spaceBefore=10,
            spaceAfter=6,
            keepWithNext=True,
        ),
        "h3": ParagraphStyle(
            "H3",
            parent=base["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=12,
            textColor=INK,
            spaceBefore=7,
            spaceAfter=4,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=12.2,
            textColor=INK,
            spaceAfter=5,
        ),
        "list": ParagraphStyle(
            "List",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=12.2,
            leftIndent=18,
            firstLineIndent=-15,
            textColor=INK,
            spaceAfter=3,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.5,
            leading=10,
            textColor=MUTED,
            spaceAfter=4,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=27,
            leading=31,
            alignment=TA_CENTER,
            textColor=INK,
            spaceAfter=12,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=11,
            leading=15,
            alignment=TA_CENTER,
            textColor=MUTED,
        ),
    }


def inline_markup(text: str) -> str:
    link_pattern = re.compile(r"\[([^\]]+)\]\((https?://[^)]+)\)")
    code_pattern = re.compile(r"`([^`]+)`")
    result = []
    cursor = 0
    for match in link_pattern.finditer(text):
        result.append(html.escape(text[cursor : match.start()]))
        label = html.escape(match.group(1))
        url = html.escape(match.group(2), quote=True)
        result.append(f'<link href="{url}" color="#D92532"><u>{label}</u></link>')
        cursor = match.end()
    result.append(html.escape(text[cursor:]))
    marked = "".join(result)
    marked = code_pattern.sub(lambda m: f'<font name="Courier">{html.escape(m.group(1))}</font>', marked)
    for label, color in (
        ("VERIFIED:", "#16784C"),
        ("PARTIAL:", "#A76200"),
        ("ASSUMED:", "#7A4A9E"),
        ("UNKNOWN:", "#A11F2B"),
    ):
        marked = marked.replace(label, f'<font color="{color}"><b>{label}</b></font>')
    return marked


def markdown_story(path: Path, style_map, include_title=True):
    story = []
    pending_title = True
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line:
            story.append(Spacer(1, 3))
            continue
        if line.startswith("# "):
            if include_title or not pending_title:
                story.append(Paragraph(inline_markup(line[2:]), style_map["h1"]))
            pending_title = False
            continue
        if line.startswith("## "):
            story.append(Paragraph(inline_markup(line[3:].upper()), style_map["h2"]))
            continue
        if line.startswith("### "):
            story.append(Paragraph(inline_markup(line[4:]), style_map["h3"]))
            continue
        numbered = re.match(r"^(\d+)\.\s+(.*)$", line)
        if numbered:
            number, content = numbered.groups()
            story.append(
                Paragraph(
                    f'<font color="#D92532"><b>{number}.</b></font>&nbsp;&nbsp;{inline_markup(content)}',
                    style_map["list"],
                )
            )
            continue
        if re.match(r"^(Status|Owner|Purpose|Date|Rule|GOAL|CONSTRAINTS|FORMAT|FAILURE):", line):
            story.append(Paragraph(inline_markup(line), style_map["meta"]))
            continue
        story.append(Paragraph(inline_markup(line), style_map["body"]))
    return story


def header_footer(canvas, doc):
    width, height = letter
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)

    canvas.setFillColor(BLACK)
    canvas.rect(0, height - 70, width, 70, fill=1, stroke=0)
    canvas.drawImage(
        ImageReader(str(LOGO)),
        30,
        height - 57,
        width=214,
        height=49,
        preserveAspectRatio=True,
        anchor="w",
    )
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 6.7)
    canvas.drawRightString(580, height - 30, "FOOTPRINT OPERATING PACK")
    canvas.setFont("Helvetica", 5.9)
    canvas.drawRightString(580, height - 42, "BY RED, LLC  |  EST. 2015")

    canvas.setFillColor(WHITE)
    canvas.rect(0, height - 81, width, 11, fill=1, stroke=0)
    canvas.setStrokeColor(BLACK)
    canvas.setLineWidth(3.6)
    for x in range(-20, 640, 18):
        canvas.line(x, height - 81, x + 11, height - 70)

    canvas.setFillColor(BLACK)
    canvas.rect(0, 0, width, 27, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 5.4)
    canvas.drawString(27, 10, "BUILD IN PUBLIC. OPERATE IN TRUTH.")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica-Bold", 5.1)
    canvas.drawCentredString(width / 2, 10, "REDLANTERN STUDIOS  |  EST. 2015  |  BY RED, LLC")
    canvas.drawRightString(584, 10, f"PAGE {doc.page}")
    canvas.restoreState()


def build_pdf(source: Path, output: Path, title: str):
    style_map = styles()
    doc = SimpleDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=0.55 * inch,
        rightMargin=0.55 * inch,
        topMargin=1.27 * inch,
        bottomMargin=0.53 * inch,
        title=title,
        author="RedLantern Studios",
    )
    story = markdown_story(source, style_map)
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)


def build_master(output: Path):
    style_map = styles()
    doc = SimpleDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=0.55 * inch,
        rightMargin=0.55 * inch,
        topMargin=1.27 * inch,
        bottomMargin=0.53 * inch,
        title="Footprint Setup and Candidate Engine Master Pack",
        author="RedLantern Studios",
    )
    story = [
        Spacer(1, 1.25 * inch),
        Paragraph("FOOTPRINT", style_map["cover_title"]),
        Paragraph("SETUP AND CANDIDATE ENGINE MASTER PACK", style_map["cover_title"]),
        Spacer(1, 12),
        Paragraph(
            "Manual account actions, Keymon handoff, analytics setup, monitoring setup, downstream account map, and the self sustaining candidate engine CTP.",
            style_map["cover_subtitle"],
        ),
        Spacer(1, 24),
        Paragraph("BY RED, LLC  |  EST. 2015", style_map["cover_subtitle"]),
    ]
    for index, (relative_source, _) in enumerate(DOCUMENTS, start=1):
        source = ROOT / relative_source
        story.append(PageBreak())
        story.append(Paragraph(f"SECTION {index}", style_map["meta"]))
        story.extend(markdown_story(source, style_map))
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)


def merge_pdf_files(paths, output):
    writer = PdfWriter()
    for path in paths:
        writer.append(str(path))
    with output.open("wb") as handle:
        writer.write(handle)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)

    built = []
    for relative_source, filename in DOCUMENTS:
        source = ROOT / relative_source
        output = OUTPUT / filename
        build_pdf(source, output, source.stem.replace("_", " ").title())
        built.append(output)

    master = OUTPUT / "Footprint_Setup_and_Candidate_Engine_Master_Pack.pdf"
    build_master(master)
    built.append(master)

    complete = OUTPUT / "Footprint_Complete_Manual_and_Authority_Pack.pdf"
    merge_pdf_files([master, *SIGNING_FORMS], complete)
    built.append(complete)

    bundle = OUTPUT / "Footprint_All_Downloadable_PDFs.zip"
    with ZipFile(bundle, "w", ZIP_DEFLATED) as archive:
        for path in [*built, *SIGNING_FORMS]:
            archive.write(path, arcname=path.name)

    print("\n".join(str(path) for path in [*built, bundle]))


if __name__ == "__main__":
    main()
