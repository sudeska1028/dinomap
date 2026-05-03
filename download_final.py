import os
import requests
import time
import random

dinos = [
    ('herrerasaurus_art.png', 'Herrerasaurus'),
    ('microraptor_art.png', 'Microraptor'),
    ('protoceratops_art.png', 'Protoceratops'),
    ('mamenchisaurus_art.png', 'Mamenchisaurus')
]

for dest, name in dinos:
    filepath = f"public/assets/{dest}"
    prompt = f"A cinematic 8K photorealistic paleoart of {name} dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting."
    
    success = False
    for i in range(15):
        print(f"Downloading {dest} (Attempt {i+1})...")
        seed = random.randint(1, 999999)
        url = f"https://image.pollinations.ai/prompt/{prompt}?width=1024&height=1024&nologo=true&seed={seed}"
        
        try:
            r = requests.get(url, timeout=15)
            if r.status_code == 200 and 'image' in r.headers.get('content-type', ''):
                with open(filepath, 'wb') as f:
                    f.write(r.content)
                if os.path.getsize(filepath) > 5000:
                    print(f"SUCCESS: {dest}")
                    success = True
                    break
            else:
                print(f"Failed. Status: {r.status_code}, Type: {r.headers.get('content-type', '')}")
        except Exception as e:
            print(f"Error: {e}")
        time.sleep(3)
    if not success:
        print(f"FAILED to download {dest} after 15 attempts.")
