# -*- coding: utf-8 -*-
"""
Automated Screenshot Inserter for Smart Kids User Manual.
Scans the 'manual_screenshots/' folder for image files (e.g., 01.png, img_01.png, 01_dashboard.jpg)
and automatically embeds them into the matching placeholder boxes in the DOCX file.
"""

import os
import re
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

SCREENSHOTS_DIR = "manual_screenshots"
INPUT_DOCX = "Buku_Manual_Panduan_Sistem_Smart_Kids.docx"
OUTPUT_DOCX = "Buku_Manual_Panduan_Sistem_Smart_Kids_Lengkap_Gambar.docx"

def find_image_for_index(index, folder):
    if not os.path.exists(folder):
        return None
    
    # Patterns to match: '01.png', 'img_01.png', '01_*.png', 'gambar_01.jpg', etc.
    str_idx = f"{index:02d}"
    int_idx = str(index)
    
    valid_exts = ('.png', '.jpg', '.jpeg', '.webp')
    
    for filename in os.listdir(folder):
        name_lower = filename.lower()
        if not name_lower.endswith(valid_exts):
            continue
        
        # Check if the filename starts with or contains the index number
        base_name = os.path.splitext(name_lower)[0]
        tokens = re.split(r'[^0-9]', base_name)
        if str_idx in tokens or int_idx in tokens:
            return os.path.join(folder, filename)
            
    return None

def process_manual_screenshots():
    if not os.path.exists(INPUT_DOCX):
        print(f"Error: {INPUT_DOCX} not found.")
        return

    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

    print(f"Loading {INPUT_DOCX}...")
    doc = docx.Document(INPUT_DOCX)
    
    found_count = 0
    total_placeholders = 0

    # Pattern to find placeholder title: [TEMPAT GAMBAR 01: ... ]
    pattern = re.compile(r'\[TEMPAT GAMBAR (\d{1,2})')

    for tbl in doc.tables:
        if len(tbl.rows) == 1 and len(tbl.columns) == 1:
            cell = tbl.cell(0, 0)
            first_p_text = cell.paragraphs[0].text if cell.paragraphs else ""
            match = pattern.search(first_p_text)
            if match:
                total_placeholders += 1
                img_idx = int(match.group(1))
                img_path = find_image_for_index(img_idx, SCREENSHOTS_DIR)

                if img_path:
                    found_count += 1
                    print(f"[{img_idx:02d}] Found image: {img_path} -> Embedding...")

                    # Remove the dropzone prompt paragraph (usually the last paragraph)
                    for p in list(cell.paragraphs):
                        if "SILAKAN TEMPELKAN TANGKAPAN LAYAR" in p.text:
                            p.text = "" # Clear placeholder text

                    # Add image paragraph
                    p_img = cell.add_paragraph()
                    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
                    p_img.paragraph_format.space_before = Pt(8)
                    p_img.paragraph_format.space_after = Pt(4)
                    r_img = p_img.add_run()
                    try:
                        r_img.add_picture(img_path, width=Inches(5.8))
                        
                        # Add image caption
                        p_cap = cell.add_paragraph()
                        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
                        p_cap.paragraph_format.space_before = Pt(2)
                        p_cap.paragraph_format.space_after = Pt(2)
                        r_cap = p_cap.add_run(f"Gambar {img_idx:02d}: {os.path.basename(img_path)}")
                        r_cap.font.name = "Segoe UI"
                        r_cap.font.italic = True
                        r_cap.font.size = Pt(8.5)
                        r_cap.font.color.rgb = RGBColor(100, 116, 139)
                    except Exception as e:
                        print(f"  Error adding picture {img_path}: {e}")
                else:
                    print(f"[{img_idx:02d}] No image found yet in {SCREENSHOTS_DIR}/")

    print("-" * 50)
    print(f"Summary: {found_count} of {total_placeholders} placeholders filled with actual images.")
    doc.save(OUTPUT_DOCX)
    print(f"Saved document with embedded screenshots: {OUTPUT_DOCX}")

if __name__ == "__main__":
    process_manual_screenshots()
