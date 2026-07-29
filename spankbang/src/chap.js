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
        var m3u8Match = text.match(/https?:[^"']*\.m3u8[^"']*/);
        if (m3u8Match) {
          videoSrc = m3u8Match[0];
          break;
        }
        var mp4Match = text.match(/https?:[^"']*\.mp4[^"']*/);
        if (mp4Match) {
          videoSrc = mp4Match[0];
          break;
        }
      }
    }
  }

  // Try data attributes
  if (!videoSrc) {
    var configEl = doc.select("[data-config], [data-video], [data-src]").first();
    if (configEl) {
      var dataVal = configEl.attr("data-config") || configEl.attr("data-video") || configEl.attr("data-src");
      if (dataVal && (dataVal.indexOf(".m3u8") !== -1 || dataVal.indexOf(".mp4") !== -1)) {
        videoSrc = dataVal;
      }
    }
  }

  if (!videoSrc) {
    videoSrc = url;
  }

  var tracks = [];
  tracks.push({
    title: "Full Video",
    data: videoSrc
  });
  return Response.success(tracks);
}
