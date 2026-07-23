import fitz  # Modul PyMuPDF
import os

pdf_path = "profile.pdf"
output_dir = "public/uploads/pdf_images"

# Buat folder jika belum ada
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

if not os.path.exists(pdf_path):
    print(f"ERROR: File '{pdf_path}' tidak ditemukan di folder ini. Tolong letakkan file PDF di folder yang sama dengan skrip ini.")
    exit(1)

print("Mulai membaca file PDF...")
doc = fitz.open(pdf_path)
image_count = 0

for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    
    if image_list:
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Format penamaan file gambar
            image_filename = f"proyek_page{page_index+1}_img{img_index+1}.{image_ext}"
            image_path = os.path.join(output_dir, image_filename)
            
            with open(image_path, "wb") as f:
                f.write(image_bytes)
            
            print(f"Berhasil mengekstrak: {image_filename}")
            image_count += 1

print(f"\nSelesai! Total {image_count} gambar berhasil diekstrak ke dalam folder '{output_dir}'.")
print("Anda sekarang bisa menggunakan gambar-gambar ini di website!")
