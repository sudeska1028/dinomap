import os
import urllib.request
import ssl

# Ensure assets directory exists
if not os.path.exists('assets'):
    os.makedirs('assets')

# URLs to download
assets = {
    "assets/stegosaurus_fossil.jpg": "https://commons.wikimedia.org/wiki/Special:FilePath/Stegosaurus_stenops_mounted_skeleton.jpg",
    "assets/patagotitan_fossil.jpg": "https://commons.wikimedia.org/wiki/Special:FilePath/FMNH_Patagotitan.jpg"
}

# Create a context that doesn't verify SSL certificates (to avoid some errors)
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

opener = urllib.request.build_opener(urllib.request.HTTPSHandler(context=ctx))
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')]
urllib.request.install_opener(opener)

for filename, url in assets.items():
    print(f"Downloading {filename}...")
    try:
        urllib.request.urlretrieve(url, filename)
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
