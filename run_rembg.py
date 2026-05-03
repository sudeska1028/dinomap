import os
import glob
from rembg import remove
from PIL import Image

def process_all():
    chibis_dir = os.path.join("public", "assets", "chibis")
    files = glob.glob(os.path.join(chibis_dir, "*.png"))
    
    for f in files:
        try:
            input_image = Image.open(f)
            output_image = remove(input_image)
            output_image.save(f)
            print(f"Rembg processed: {os.path.basename(f)}")
        except Exception as e:
            print(f"Error processing {f}: {e}")

if __name__ == "__main__":
    process_all()
