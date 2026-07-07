# By Red, LLC — Architecture Diagram Doc (RLS Branded, landscape, diagram first)
import html

LOGO = open('logo_b64.txt').read().strip()

RED    = '#D92532'
INK    = '#1B1C24'
BLACK  = '#07080D'
CREAM  = '#F7F2EE'
GRAY   = '#6B727C'
WHITE  = '#FFFFFF'
GREEN  = '#1E9E52'
BLUE   = '#2E6BD6'
PURPLE = '#7C4DCC'
YELLOW = '#C79A12'
ORANGE = '#D97706'
TEAL   = '#0F9488'
GOLD   = '#B9782A'

BADGE = {
    'LIVE':        (GREEN,  WHITE),
    'DOGFOOD':     (PURPLE, WHITE),
    'BUILD':       (PURPLE, WHITE),
    'PAUSED':      (YELLOW, WHITE),
    'UNKNOWN':     (GRAY,   WHITE),
    'FRAMEWORK':   (BLUE,   WHITE),
    'CLIENT LIVE': (TEAL,   WHITE),
    'CLIENT BUILD':(TEAL,   WHITE),
    'BLOCKED':     (ORANGE, WHITE),
    'INTERNAL':    (BLUE,   WHITE),
    'PENDING':     (ORANGE, WHITE),
    'VERIFIED':    (GREEN,  WHITE),
    'LOCKED':      (INK,    WHITE),
    'IN REVIEW':   (BLUE,   WHITE),
}

def esc(s): return html.escape(s, quote=True)

def badge(x, y, text, anchor='middle'):
    bg, fg = BADGE.get(text, (GRAY, WHITE))
    w = len(text) * 8.2 + 18
    bx = x - w/2 if anchor == 'middle' else x
    return (f'<rect x="{bx:.0f}" y="{y-12}" width="{w:.0f}" height="19" rx="9.5" fill="{bg}"/>'
            f'<text x="{bx + w/2:.0f}" y="{y+2.5}" text-anchor="middle" font-size="11.5" font-weight="800" '
            f'letter-spacing="1" fill="{fg}">{esc(text)}</text>')

def node(x, y, mono, label, sub, status, color=RED, iw=66):
    """Icon node like the AWS reference: colored rounded square + label + sub + badge. (x,y)=icon center."""
    parts = [
        f'<rect x="{x-iw/2}" y="{y-iw/2}" width="{iw}" height="{iw}" rx="13" fill="{color}"/>',
        f'<text x="{x}" y="{y+8}" text-anchor="middle" font-size="{23 if len(mono)<3 else 18}" '
        f'font-weight="900" fill="{WHITE}" letter-spacing="0.5">{esc(mono)}</text>',
        f'<text x="{x}" y="{y+iw/2+23}" text-anchor="middle" font-size="16" font-weight="800" fill="{INK}">{esc(label)}</text>',
    ]
    yy = y + iw/2 + 41
    if sub:
        parts.append(f'<text x="{x}" y="{yy}" text-anchor="middle" font-size="12" font-weight="600" fill="{GRAY}">{esc(sub)}</text>')
        yy += 18
    if status:
        parts.append(badge(x, yy + 4, status))
    return ''.join(parts)

def region(x, y, w, h, label, color=RED):
    """Dashed region box with a small flag tag, like the AWS Region boxes."""
    tw = len(label) * 9.4 + 44
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="none" stroke="{color}" '
            f'stroke-width="1.6" stroke-dasharray="7 5"/>'
            f'<rect x="{x}" y="{y-14}" width="{tw:.0f}" height="28" rx="6" fill="{color}"/>'
            f'<rect x="{x+8}" y="{y-6}" width="13" height="13" rx="3" fill="{WHITE}" opacity="0.9"/>'
            f'<text x="{x+29}" y="{y+5}" font-size="13" font-weight="800" letter-spacing="1.2" '
            f'fill="{WHITE}">{esc(label)}</text>')

def lbl(mid_x, mid_y, label):
    w = len(label)*7.2 + 12
    return (f'<rect x="{mid_x-w/2:.0f}" y="{mid_y-11}" width="{w:.0f}" height="19" rx="3" fill="{WHITE}" opacity="0.95"/>'
            f'<text x="{mid_x:.0f}" y="{mid_y+3}" text-anchor="middle" font-size="12" font-weight="700" '
            f'fill="{INK}">{esc(label)}</text>')

def arrow(x1, y1, x2, y2, label='', lx=None, ly=None, color=INK):
    s = (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="1.5" '
         f'stroke-dasharray="5 4" marker-end="url(#arr)"/>')
    if label:
        s += lbl(lx if lx is not None else (x1+x2)/2, ly if ly is not None else (y1+y2)/2 - 7, label)
    return s

def elbow(points, label='', lx=0, ly=0, color=INK):
    d = 'M' + ' L'.join(f'{px},{py}' for px, py in points)
    s = (f'<path d="{d}" fill="none" stroke="{color}" stroke-width="1.5" '
         f'stroke-dasharray="5 4" marker-end="url(#arr)"/>')
    if label:
        s += lbl(lx, ly, label)
    return s

DEFS = f'''<defs><marker id="arr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
<path d="M0,0 L8,4.5 L0,9 Z" fill="{INK}"/></marker></defs>'''

# ---------------------------------------------------------------- PAGE 1 SVG
P1 = ['<svg viewBox="0 0 1460 952" xmlns="http://www.w3.org/2000/svg" font-family="Helvetica, Arial, sans-serif">', DEFS]
P1.append(f'<rect x="0" y="0" width="1460" height="952" rx="14" fill="{WHITE}"/>')

# Outer entity region
P1.append(region(28, 96, 1404, 830, 'BY RED, LLC · COLORADO 20151007791 · GOOD STANDING · EST. 2015', BLACK))

# Entity node (top center)
P1.append(f'<rect x="600" y="26" width="260" height="60" rx="10" fill="{BLACK}"/>')
P1.append(f'<rect x="614" y="41" width="30" height="30" rx="6" fill="{RED}"/>')
P1.append(f'<text x="629" y="61" text-anchor="middle" font-size="16" font-weight="900" fill="{WHITE}">R</text>')
P1.append(f'<text x="656" y="52" font-size="16" font-weight="900" fill="{WHITE}" letter-spacing="1">BY RED, LLC</text>')
P1.append(f'<text x="656" y="71" font-size="10.5" font-weight="600" fill="#DDD6CF" letter-spacing="0.5">PARENT ENTITY · EIN CONFIRMED</text>')

# Arrows entity -> regions
P1.append(arrow(660, 86, 480, 158, 'DBA PENDING', 500, 120))
P1.append(arrow(760, 86, 1150, 158, 'INTERNAL', 1035, 116))
P1.append(elbow([(790, 86), (980, 130), (980, 560), (1085, 612)], 'DBA PENDING', 980, 370))

# --- RedLantern Studios region (products)
P1.append(region(60, 168, 900, 730, 'REDLANTERN STUDIOS · PRODUCT STUDIO', RED))
cols = [210, 510, 810]
rows = [268, 508, 748]
products = [
    ('AM', 'Amina', 'Faith companion · iOS in review', 'DOGFOOD', RED),
    ('AH', 'Authentic Hadith', 'authentichadith.app', 'LIVE', GOLD),
    ('HW', 'HireWire', 'AI Career OS', 'PAUSED', INK),
    ('TS', 'TradeSwarm', 'Halal capital engine', 'BUILD', GOLD),
    ('TL', 'The Lantern Daily', 'Muslim tech newsletter', 'BUILD', GOLD),
    ('QB', 'QBos', 'Build constitution OS', 'FRAMEWORK', INK),
    ('DX', 'Deixis Gallery', 'Client · consignment art store', 'CLIENT BUILD', TEAL),
    ('ME', 'Mission Esthetics', 'Client · missionesthetics.com', 'CLIENT LIVE', TEAL),
    ('CL', 'Clarity', 'Status unverified', 'UNKNOWN', GRAY),
]
for i, (mono, label, sub, status, color) in enumerate(products):
    P1.append(node(cols[i % 3], rows[i // 3], mono, label, sub, status, color))

# --- By Red Ops region
P1.append(region(1000, 168, 400, 330, 'BY RED OPS', BLUE))
P1.append(node(1200, 280, 'OS', 'Daily OS', 'byredlanternos.com · team OS', 'INTERNAL', BLUE))

# --- Paradise region
P1.append(region(1000, 620, 400, 278, 'PARADISE PROPERTY SERVICES', ORANGE))
P1.append(node(1200, 716, 'PP', 'Vendor Ops', 'Basheer licensed entity · By Red ops layer', 'BLOCKED', ORANGE))
P1.append(f'<text x="1200" y="872" text-anchor="middle" font-size="10.5" font-weight="600" fill="{GRAY}">Blocked on bond, GL and WC insurance, W9</text>')

PAGE1_SVG = ''.join(P1) + '</svg>'

# ---------------------------------------------------------------- PAGE 2 SVG
P2 = ['<svg viewBox="0 0 1460 952" xmlns="http://www.w3.org/2000/svg" font-family="Helvetica, Arial, sans-serif">', DEFS]
P2.append(f'<rect x="0" y="0" width="1460" height="952" rx="14" fill="{WHITE}"/>')

# --- Shared platform region
P2.append(region(28, 40, 1404, 520, 'SHARED PLATFORM · REDLANTERN OS', RED))

# Row 1: control plane
P2.append(node(160, 150, 'GH', 'GitHub', 'Source of truth', 'VERIFIED', INK))
P2.append(node(480, 150, 'SC', 'SwarmClaw', '36 agents · execution layer', 'LIVE', RED))
P2.append(node(800, 150, 'RP', 'RobbyPA', 'Conductor · route + verify', 'LIVE', RED))
P2.append(node(1110, 150, 'CC', 'Claude Code', 'Senior specialist · review', 'LIVE', INK))
P2.append(node(1330, 150, 'OL', 'Ollama', 'Model routing · all agents', 'LOCKED', GRAY))

P2.append(arrow(200, 150, 440, 150, 'dispatch'))
P2.append(arrow(520, 150, 760, 150, 'conducts'))
P2.append(arrow(1070, 150, 840, 150, 'specialist review'))
P2.append(elbow([(1330, 110), (1330, 78), (480, 78), (480, 110)], 'free local inference · all 36 agents', 905, 78))

# Row 2: runtime plane
P2.append(node(160, 400, 'VC', 'Vercel', 'Deploy + hosting', 'LIVE', INK))
P2.append(node(480, 400, 'SB', 'Supabase x3', 'RLS core · By Red · Hadith', 'VERIFIED', GREEN))
P2.append(node(800, 400, 'ST', 'Stripe', 'Payments · Amina + Lantern', 'LIVE', BLUE))
P2.append(node(1110, 400, 'CP', 'Capacitor', 'iOS shell · TestFlight', 'LIVE', PURPLE))
P2.append(node(1330, 400, 'OB', 'Obsidian', 'Knowledge vault · read only', 'LIVE', GRAY))

P2.append(arrow(160, 262, 160, 360, 'ship'))
P2.append(arrow(480, 262, 480, 360, 'proof + data'))
P2.append(arrow(440, 400, 200, 400, 'Postgres + Auth + RLS'))
P2.append(f'<text x="730" y="540" text-anchor="middle" font-size="10.5" font-weight="600" fill="{GRAY}">'
          f'Supabase projects: endovljmaudnxdzdapmf (RLS core · Amina + HireWire shared schema) · mlmrdkiyxlngmwhdtrln (By Red Daily OS) · nqklipakrfuwebkdnhwg (Authentic Hadith)</text>')

# --- Team region
P2.append(region(28, 620, 1404, 300, 'TEAM · BY RED, LLC', BLACK))

def person(x, y, initials, name, role, color):
    return (f'<circle cx="{x}" cy="{y}" r="29" fill="{color}"/>'
            f'<text x="{x}" y="{y+6}" text-anchor="middle" font-size="17" font-weight="900" fill="{WHITE}">{esc(initials)}</text>'
            f'<text x="{x}" y="{y+53}" text-anchor="middle" font-size="15" font-weight="800" fill="{INK}">{esc(name)}</text>'
            f'<text x="{x}" y="{y+71}" text-anchor="middle" font-size="11.5" font-weight="600" fill="{GRAY}">{esc(role)}</text>')

# Founder (labels beside the circle so connector lines stay clean)
P2.append(f'<circle cx="730" cy="690" r="29" fill="{RED}"/>'
          f'<text x="730" y="696" text-anchor="middle" font-size="17" font-weight="900" fill="{WHITE}">RS</text>'
          f'<text x="775" y="686" font-size="15" font-weight="800" fill="{INK}">Rory Semeah</text>'
          f'<text x="775" y="704" font-size="11.5" font-weight="600" fill="{GRAY}">Founder · all products</text>')
# Core team
P2.append(person(140, 828, 'HG', 'Homira Gitesatani', 'Ops · registered agent', INK))
P2.append(person(345, 828, 'KB', 'Basheer Harris', 'Licensed contractor · Paradise', INK))
P2.append(person(550, 828, 'KM', 'Keymon', 'QBos · HireWire', INK))
# Partners
P2.append(person(760, 828, 'BM', 'Bilal Mohamed', 'Deixis client · Halal Suite', GRAY))
P2.append(person(970, 828, 'ME', 'Mohamed El Askary', 'Hadith backer · VC connector', GRAY))
P2.append(person(1160, 828, 'JR', 'Jah Jah', 'Collaborator', GRAY))
P2.append(person(1330, 828, 'PS', 'Paul Semeah', 'Family · Hadith lifetime', GRAY))

for px in (140, 345, 550, 760, 970, 1160, 1330):
    P2.append(arrow(730, 720, px, 794))

PAGE2_SVG = ''.join(P2) + '</svg>'

# ---------------------------------------------------------------- HTML SHELL
def page(eyebrow, title1, title2, svg, pagenum, total):
    return f'''<div class="page">
  <div class="page-header">
    <img class="logo" src="data:image/png;base64,{LOGO}"/>
    <div class="header-strap">BUILD IN PUBLIC. OPERATE IN TRUTH.</div>
  </div>
  <div class="sash"></div>
  <div class="page-body">
    <div class="eyebrow">{eyebrow}</div>
    <h1><span class="t1">{title1}</span> <span class="t2">{title2}</span></h1>
    <div class="subdate">BY RED, LLC · SAN DIEGO CA · JULY 7 2026 · TRUTH BADGES ON EVERY NODE</div>
    <div class="diagram">{svg}</div>
  </div>
  <div class="page-footer">
    <span>BUILD IN PUBLIC. OPERATE IN TRUTH.</span>
    <span>REDLANTERN STUDIOS · EST. 2025 · BY RED, LLC</span>
    <span>PAGE {pagenum} OF {total}</span>
  </div>
</div>'''

CSS = f'''
@page {{ size: 11in 8.5in; margin: 0; }}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ font-family: Helvetica, Arial, sans-serif; }}
.page {{ width: 11in; height: 8.5in; overflow: hidden; break-after: page;
        display: flex; flex-direction: column; background: {CREAM}; }}
.page:last-child {{ break-after: avoid; }}
.page-header {{ height: 62pt; background: {BLACK}; display: flex; align-items: center;
               justify-content: space-between; padding: 0 34pt; }}
.logo {{ max-height: 44pt; width: auto; display: block; }}
.header-strap {{ color: #DDD6CF; font-size: 7pt; font-weight: 700; letter-spacing: 3pt; }}
.sash {{ height: 10pt; background: repeating-linear-gradient(-45deg, {BLACK} 0 8pt, {WHITE} 8pt 11pt); }}
.page-body {{ flex: 1; padding: 12pt 30pt 8pt; display: flex; flex-direction: column; }}
.eyebrow {{ font-size: 6.5pt; color: {RED}; font-weight: 700; letter-spacing: 2pt; text-transform: uppercase; }}
h1 {{ font-size: 19pt; font-weight: 900; text-transform: uppercase; margin: 2pt 0 1pt; }}
h1 .t1 {{ color: {INK}; }} h1 .t2 {{ color: {RED}; }}
.subdate {{ font-size: 7pt; color: {GRAY}; font-weight: 600; letter-spacing: 1pt;
           text-transform: uppercase; margin-bottom: 6pt; }}
.diagram {{ flex: 1; }}
.diagram svg {{ width: 100%; height: 100%; }}
.page-footer {{ height: 24pt; background: {BLACK}; color: #DDD6CF; font-size: 6pt;
               font-weight: 700; letter-spacing: 1.5pt; display: flex; align-items: center;
               justify-content: space-between; padding: 0 34pt; }}
'''

HTML_DOC = f'''<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>By Red, LLC — Architecture</title><style>{CSS}</style></head><body>
{page('REDLANTERN STUDIOS · SYSTEM ARCHITECTURE', 'BY RED, LLC', 'COMPANY ARCHITECTURE', PAGE1_SVG, 1, 2)}
{page('REDLANTERN STUDIOS · SYSTEM ARCHITECTURE', 'SHARED PLATFORM', '+ TEAM', PAGE2_SVG, 2, 2)}
</body></html>'''

open('BY_RED_LLC_ARCHITECTURE.html', 'w').write(HTML_DOC)

import weasyprint
weasyprint.HTML(filename='BY_RED_LLC_ARCHITECTURE.html').write_pdf('BY_RED_LLC_ARCHITECTURE.pdf')
print('done')
