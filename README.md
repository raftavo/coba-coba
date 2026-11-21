# TOEFL 500 Quest 🦉
Website belajar TOEFL ITP (target skor 500) dengan XP, streak, nyawa, dan konfeti.

## Struktur
- `index.html`, `style.css`, `app.js` – aplikasi
- `data/structure.json` – topik, pelajaran, dan soal Structure

## Jalankan lokal
`python -m http.server` lalu buka http://localhost:8000

## Deploy ke GitHub Pages
1. Buat akun di github.com, klik **New repository**, beri nama `toefl500`, pilih Public.
2. Klik **uploading an existing file**, unggah semua isi folder ini (termasuk folder `data`), lalu **Commit changes**.
3. Buka **Settings → Pages**. Pada *Branch* pilih `main` dan folder `/ (root)`, klik **Save**.
4. Tunggu 1–2 menit. Situsmu ada di `https://USERNAME.github.io/toefl500/`.

## Menambah soal
Tambahkan objek ke array `questions` di `data/structure.json`:
```json
{"t":"sva","q":"Kalimat dengan ____.","o":["A","B","C","D"],"a":1,"e":"Pembahasan singkat."}
```
`t` = id topik, `o` = 4 pilihan, `a` = indeks jawaban benar (0–3), `e` = pembahasan.
Topik baru ditambahkan ke array `topics` (`id`, `title`, `lesson`, `trap`).
