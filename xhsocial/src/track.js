function execute(url) {
  // Fetch the video detail page and extract the video source URL
  var doc = fetch(url).html();
  
  // Try to get the video src from the <video> element
  var videoEl = doc.select("video#xplayer__video").first();
  if (videoEl) {
    var videoSrc = videoEl.attr("src");
    if (videoSrc && videoSrc.length > 0) {
      return Response.success(videoSrc);
    }
  }
  
  // Fallback: try searching for video element by ID
  var allVideo = doc.select("video");
  if (allVideo && allVideo.size() > 0) {
    var src = allVideo.first().attr("src");
    if (src && src.length > 0) {
      return Response.success(src);
    }
  }
  
  return Response.error("Không tìm thấy nguồn video");
}
