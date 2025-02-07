from pytube import YouTube

url = "https://www.youtube.com/watch?v=2vKMY75kvjI"
yt = YouTube(url)
stream = yt.streams.get_highest_resolution()
stream.download(output_path="downloads/youtube", filename="test_video.mp4")
print("Download complete!")
