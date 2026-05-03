import os
import time
import requests

missing_sprites = [
    { 'fossil': 'herrerasaurus_fossil.png', 'art': 'herrerasaurus_art.png', 'name': 'Herrerasaurus' },
    { 'fossil': 'argentinosaurus_fossil.png', 'art': 'argentinosaurus_art.png', 'name': 'Argentinosaurus' },
    { 'fossil': 'microraptor_fossil.png', 'art': 'microraptor_art.png', 'name': 'Microraptor' },
    { 'fossil': 'protoceratops_fossil.png', 'art': 'protoceratops_art.png', 'name': 'Protoceratops' },
    { 'fossil': 'mamenchisaurus_fossil.png', 'art': 'mamenchisaurus_art.png', 'name': 'Mamenchisaurus' }
]

def download_robust(prompt, dest):
    import random
    success = False
    attempts = 0
    while not success and attempts < 10:
        attempts += 1
        print(f"Downloading {dest}... Attempt {attempts}")
        seed = random.randint(1, 999999)
        url = f"https://image.pollinations.ai/prompt/{prompt}?width=1024&height=1024&nologo=true&seed={seed}"
        
        try:
            r = requests.get(url, timeout=20)
            if r.status_code == 200 and 'image' in r.headers.get('content-type', ''):
                with open(dest, 'wb') as f:
                    f.write(r.content)
                if os.path.getsize(dest) < 5000:
                    print("File too small, possibly rate limit JSON.")
                    time.sleep(2)
                    continue
                print(f"SUCCESS: {dest}")
                success = True
            else:
                print(f"HTTP {r.status_code}")
                time.sleep(2)
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(2)
            
    if success:
        time.sleep(2)

def process():
    base_dir = os.path.join("public", "assets")
    
    for d in missing_sprites:
        pFossil = f"A beautiful, 8K ultra-detailed museum display of {d['name']} fossil bones, highly professional photography, dark dramatic lighting background, paleontology museum exhibit, photorealistic."
        pArt = f"A cinematic 8K photorealistic paleoart of {d['name']} dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting."
        
        fossilDest = os.path.join(base_dir, d['fossil'])
        artDest = os.path.join(base_dir, d['art'])
        
        # Only download if it's corrupt/small
        if os.path.exists(fossilDest) and os.path.getsize(fossilDest) < 5000:
            download_robust(pFossil, fossilDest)
            
        if os.path.exists(artDest) and os.path.getsize(artDest) < 5000:
            download_robust(pArt, artDest)

process()
print("All corrupt assets fixed.")
