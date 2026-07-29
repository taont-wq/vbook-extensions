function execute() {
  var BASE = "https://spankbang.com";
  var doc = fetch(BASE).html();
  var list = [];
  var seen = {};

  // Try to find video links on homepage
  var links = doc.select("a");
  for (var i = 0; i < links.size(); i++) {
    var link = links.get(i);
    var href = link.attr("href");
    if (!href || href.indexOf("/") !== 0) continue;

    // Check if href matches spankbang video pattern like /xxxxx/video/
    if (href.match(/^\/[a-z0-9]+\/video\/?$/)) {
      var fullUrl = BASE + href;
      if (seen[fullUrl]) continue;
      seen[fullUrl] = true;

      var img = link.select("img").first();
      var title = "";
      var thumb = "";
      if (img) {
        title = img.attr("alt");
        thumb = img.attr("src");
      }
      if (!title) title = link.text().trim();
      if (!title) continue;

      list.push({
        name: title,
        link: fullUrl,
        cover: thumb || "",
        host: BASE
      });
    }
  }

  return Response.success(list);
}
