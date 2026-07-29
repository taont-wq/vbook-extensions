function execute(url) {
  var doc = fetch(url).html();
  var videoSrc = "";

  // Try to get video src from <video> element
  var videoTag = doc.select("video").first();
  if (videoTag) {
    videoSrc = videoTag.attr("src");
  }

  if (!videoSrc) {
    // Try to find mp4/m3u8 URLs in the page source
    var response = fetch(url);
    if (response.ok) {
      var html = response.text();
      var mp4Regex = /https?:\/\/[^"'\s<]*\.mp4[^"'\s<]*/g;
      var matches = html.match(mp4Regex);
      if (matches && matches.length > 0) {
        videoSrc = matches[0];
      }
      if (!videoSrc) {
        var m3u8Regex = /https?:\/\/[^"'\s<]*\.m3u8[^"'\s<]*/g;
        var m3u8Matches = html.match(m3u8Regex);
        if (m3u8Matches && m3u8Matches.length > 0) {
          videoSrc = m3u8Matches[0];
        }
      }
    }
  }

  if (!videoSrc) videoSrc = url;

  var tracks = [];
  tracks.push({title: "Full Video", data: videoSrc});
  return Response.success(tracks);
}
