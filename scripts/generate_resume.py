"""Generate Nigus Libe resume PDF with updated portfolio details."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

OUTPUT = Path(__file__).resolve().parent.parent / "NigusLibe Resume.pdf"
LINK_COLOR = "#0563C1"


def link(url: str, text: str | None = None) -> str:
    label = text or url
    return f'<a href="{url}" color="{LINK_COLOR}">{label}</a>'


def bullet(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(f"&bull; {text}", style)


def section_title(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text.upper(), style)


def build_pdf() -> None:
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.55 * inch,
    )

    styles = getSampleStyleSheet()
    name_style = ParagraphStyle(
        "Name",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=24,
        spaceAfter=2,
        textColor=colors.HexColor("#1a1a1a"),
    )
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=11,
        leading=13,
        textColor=colors.HexColor("#444444"),
        spaceAfter=8,
    )
    contact_style = ParagraphStyle(
        "Contact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#333333"),
        spaceAfter=2,
    )
    heading_style = ParagraphStyle(
        "SectionHeading",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=12,
        spaceBefore=8,
        spaceAfter=4,
        textColor=colors.HexColor("#1a1a1a"),
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=13,
        spaceAfter=4,
        alignment=TA_LEFT,
    )
    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        leftIndent=10,
        bulletIndent=0,
        spaceAfter=2,
    )
    job_title_style = ParagraphStyle(
        "JobTitle",
        parent=body_style,
        fontName="Helvetica-Bold",
        spaceAfter=1,
    )
    job_meta_style = ParagraphStyle(
        "JobMeta",
        parent=body_style,
        fontSize=9,
        textColor=colors.HexColor("#555555"),
        spaceAfter=3,
    )

    story = []

    story.append(Paragraph("Nigus Libe", name_style))
    story.append(Paragraph("Fullstack Developer", title_style))
    story.append(
        HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cccccc"))
    )
    story.append(Spacer(1, 6))

    contact_lines = [
        f"<b>Email:</b> {link('mailto:maymerlibe@gmail.com', 'maymerlibe@gmail.com')} &nbsp;&nbsp;|&nbsp;&nbsp; "
        "<b>Phone:</b> +251952838412",
        f"<b>LinkedIn:</b> {link('https://et.linkedin.com/in/nigus-libe-905038353')} &nbsp;&nbsp;|&nbsp;&nbsp; "
        f"<b>GitHub:</b> {link('https://github.com/The-Professor-1')}",
        f"<b>Portfolio:</b> {link('https://niguslibe.vercel.app')} &nbsp;&nbsp;|&nbsp;&nbsp; "
        "<b>Location:</b> Debre Markos, Ethiopia",
    ]
    for line in contact_lines:
        story.append(Paragraph(line, contact_style))

    story.append(Spacer(1, 4))
    story.append(section_title("Professional Summary", heading_style))
    story.append(
        Paragraph(
            "Fullstack Developer specializing in Django, Python, Vue.js, and PostgreSQL, with hands-on "
            "experience building scalable web applications, REST APIs, and native Android apps. Skilled in "
            "real-time systems (WebSockets, Redis), admin dashboards, third-party integrations, and "
            "production deployment. Focused on clean architecture, performance, and delivering reliable "
            "digital products from backend to mobile.",
            body_style,
        )
    )

    story.append(section_title("Technical Skills", heading_style))
    for item in [
        "<b>Languages & Frameworks:</b> Python, Django, Django REST Framework, HTML/CSS, JavaScript, Vue.js, Android (Kotlin/Java)",
        "<b>Databases & Tools:</b> PostgreSQL, Redis, Git & GitHub, Docker",
        "<b>Development & Architecture:</b> REST API, WebSockets, CI/CD, JWT, ORM, Admin Dashboards, Atomic Transactions",
    ]:
        story.append(bullet(item, bullet_style))

    story.append(section_title("Soft Skills", heading_style))
    story.append(
        bullet("Team Collaboration, Communication, Problem Solving, Time Management", bullet_style)
    )

    story.append(section_title("Languages", heading_style))
    story.append(bullet("English (Fluent)", bullet_style))
    story.append(bullet("Amharic (Native)", bullet_style))

    story.append(section_title("Education", heading_style))
    story.append(Paragraph("<b>Debre Markos University</b> — BSc in Software Engineering", job_title_style))
    story.append(Paragraph("2021 – 2026", job_meta_style))
    story.append(
        Paragraph(
            "Coursework in SDLC, software testing & QA, security, and networking.",
            body_style,
        )
    )
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>5 Million Ethiopian Coders Bootcamp</b> — ML & Android Development", job_title_style))
    story.append(Paragraph("2025", job_meta_style))
    story.append(
        Paragraph(
            "Machine learning and Android development with practical implementation on web and mobile platforms.",
            body_style,
        )
    )
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>TDD with Django Bootcamp</b> — Fullstack Development", job_title_style))
    story.append(Paragraph("2024 – 2025", job_meta_style))
    story.append(
        Paragraph(
            "Test-driven development, DRY, SOLID principles applied in real-world Django projects.",
            body_style,
        )
    )

    story.append(section_title("Experience", heading_style))
    story.append(Paragraph("<b>Freelance Fullstack Developer</b>", job_title_style))
    story.append(Paragraph("February 2024 – Present", job_meta_style))
    for item in [
        "Built web applications with Vue.js, Django, and PostgreSQL for multiple clients.",
        "Collaborated with a team of 5 developers to integrate a payment gateway and build an admin dashboard for user and subscription management on a SaaS platform.",
        "Developed and shipped production Android apps and REST API backends with admin tooling.",
    ]:
        story.append(bullet(item, bullet_style))

    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>Web Developer</b> — Debre Markos University", job_title_style))
    story.append(Paragraph("August 2023 – February 2024", job_meta_style))
    story.append(
        bullet(
            "Developed and optimized Django REST APIs for university platforms, reducing grade lookup response time from 15s to under 4s and enabling online registration and result access.",
            bullet_style,
        )
    )

    story.append(section_title("Projects", heading_style))

    story.append(Paragraph("<b>MarkosGo — Ride Hailing Android App</b>", job_title_style))
    story.append(
        bullet(
            "Ride-hailing Android app tailored for Debre Markos city and airport routes, featuring ride appointments, "
            "atomic transactions, automatic pricing, live driver tracking, and a reliable Django backend.",
            bullet_style,
        )
    )
    story.append(
        bullet(
            f"Available on Google Play: {link('https://play.google.com/store/apps/details?id=com.digitalmarkos.bajaj')}",
            bullet_style,
        )
    )

    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Go Bingo — Multiplayer Fullstack App</b>", job_title_style))
    story.append(
        bullet(
            "Real-time multiplayer bingo platform built with Django, Vue.js, and PostgreSQL, using WebSockets and Redis "
            "for low-latency gameplay and session management.",
            bullet_style,
        )
    )
    story.append(
        bullet(f"Live on Telegram: {link('https://t.me/goo_bingo_bot')}", bullet_style)
    )

    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Admin Dashboards — Go Bingo & MarkosGo</b>", job_title_style))
    story.append(
        bullet(
            "Built REST API–powered admin dashboards for both projects to manage users, rides, games, and application "
            "data — enabling monitoring, updates, and operational control from a single interface.",
            bullet_style,
        )
    )

    doc.build(story)
    print(f"Resume generated: {OUTPUT}")


if __name__ == "__main__":
    build_pdf()
