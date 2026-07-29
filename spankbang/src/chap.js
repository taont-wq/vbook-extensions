function execute(url) {
  var doc = fetch(url).html();
  var videoSrc = "";

  // Try JSON-LD
  var ldScripts = doc.select("script[type='application/ld+json']");
  for (var i = 0; i < ldScripts.size(); i++) {
    try {
      var ld = JSON.parse(ldScripts.get(i).html());
      if (ld && ld.contentUrl) {
        videoSrc = ld.contentUrl;
        break;
      }
    } catch(e) {}
  }

  // Try <video> source tags
  if (!videoSrc) {
    var sources = doc.select("video source");
    if (sources.size() > 0) {
      videoSrc = sources.first().attr("src");
    }
  }

  // Try video tag directly
  if (!videoSrc) {
    var video = doc.select("video").first();
    if (video) videoSrc = video.attr("src");
  }

  // Try script tags with video config
  if (!videoSrc) {
    var scripts = doc.select("script");
    var html = doc.html();

    // Look for mp4 URLs in the page
    var mp4Match = html.match(/https?:[^"']*\.mp4[^"'\s]*/);
    if (mp4Match) videoSrc = mp4Match[0];

    // Look for m3u8 URLs
    if (!videoSrc) {
      var m3u8Match = html.match(/https?:[^"']*\.m3u8[^"'\s]*/);
      if (m3u8Match) videoSrc = m3u8Match[0];
    }

    // Look for sources/file in JavaScript objects
    if (!videoSrc) {
      var srcMatch = html.match(/["'](?:src|file|url|source)["']\s*:\s*["'](https?:[^"']+)["']/);
      if (srcMatch) videoSrc = srcMatch[1];
    }
  }

  if (!videoSrc) videoSrc = url;

  var tracks = [];
  tracks.push({
    title: "Full Video",
    data: videoSrc
  });
  return Response.success(tracks);
}
