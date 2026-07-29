function execute(url) {
  var doc = fetch(url).html();
  var videoSrc = "";

  // Try JSON-LD script
  var ldScripts = doc.select("script[type='application/ld+json']");
  for (var i = 0; i < ldScripts.size(); i++) {
    try {
      var ld = JSON.parse(ldScripts.get(i).html());
      if (ld && ld["@type"] === "VideoObject" && ld.contentUrl) {
        videoSrc = ld.contentUrl;
        break;
      }
    } catch(e) {}
  }

  if (!videoSrc) {
    // Fallback: try to find mp4 URL in page
    var html = doc.html();
    var mp4Match = html.match(/https?:[^"']*\.mp4[^"']*/);
    if (mp4Match) videoSrc = mp4Match[0];
  }

  if (!videoSrc) {
    // Last resort: use the video page URL itself
    videoSrc = url;
  }

  var tracks = [];
  tracks.push({
    title: "Full Video",
    data: videoSrc
  });
  return Response.success(tracks);
}
