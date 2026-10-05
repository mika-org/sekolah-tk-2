# -*- coding: utf-8 -*-
"""
Converts Buku_Manual_Panduan_Sistem_Smart_Kids.docx into an executive, publication-grade standalone HTML manual.
Features:
- Responsive layout with sticky sidebar and table of contents
- Search filter for topics and keywords
- Print to PDF stylesheet (@media print)
- Dark / Light mode toggle
- Beautiful typography, badges, callouts, and image placeholder boxes
"""

import os
import re
import docx
from docx.oxml.ns import qn

DOCX_FILE = "Buku_Manual_Panduan_Sistem_Smart_Kids.docx"
HTML_OUTPUT = "Buku_Manual_Panduan_Sistem_Smart_Kids.html"

def convert():
    doc = docx.Document(DOCX_FILE)

    html_parts = []
    toc_links = []
    
    # We will iterate elements in doc
    # doc.paragraphs and doc.tables in document order
    # In python-docx, doc.element.body contains both p and tbl elements in order!
    
    body = doc.element.body
    
    h1_count = 0
    h2_count = 0
    
    for child in body:
        tag = child.tag.split('}')[-1]
        
        if tag == 'p':
            p = docx.text.paragraph.Paragraph(child, doc)
            text = p.text.strip()
            if not text:
                continue
                
            # Check font size or properties
            runs = p.runs
            if not runs:
                continue
                
            first_run = runs[0]
            font_size = first_run.font.size.pt if first_run.font.size else 10
            is_bold = first_run.font.bold
            
            # Heading 1 (16pt, bold)
            if font_size >= 15 and is_bold:
                h1_count += 1
                sec_id = f"section-{h1_count}"
                toc_links.append((sec_id, text, 1))
                html_parts.append(f'<div class="section-divider"></div>')
                html_parts.append(f'<h2 id="{sec_id}" class="chapter-h1"><span class="h1-badge">BAB {h1_count}</span> {text}</h2>')
            
            # Heading 2 (13pt, bold)
            elif 12 <= font_size < 15 and is_bold:
                h2_count += 1
                sub_id = f"sub-{h2_count}"
                toc_links.append((sub_id, text, 2))
                html_parts.append(f'<h3 id="{sub_id}" class="section-h2">{text}</h3>')
                
            # Heading 3 (11pt, bold)
            elif 10.5 <= font_size < 12 and is_bold and (text.startswith("Langkah") or text.startswith("Langkah-") or text.startswith("Bagian")):
                html_parts.append(f'<h4 class="step-h3">{text}</h4>')
                
            # Bullet list
            elif p.style.name.startswith("List"):
                # Handle bold prefix
                bullet_html = ""
                for r in runs:
                    if r.font.bold:
                        bullet_html += f"<strong>{r.text}</strong>"
                    elif r.font.italic:
                        bullet_html += f"<em>{r.text}</em>"
                    else:
                        bullet_html += r.text
                html_parts.append(f'<li class="manual-bullet">{bullet_html}</li>')
                
            # Regular paragraph
            else:
                p_html = ""
                for r in runs:
                    if r.font.bold:
                        p_html += f"<strong>{r.text}</strong>"
                    elif r.font.italic:
                        p_html += f"<em>{r.text}</em>"
                    else:
                        p_html += r.text
                html_parts.append(f'<p class="manual-p">{p_html}</p>')
                
        elif tag == 'tbl':
            tbl = docx.table.Table(child, doc)
            # Check if this is a 1x1 special box (accent line, callout, or image placeholder)
            if len(tbl.rows) == 1 and len(tbl.columns) == 1:
                cell = tbl.cell(0, 0)
                cell_text = cell.text.strip()
                
                # Check if it's an accent bar (very short or empty text)
                if len(cell_text) == 0:
                    continue
                    
                # Badge pill on cover
                if "DOKUMEN RESMI PANDUAN" in cell_text:
                    html_parts.append(f'<div class="cover-badge">{cell_text}</div>')
                    continue
                    
                # Callout box
                if "CATATAN PENTING" in cell_text or "PETUNJUK PENGGUNAAN" in cell_text or "KETENTUAN UPLOAD" in cell_text:
                    paras = [p.text.strip() for p in cell.paragraphs if p.text.strip()]
                    title = paras[0] if paras else "CATATAN PENTING"
                    body_txt = "<br>".join(paras[1:]) if len(paras) > 1 else ""
                    
                    c_type = "info"
                    if "KETENTUAN UPLOAD" in title or "PERINGATAN" in title:
                        c_type = "warning"
                    html_parts.append(f'''
                    <div class="callout-box callout-{c_type}">
                        <div class="callout-title">{title}</div>
                        <div class="callout-body">{body_txt}</div>
                    </div>
                    ''')
                    continue
                    
                # Image placeholder box
                if "[TEMPAT GAMBAR" in cell_text:
                    p_texts = [p.text.strip() for p in cell.paragraphs if p.text.strip()]
                    header_line = p_texts[0] if len(p_texts) > 0 else "TEMPAT GAMBAR"
                    route_line = p_texts[1] if len(p_texts) > 1 else ""
                    desc_line = p_texts[2] if len(p_texts) > 2 else ""
                    tips_line = p_texts[3] if len(p_texts) > 3 else ""
                    
                    html_parts.append(f'''
                    <div class="img-placeholder-card">
                        <div class="img-header">
                            <span class="img-icon">🖼️</span>
                            <span class="img-title">{header_line}</span>
                        </div>
                        <div class="img-details">
                            <div class="img-row"><span class="img-label">📍 Rute / Lokasi:</span> <code class="route-badge">{route_line.replace("📍 Lokasi Halaman / Rute: ", "")}</code></div>
                            <div class="img-row"><span class="img-label">📝 Deskripsi:</span> <span>{desc_line.replace("📝 Deskripsi Tampilan: ", "")}</span></div>
                            <div class="img-row"><span class="img-label">💡 Tips Screenshot:</span> <span class="tips-text">{tips_line.replace("💡 Panduan Pengambilan Screenshot: ", "")}</span></div>
                        </div>
                        <div class="img-dropzone">
                            <span class="dropzone-text">▼ TEMPELKAN TANGKAPAN LAYAR DI SINI ▼</span>
                        </div>
                    </div>
                    ''')
                    continue
                    
            # Data Table
            headers = [c.text.strip() for c in tbl.rows[0].cells]
            table_html = ['<div class="table-responsive"><table class="manual-table"><thead><tr>']
            for h in headers:
                table_html.append(f'<th>{h}</th>')
            table_html.append('</tr></thead><tbody>')
            
            for row in tbl.rows[1:]:
                table_html.append('<tr>')
                for cell in row.cells:
                    table_html.append(f'<td>{cell.text.strip()}</td>')
                table_html.append('</tr>')
            table_html.append('</tbody></table></div>')
            html_parts.append("".join(table_html))

    # Build TOC navigation items
    toc_nav_html = []
    for item_id, title, level in toc_links:
        if level == 1:
            # Clean title
            clean_title = re.sub(r'^BAB \d+:\s*', '', title)
            toc_nav_html.append(f'<a href="#{item_id}" class="toc-link toc-level-1">{title}</a>')
        elif level == 2:
            toc_nav_html.append(f'<a href="#{item_id}" class="toc-link toc-level-2">{title}</a>')

    full_html = f'''<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buku Manual Panduan Penggunaan Sistem Smart Kids - YAPCHI Foundation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary: #065f46;
            --primary-dark: #047857;
            --primary-light: #ecfdf5;
            --secondary: #0f766e;
            --accent: #10b981;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --bg-body: #f8fafc;
            --bg-card: #ffffff;
            --border-color: #e2e8f0;
            --sidebar-width: 320px;
        }}
        [data-theme="dark"] {{
            --primary: #10b981;
            --primary-dark: #059669;
            --primary-light: #064e3b;
            --secondary: #2dd4bf;
            --text-main: #f1f5f9;
            --text-muted: #94a3b8;
            --bg-body: #0f172a;
            --bg-card: #1e293b;
            --border-color: #334155;
        }}
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}
        body {{
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--bg-body);
            color: var(--text-main);
            line-height: 1.65;
            font-size: 15px;
        }}
        /* Layout */
        .app-container {{
            display: flex;
            min-height: 100vh;
        }}
        /* Sidebar */
        .sidebar {{
            width: var(--sidebar-width);
            background: var(--bg-card);
            border-right: 1px solid var(--border-color);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            z-index: 100;
        }}
        .sidebar-header {{
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
            background: var(--primary);
            color: #ffffff;
        }}
        .sidebar-header h1 {{
            font-size: 16px;
            font-weight: 800;
            letter-spacing: -0.3px;
        }}
        .sidebar-header p {{
            font-size: 12px;
            opacity: 0.85;
            margin-top: 4px;
        }}
        .sidebar-search {{
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
        }}
        .sidebar-search input {{
            width: 100%;
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 13px;
            background: var(--bg-body);
            color: var(--text-main);
            outline: none;
        }}
        .sidebar-search input:focus {{
            border-color: var(--primary);
        }}
        .toc-list {{
            flex: 1;
            padding: 12px 8px;
            overflow-y: auto;
        }}
        .toc-link {{
            display: block;
            padding: 7px 12px;
            color: var(--text-muted);
            text-decoration: none;
            border-radius: 6px;
            font-size: 13px;
            line-height: 1.4;
            transition: all 0.15s ease;
            margin-bottom: 2px;
        }}
        .toc-link:hover {{
            background: var(--primary-light);
            color: var(--primary-dark);
        }}
        .toc-level-1 {{
            font-weight: 700;
            color: var(--text-main);
            margin-top: 8px;
            font-size: 13px;
        }}
        .toc-level-2 {{
            padding-left: 22px;
            font-size: 12.5px;
        }}
        .sidebar-footer {{
            padding: 14px 16px;
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 8px;
        }}
        .btn {{
            flex: 1;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            border: 1px solid var(--border-color);
            background: var(--bg-card);
            color: var(--text-main);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s;
        }}
        .btn:hover {{
            background: var(--primary-light);
            color: var(--primary-dark);
            border-color: var(--primary);
        }}
        .btn-primary {{
            background: var(--primary);
            color: #ffffff;
            border-color: var(--primary);
        }}
        .btn-primary:hover {{
            background: var(--primary-dark);
            color: #ffffff;
        }}
        /* Main Content */
        .main-content {{
            margin-left: var(--sidebar-width);
            flex: 1;
            padding: 40px 60px;
            max-width: 1000px;
        }}
        /* Header Hero */
        .doc-hero {{
            background: linear-gradient(135deg, #065f46 0%, #0f766e 100%);
            color: #ffffff;
            padding: 36px 40px;
            border-radius: 16px;
            margin-bottom: 40px;
            box-shadow: 0 10px 25px -5px rgba(6, 95, 70, 0.25);
        }}
        .doc-badge {{
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            margin-bottom: 12px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }}
        .doc-hero h1 {{
            font-size: 26px;
            font-weight: 800;
            line-height: 1.3;
            margin-bottom: 8px;
        }}
        .doc-hero p {{
            font-size: 15px;
            opacity: 0.9;
        }}
        /* Typography */
        .chapter-h1 {{
            font-size: 20px;
            font-weight: 800;
            color: var(--primary);
            margin: 40px 0 16px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }}
        .h1-badge {{
            font-size: 12px;
            background: var(--primary-light);
            color: var(--primary-dark);
            padding: 2px 8px;
            border-radius: 6px;
            font-weight: 800;
        }}
        .section-h2 {{
            font-size: 16px;
            font-weight: 700;
            color: var(--secondary);
            margin: 28px 0 12px 0;
        }}
        .step-h3 {{
            font-size: 14.5px;
            font-weight: 700;
            color: var(--text-main);
            margin: 18px 0 8px 0;
        }}
        .manual-p {{
            margin-bottom: 12px;
            color: var(--text-main);
        }}
        .manual-bullet {{
            margin-left: 24px;
            margin-bottom: 6px;
            color: var(--text-main);
        }}
        .section-divider {{
            height: 1px;
            background: var(--border-color);
            margin: 36px 0 20px 0;
        }}
        /* Callout Box */
        .callout-box {{
            padding: 16px 20px;
            border-radius: 10px;
            margin: 18px 0;
            border-left: 4px solid #059669;
            background: var(--primary-light);
        }}
        .callout-title {{
            font-weight: 700;
            font-size: 13.5px;
            color: var(--primary-dark);
            margin-bottom: 4px;
        }}
        .callout-body {{
            font-size: 13.5px;
            color: var(--text-main);
            line-height: 1.55;
        }}
        .callout-warning {{
            background: #fffbeb;
            border-left-color: #d97706;
        }}
        .callout-warning .callout-title {{
            color: #b45309;
        }}
        /* Image Placeholder Card */
        .img-placeholder-card {{
            border: 2px dashed #059669;
            background: var(--bg-card);
            border-radius: 12px;
            padding: 18px 20px;
            margin: 20px 0;
            transition: transform 0.15s ease;
        }}
        .img-header {{
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 10px;
        }}
        .img-icon {{
            font-size: 18px;
        }}
        .img-title {{
            font-weight: 700;
            font-size: 14.5px;
            color: var(--primary);
        }}
        .img-details {{
            font-size: 13px;
            line-height: 1.6;
        }}
        .img-row {{
            margin-bottom: 4px;
        }}
        .img-label {{
            font-weight: 700;
            color: var(--text-muted);
            margin-right: 6px;
        }}
        .route-badge {{
            font-family: 'JetBrains Mono', monospace;
            background: var(--bg-body);
            padding: 2px 6px;
            border-radius: 4px;
            border: 1px solid var(--border-color);
            font-size: 12px;
            color: var(--secondary);
            font-weight: 600;
        }}
        .tips-text {{
            color: #047857;
            font-style: italic;
        }}
        .img-dropzone {{
            text-align: center;
            padding: 14px;
            margin-top: 12px;
            background: var(--bg-body);
            border: 1px dashed var(--border-color);
            border-radius: 8px;
        }}
        .dropzone-text {{
            font-size: 11px;
            font-weight: 700;
            color: var(--text-muted);
            letter-spacing: 0.5px;
        }}
        /* Table */
        .table-responsive {{
            overflow-x: auto;
            margin: 20px 0;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--bg-card);
        }}
        .manual-table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            text-align: left;
        }}
        .manual-table th {{
            background: var(--primary);
            color: #ffffff;
            font-weight: 700;
            padding: 12px 14px;
            font-size: 13px;
        }}
        .manual-table td {{
            padding: 10px 14px;
            border-bottom: 1px solid var(--border-color);
            vertical-align: top;
        }}
        .manual-table tr:nth-child(even) {{
            background: var(--bg-body);
        }}
        .manual-table tr:hover {{
            background: var(--primary-light);
        }}
        /* Print Styles */
        @media print {{
            .sidebar, .sidebar-footer, .sidebar-search, .btn {{
                display: none !important;
            }}
            .main-content {{
                margin-left: 0 !important;
                padding: 0 !important;
                max-width: 100% !important;
            }}
            body {{
                background: #ffffff;
                color: #000000;
                font-size: 11pt;
            }}
            .chapter-h1 {{
                page-break-before: always;
            }}
            .img-placeholder-card {{
                break-inside: avoid;
            }}
            .manual-table {{
                break-inside: avoid;
            }}
        }}
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <h1>Smart Kids CMS</h1>
                <p>Buku Panduan Penggunaan Sistem v2.0</p>
            </div>
            <div class="sidebar-search">
                <input type="text" id="searchInput" placeholder="Cari topik atau fitur..." onkeyup="filterTOC()">
            </div>
            <nav class="toc-list" id="tocNav">
                {"".join(toc_nav_html)}
            </nav>
            <div class="sidebar-footer">
                <button class="btn btn-primary" onclick="window.print()">🖨️ Cetak / PDF</button>
                <button class="btn" onclick="toggleTheme()" id="themeBtn">🌙 Gelap</button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="doc-hero">
                <div class="doc-badge">DOKUMEN RESMI PANDUAN PENGGUNA</div>
                <h1>Buku Manual Panduan Penggunaan Sistem Smart Kids</h1>
                <p>Sistem Informasi Manajemen Multi-Sekolah & Pendaftaran Online (PPDB) — YAPCHI Foundation</p>
            </div>

            {"".join(html_parts)}
        </main>
    </div>

    <script>
        function filterTOC() {{
            const input = document.getElementById('searchInput').value.toLowerCase();
            const links = document.querySelectorAll('.toc-link');
            links.forEach(link => {{
                if (link.textContent.toLowerCase().includes(input)) {{
                    link.style.display = 'block';
                }} else {{
                    link.style.display = 'none';
                }}
            }});
        }}

        function toggleTheme() {{
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            document.getElementById('themeBtn').textContent = target === 'dark' ? '☀️ Terang' : '🌙 Gelap';
        }}
    </script>
</body>
</html>
'''

    with open(HTML_OUTPUT, 'w', encoding='utf-8') as f:
        f.write(full_html)

    print(f"Generated standalone HTML manual successfully at: {HTML_OUTPUT}")

if __name__ == "__main__":
    convert()
