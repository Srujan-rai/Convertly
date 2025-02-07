from flask import Flask, request, jsonify, send_file
import os
import instaloader
from pathlib import Path
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Directory for storing downloaded Instagram videos
INSTAGRAM_DOWNLOAD_PATH = "downloads/instagram"
os.makedirs(INSTAGRAM_DOWNLOAD_PATH, exist_ok=True)

@app.route("/instagram", methods=["POST"])
def download_instagram():
    """Download an Instagram video using Instaloader and return it as a file."""
    data = request.get_json()
    if not data or "link" not in data:
        return jsonify({"error": "Missing 'link' in request body"}), 400

    url = data["link"]
    L = instaloader.Instaloader()

    try:
        print(f"📥 Downloading Instagram video from URL: {url}")
        shortcode = url.strip("/").split("/")[-1]
        output_dir = INSTAGRAM_DOWNLOAD_PATH
        post = instaloader.Post.from_shortcode(L.context, shortcode)
        L.download_post(post, target=output_dir)

        # Find the most recently downloaded file
        files = sorted(Path(output_dir).glob("*"), key=os.path.getmtime, reverse=True)
        if files:
            return send_file(files[0], as_attachment=True)
        else:
            return jsonify({"error": "Download failed"}), 500
    except Exception as e:
        print(f"⚠️ Error: {e}")
        return jsonify({"error": f"Error downloading Instagram video: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
