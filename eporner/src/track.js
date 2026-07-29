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
    if (text && text.length > 0) {
      if (text.indexOf(".mp4") !== -1) {
        var mp4Pos = text.indexOf(".mp4");
        // Search backwards for http
        var startPos = mp4Pos - 1;
        while (startPos >= 0 && text.charAt(startPos) !== '"' && text.charAt(startPos) !== "'") {
          startPos--;
        }
        if (startPos >= 0) {
          startPos++;
          var mp4Url = text.substring(startPos, mp4Pos + 4);
          if (mp4Url.indexOf("http") === 0) {
            return Response.success(mp4Url);
          }
        }
      }
      if (text.indexOf(".m3u8") !== -1) {
        var m3u8Pos = text.indexOf(".m3u8");
        var startPos = m3u8Pos - 1;
        while (startPos >= 0 && text.charAt(startPos) !== '"' && text.charAt(startPos) !== "'") {
          startPos--;
        }
        if (startPos >= 0) {
          startPos++;
          var m3u8Url = text.substring(startPos, m3u8Pos + 5);
          if (m3u8Url.indexOf("http") === 0) {
            return Response.success(m3u8Url);
          }
        }
      }
    }
  }

  // Try eporner API
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
      if (apiJson) {
        var video = apiJson.video;
        if (video) {
          var qualities = ["1080p", "720p", "480p", "360p"];
          for (var q = 0; q < qualities.length; q++) {
            var key = "url_" + qualities[q];
            if (video[key]) {
              return Response.success(video[key]);
            }
          }
        }
      }
    }
  }

  return Response.error("Khong tim thay nguon video");
}
