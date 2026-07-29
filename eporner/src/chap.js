function execute(url) {
  var response = fetch(url);
  if (!response.ok) {
    var tracks = [];
    tracks.push({title: "Full Video", data: url});
    return Response.success(tracks);
  }
  var html = response.text();
  var videoSrc = "";

  // Try JSON-LD first
  var jsonLdRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i;
  var ldMatch = html.match(jsonLdRegex);
  if (ldMatch) {
    try {
      var ld = JSON.parse(ldMatch[1]);
      if (ld && (ld.contentUrl || ld.url)) {
        videoSrc = ld.contentUrl || ld.url;
      }
    } catch(e) {}
  }

  // Try to find mp4 URLs in the page
  if (!videoSrc) {
    var mp4Regex = /https?:\/\/[^"'\s<]*\.mp4[^"'\s<]*/g;
    var matches = html.match(mp4Regex);
    if (matches && matches.length > 0) videoSrc = matches[0];
  }

  // Try m3u8 URLs
  if (!videoSrc) {
    var m3u8Regex = /https?:\/\/[^"'\s<]*\.m3u8[^"'\s<]*/g;
    var m3u8Matches = html.match(m3u8Regex);
    if (m3u8Matches && m3u8Matches.length > 0) videoSrc = m3u8Matches[0];
  }

  // Try to find in JS variables
  if (!videoSrc) {
    var srcRegex = /["'](?:src|file|url|source|video_url)["']\s*:\s*["'](https?:\/\/[^"']+)["']/gi;
    var srcMatch = html.match(srcRegex);
    if (srcMatch) {
      var extracted = srcMatch[0].match(/["'](https?:\/\/[^"']+)["']/);
      if (extracted) videoSrc = extracted[1];
    }
  }

  if (!videoSrc) videoSrc = url;

  var tracks = [];
  tracks.push({title: "Full Video", data: videoSrc});
  return Response.success(tracks);
}
