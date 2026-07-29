function execute(url) {
  var doc = fetch(url).html();
  var title = "";
  var cover = "";
  var description = "";
  var duration = "";

  // Get title from h1
  var h1 = doc.select("h1").first();
  if (h1) title = h1.text().trim();

  // Get thumbnail from JSON-LD
  var ldScripts = doc.select("script[type='application/ld+json']");
  for (var i = 0; i < ldScripts.size(); i++) {
    try {
      var ld = JSON.parse(ldScripts.get(i).html());
      if (ld && ld["@type"] === "VideoObject") {
        if (!title && ld.name) title = ld.name;
        if (!cover && ld.thumbnailUrl && ld.thumbnailUrl.length > 0) {
          cover = ld.thumbnailUrl[ld.thumbnailUrl.length - 1];
        }
        if (ld.description) description = ld.description;
        if (ld.duration) {
          var d = ld.duration;
          d = d.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");
          duration = d;
        }
        break;
      }
    } catch(e) {}
  }

  if (!title) {
    var ogTitle = doc.select("meta[property='og:title']").first();
    if (ogTitle) title = ogTitle.attr("content");
  }
  if (!cover) {
    var ogImg = doc.select("meta[property='og:image']").first();
    if (ogImg) cover = ogImg.attr("content");
  }

  var detail = "";
  if (duration) detail = "Thoi luong: " + duration;

  return Response.success({
    name: title || "EPorner Video",
    cover: cover || "",
    author: "EPorner",
    description: description || title || "",
    detail: detail,
    host: "https://www.eporner.com"
  });
}
