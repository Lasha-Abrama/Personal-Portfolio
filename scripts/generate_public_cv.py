from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUTPUT = "public/documents/lasha-abramishvili-cv.pdf"

INK = colors.HexColor("#17151f")
MUTED = colors.HexColor("#5f6070")
PURPLE = colors.HexColor("#6d52c7")
PALE = colors.HexColor("#f2eefb")
LINE = colors.HexColor("#dedbe7")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="Name",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=27,
    leading=29,
    textColor=INK,
    alignment=TA_LEFT,
    spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="Role",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=11,
    leading=14,
    textColor=PURPLE,
    spaceAfter=9,
))
styles.add(ParagraphStyle(
    name="Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.8,
    leading=11,
    textColor=MUTED,
))
styles.add(ParagraphStyle(
    name="Section",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=9.5,
    leading=12,
    textColor=PURPLE,
    spaceBefore=8,
    spaceAfter=6,
    uppercase=True,
))
styles.add(ParagraphStyle(
    name="BodySmall",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=8.3,
    leading=12,
    textColor=MUTED,
    spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="ItemTitle",
    parent=styles["Heading3"],
    fontName="Helvetica-Bold",
    fontSize=9.2,
    leading=11,
    textColor=INK,
    spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="Meta",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.5,
    leading=10,
    textColor=PURPLE,
    spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="Tag",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.2,
    leading=10,
    textColor=INK,
))


def section(title):
    return [Paragraph(title.upper(), styles["Section"]), HRFlowable(width="100%", thickness=0.6, color=LINE, spaceAfter=6)]


def project(title, meta, body):
    return [
        Paragraph(title, styles["ItemTitle"]),
        Paragraph(meta, styles["Meta"]),
        Paragraph(body, styles["BodySmall"]),
    ]


doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    rightMargin=17 * mm,
    leftMargin=17 * mm,
    topMargin=15 * mm,
    bottomMargin=14 * mm,
    title="Lasha Abramishvili - Public CV",
    author="Lasha Abramishvili",
)

story = []

header_left = [
    Paragraph("Lasha Abramishvili", styles["Name"]),
    Paragraph("Aspiring Full-Stack Developer", styles["Role"]),
]
header_right = [Paragraph(
    "Tbilisi, Georgia<br/>"
    "abramishvililasha05@gmail.com<br/>"
    "github.com/Lasha-Abrama<br/>"
    "linkedin.com/in/lashaabramishvili",
    styles["Contact"],
)]
header = Table([[header_left, header_right]], colWidths=[115 * mm, 46 * mm])
header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ALIGN", (1, 0), (1, 0), "RIGHT"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
]))
story.extend([header, Spacer(1, 5 * mm)])

story.extend(section("Profile"))
story.append(Paragraph(
    "Information Technology student at Business and Technology University with a strong interest in full-stack web development, backend systems, APIs, databases, and data analytics. Building practical projects while developing a reliable foundation for a junior development role or internship.",
    styles["BodySmall"],
))

left = []
left.extend(section("Education"))
left.extend([
    Paragraph("Bachelor of Information Technology", styles["ItemTitle"]),
    Paragraph("Business and Technology University | 2023 - 2027 (expected)", styles["Meta"]),
    Paragraph("GPA listed on current CV: 3.7 / 4.0", styles["BodySmall"]),
])

left.extend(section("Training"))
left.extend([
    Paragraph("Back-End Development", styles["ItemTitle"]),
    Paragraph("RE;EDUCATE | May 2026 - October 2026 | Ongoing", styles["Meta"]),
    Spacer(1, 2 * mm),
    Paragraph("Front-End Development", styles["ItemTitle"]),
    Paragraph("10X | November 2025 - November 2026 | Ongoing", styles["Meta"]),
])

left.extend(section("Technical Skills"))
skill_rows = [
    ("Frontend", "HTML5, CSS3, JavaScript, React, React Router, SCSS, EJS"),
    ("Backend", "Node.js, Express.js, REST APIs, JWT, Zod, Mongoose"),
    ("Databases", "MongoDB, PostgreSQL, SQL, MySQL"),
    ("Data", "Power BI, Advanced Excel, Power Query, DAX"),
    ("Tools", "Git, GitHub, Postman, VS Code, Figma, Vite"),
]
skills = Table([[Paragraph(f"<b>{label}</b>", styles["Tag"]), Paragraph(value, styles["Tag"])] for label, value in skill_rows], colWidths=[23 * mm, 54 * mm])
skills.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("BACKGROUND", (0, 0), (0, -1), PALE),
    ("BOX", (0, 0), (-1, -1), 0.5, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
    ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
    ("TOPPADDING", (0, 0), (-1, -1), 4),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
]))
left.append(skills)

left.extend(section("Languages"))
left.append(Paragraph("Georgian - Native<br/>English - B2<br/>German - A1", styles["BodySmall"]))

right = []
right.extend(section("Selected Projects"))
right.extend(project(
        "Personal Finance App",
        "Node.js | Express.js | MongoDB | JWT | Zod | JavaScript",
        "Collaborative full-stack application for balances, transfers, merchant payments, budgets, savings pots, recurring bills, and profile management. Includes authentication, validation, search, filtering, and responsive layouts.",
    ))
right.append(Spacer(1, 2 * mm))
right.extend(project(
        "EarthLens",
        "React 19 | Vite | SCSS Modules | Framer Motion | i18next",
        "Bilingual country discovery and travel-planning experience with 253 country profiles, live weather, comparison tools, favorites, wishlists, local persistence, and resilient data fallbacks.",
    ))
right.append(Spacer(1, 2 * mm))
right.extend(project(
        "Healthcare Analytics Dashboard",
        "Power BI | Excel | Power Query | DAX",
        "Collaborative university dashboard that turns hospital records into operational, financial, and patient-experience views across visits, revenue, debt, severity, satisfaction, follow-ups, and no-shows.",
    ))
right.append(Spacer(1, 2 * mm))
right.extend(project(
        "React Users App",
        "React | React Router | Vite | JavaScript | CSS",
        "Responsive two-page application with API-driven user cards and clear loading, error, and empty states.",
    ))

right.extend(section("Current Focus"))
right.append(Paragraph(
    "Deepening TypeScript, Next.js, NestJS, testing, Docker, GraphQL, AWS, and system design through structured learning and project work.",
    styles["BodySmall"],
))

columns = Table([[left, right]], colWidths=[82 * mm, 82 * mm], hAlign="LEFT")
columns.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (0, 0), 0),
    ("RIGHTPADDING", (0, 0), (0, 0), 5 * mm),
    ("LEFTPADDING", (1, 0), (1, 0), 5 * mm),
    ("RIGHTPADDING", (1, 0), (1, 0), 0),
    ("LINEBEFORE", (1, 0), (1, 0), 0.6, LINE),
]))
story.append(columns)

story.append(Spacer(1, 4 * mm))
story.append(HRFlowable(width="100%", thickness=0.6, color=LINE, spaceAfter=4))
story.append(Paragraph(
    "Public-safe portfolio version - private phone number and street address intentionally omitted.",
    ParagraphStyle(name="Footer", parent=styles["Contact"], alignment=TA_LEFT, textColor=MUTED),
))

doc.build(story)
