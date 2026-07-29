function execute(url) {
  var doc = fetch(url).html();
  var videoSrc = "";

  // Try <video> element
  var videoEl = doc.select("video").first();
  if (videoEl) {
    videoSrc = videoEl.attr("src");
  }

  // Try <video source>
  if (!videoSrc) {
    var sourceEl = doc.select("video source").first();
    if (sourceEl) {
      videoSrc = sourceEl.attr("src");
    }
  }

  // Try script config
  if (!videoSrc) {
    var scripts = doc.select("script");
    for (var i = 0; i < scripts.size(); i++) {
      var text = scripts.get(i).html();
      if (text && text.length > 0) {
        var mp4Match = text.match(/https?:[^"']*\.mp4[^"']*/);
        if (mp4Match) {
          videoSrc = mp4Match[0];
          break;
        }
        var m3u8Match = text.match(/https?:[^"']*\.m3u8[^"']*/);
        if (m3u8Match) {
          videoSrc = m3u8Match[0];
          break;
        }
      }
    }
  }

  // Try eporner API
  if (!videoSrc) {
    var vidId = "";
    var idMatch = url.match(/\/vid\/([^\/]+)/);
    if (idMatch) {
      var parts = idMatch[1].split("-");
      vidId = parts[0];
    }
    if (vidId) {
      var apiUrl = "https://www.eporner.com/api/v2/video/id/?id=" + vidId;
      var apiResponse = fetch(apiUrl);
      if (apiResponse && apiResponse.ok) {
        var apiJson = apiResponse.json();
        if (apiJson && apiJson.video) {
          var qualities = ["1080p", "720p", "480p", "360p"];
          for (var q = 0; q < qualities.length; q++) {
            var key = "url_" + qualities[q];
            if (apiJson.video[key]) {
              videoSrc = apiJson.video[key];
              break;
            }
          }
        }
      }
    }
  }

  if (!videoSrc) {
    // Fallback: pass the URL as-is
    videoSrc = url;
  }

  var tracks = [];
  tracks.push({
    title: "Full Video",
    data: videoSrc
  });
  return Response.success(tracks);
}
