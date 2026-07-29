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
      if (text.indexOf(".mp4") !== -1) {
        var mp4Pos = text.indexOf(".mp4");
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
    }
  }

  // Try to find data-config or similar with video URL
  var configEl = doc.select("[data-config], [data-video], [data-src]").first();
  if (configEl) {
    var dataVal = configEl.attr("data-config");
    if (!dataVal) {
      dataVal = configEl.attr("data-video");
    }
    if (!dataVal) {
      dataVal = configEl.attr("data-src");
    }
    if (dataVal && dataVal.indexOf(".m3u8") !== -1) {
      return Response.success(dataVal);
    }
    if (dataVal && dataVal.indexOf(".mp4") !== -1) {
      return Response.success(dataVal);
    }
  }

  return Response.error("Khong tim thay nguon video");
}
