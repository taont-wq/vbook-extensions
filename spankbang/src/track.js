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

  // Try to extract from script config - look for m3u8 or mp4 URLs
  var scripts = doc.select("script");
  for (var i = 0; i < scripts.size(); i++) {
    var text = scripts.get(i).html();
    if (text && (text.indexOf(".m3u8") !== -1 || text.indexOf(".mp4") !== -1)) {
      var m3u8Match = text.match(/https?:[^"']*\.m3u8[^"']*/);
      if (m3u8Match) {
        return Response.success(m3u8Match[0]);
      }
      var mp4Match = text.match(/https?:[^"']*\.mp4[^"']*/);
      if (mp4Match) {
        return Response.success(mp4Match[0]);
      }
    }
  }

  // Try to find data-config or similar with video URL
  var configEl = doc.select("[data-config], [data-video], [data-src]").first();
  if (configEl) {
    var dataVal = configEl.attr("data-config") || configEl.attr("data-video") || configEl.attr("data-src");
    if (dataVal && (dataVal.indexOf(".m3u8") !== -1 || dataVal.indexOf(".mp4") !== -1)) {
      return Response.success(dataVal);
    }
  }

  return Response.error("Không tìm thấy nguồn video");
}
