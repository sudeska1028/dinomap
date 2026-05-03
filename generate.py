import os
import time
import requests
from PIL import Image

def get_dinos():
    # Very crude parsing of the js file since we only need species
    # Actually I can just hardcode the missing ones for now
    return [
        "Amargasaurus",
        "Herrerasaurus",
        "Argentinosaurus",
        "Microraptor",
        "Protoceratops",
        "Mamenchisaurus"
    ]

def remove_magenta(img_path, dest_path):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    newData = []
    for item in datas:
        r, g, b, a = item
        # Magenta is high R and B, low G
        is_magenta = (r > 120 and b > 120) and (g < r * 0.8 and g < b * 0.8) and (abs(r - b) < 60)
        if is_magenta:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    img.putdata(newData)
    img.save(dest_path, "PNG")

def process():
    dinos = get_dinos()
    base_dir = os.path.join("public", "assets", "chibis")
    os.makedirs(base_dir, exist_ok=True)
    
    for dino in dinos:
        species_name = dino.lower().replace(" ", "_").replace("-", "_")
        dest_png = os.path.join(base_dir, f"3d_cutout_{species_name}.png")
        temp_jpg = os.path.join(base_dir, f"temp_{species_name}.jpg")
        
        if os.path.exists(dest_png):
            print(f"[{dino}] Already exists.")
            continue
            
        success = False
        attempts = 0
        while not success and attempts < 10:
            attempts += 1
            print(f"[{dino}] Generating... Attempt {attempts}")
            prompt = f"A highly detailed cute low-poly isometric 3D miniature toy figure of a {dino} dinosaur. Chibi adorable stylized figurine made of plastic standing on the ground. SOLID PURE MAGENTA BACKGROUND, rgb(255,0,255), #FF00FF background ONLY. Cinematic rim lighting. no shadows on the ground."
            url = f"https://image.pollinations.ai/prompt/{prompt}?width=384&height=384&nologo=true&enhance=false"
            
            try:
                r = requests.get(url, timeout=20)
                if r.status_code == 200 and 'image' in r.headers.get('content-type', ''):
                    with open(temp_jpg, 'wb') as f:
                        f.write(r.content)
                    if os.path.getsize(temp_jpg) < 5000:
                        print("File too small")
                        time.sleep(2)
                        continue
                        
                    remove_magenta(temp_jpg, dest_png)
                    if os.path.exists(temp_jpg):
                        os.remove(temp_jpg)
                    print(f"[{dino}] SUCCESS")
                    success = True
                else:
                    print(f"HTTP {r.status_code}")
                    time.sleep(2)
            except Exception as e:
                print(f"Error: {e}")
                time.sleep(2)
                
        if success:
            time.sleep(2)

process()
print("All missing miniatures generated.")
