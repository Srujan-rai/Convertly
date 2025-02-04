from flask import Flask, request, jsonify, send_file
import os
import uuid
from pytube import YouTube
import instaloader

app = Flask(__name__)

DOWNLOAD_FOLDER = "downloads"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# YouTube Video Downloader API
@app.route('/api/youtube', methods=['POST'])
def download_youtube():
    data = request.get_json()
    if not data or 'link' not in data:
        return jsonify({"error": "Missing 'link' parameter in request body"}), 400

    url = data['link']
    
    try:
        yt = YouTube(url)
        stream = yt.streams.get_highest_resolution()
        filename = f"{uuid.uuid4()}.mp4"
        file_path = os.path.join(DOWNLOAD_FOLDER, filename)
        stream.download(output_path=DOWNLOAD_FOLDER, filename=filename)

        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Instagram Video Downloader API
@app.route('/api/instareel', methods=['POST'])
def download_instagram_reel():
    data = request.get_json()
    if not data or 'link' not in data:
        return jsonify({"error": "Missing 'link' parameter in request body"}), 400

    url = data['link']
    
    try:
        loader = instaloader.Instaloader(download_videos=True)
        post_shortcode = url.strip("/").split("/")[-1]
        filename = f"{uuid.uuid4()}.mp4"
        file_path = os.path.join(DOWNLOAD_FOLDER, filename)

        loader.download_post(instaloader.Post.from_shortcode(loader.context, post_shortcode), target=DOWNLOAD_FOLDER)

        for file in os.listdir(DOWNLOAD_FOLDER):
            if file.endswith(".mp4"):
                os.rename(os.path.join(DOWNLOAD_FOLDER, file), file_path)
                break

        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True,port=5000,host='0.0.0.0')
