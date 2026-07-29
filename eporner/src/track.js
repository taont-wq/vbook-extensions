function execute(url) {
  var doc = fetch(url).html();

  // Try to find video source from <video> element
  var videoEl = doc.select("video").first();
  if (videoEl) {
    var src = videoEl.attr("src");
    if (src && src.length > 0) {
      return Response.success(src);
    }
  }

  // Try to find video source from source elements
  var sourceEl = doc.select("video source").first();
  if (sourceEl) {
    var src = sourceEl.attr("src");
    if (src && src.length > 0) {
      return Response.success(src);
    }
  }

  // Try to extract from script config
  var scripts = doc.select("script");
  for (var i = 0; i < scripts.size(); i++) {
    var text = scripts.get(i).html();
    if (text && (text.indexOf(".mp4") !== -1 || text.indexOf(".m3u8") !== -1)) {
      var mp4Match = text.match(/https?:[^"']*\.mp4[^"']*/);
      if (mp4Match) {
        return Response.success(mp4Match[0]);
      }
      var m3u8Match = text.match(/https?:[^"']*\.m3u8[^"']*/);
      if (m3u8Match) {
        return Response.success(m3u8Match[0]);
      }
    }
  }

  // Try eporner API
  var vidId = "";
  var idMatch = url.match(/\/vid\/([^\/]+)/);
  if (idMatch) {
    vidId = idMatch[1].split("-")[0];
  }

  if (vidId) {
    var apiUrl = "https://www.eporner.com/api/v2/video/id/?id=" + vidId;
    var apiDoc = fetch(apiUrl).html();
    if (apiDoc) {
      var apiText = apiDoc.text();
      try {
        var apiJson = JSON.parse(apiText);
        if (apiJson && apiJson.video) {
          // Try to find the highest quality video
          var qualities = ["1440p", "1080p", "720p", "480p", "360p"];
          for (var q = 0; q < qualities.length; q++) {
            var key = "url_" + qualities[q];
            if (apiJson.video[key]) {
              return Response.success(apiJson.video[key]);
            }
          }
        }
      } catch(e) {}
    }
  }

  return Response.error("Không tìm thấy nguồn video");
}
