# -*- coding: utf-8 -*-
import os
import re

with open('scratch/generate_full_manual.py', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = re.compile(r'b\.add_image_placeholder\(\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\s*\)', re.MULTILINE)
matches = pattern.findall(text)

md = ['# Panduan Tangkapan Layar (Screenshots) Buku Manual Smart Kids\n']
md.append('Folder ini (`manual_screenshots/`) disiapkan khusus untuk menampung seluruh file gambar tangkapan layar.\n')
md.append('### Cara Penggunaan Praktis:')
md.append('1. Ambil tangkapan layar (screenshot) sesuai daftar 47 nomor di bawah menggunakan shortcut `Win + Shift + S`.')
md.append('2. Simpan file gambar ke dalam folder `manual_screenshots/` dengan format penamaan angka: `01.png`, `02.png`, dst. (atau `01_beranda.png`). Format `.png` atau `.jpg` didukung.')
md.append('3. Jalankan script penempel gambar otomatis di terminal:')
md.append('   ```bash')
md.append('   python scratch/insert_screenshots.py')
md.append('   ```')
md.append('4. Dokumen Word baru `Buku_Manual_Panduan_Sistem_Smart_Kids_Lengkap_Gambar.docx` akan langsung terbit dengan seluruh gambar Anda tertempel rapi di kotaknya!\n')
md.append('### Daftar Lengkap 47 Screenshot:\n')
md.append('| No | Nama File Gambar | Judul Tangkapan Layar | Rute Halaman / URL | Panduan / Tips Pengambilan |')
md.append('|:---:|:---|:---|:---|:---|')

for i, (title, desc, route, tips) in enumerate(matches, 1):
    num_str = f"{i:02d}"
    md.append(f'| **{num_str}** | `{num_str}.png` | **{title}**<br><small>{desc}</small> | `{route}` | {tips} |')

os.makedirs('manual_screenshots', exist_ok=True)
with open('manual_screenshots/README.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print(f"Generated manual_screenshots/README.md successfully with {len(matches)} entries.")
