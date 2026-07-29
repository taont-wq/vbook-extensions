var BASE = "https://www.eporner.com";

function execute() {
  var list = [];

  // Scrape latest videos from homepage
  var doc;
  try {
    doc = fetch(BASE).html();
  } catch(e) {
    return Response.success([]);
  }

  var seen = {};
  var links = doc.select("a[href*='/video-']");
  for (var i = 0; i < links.size(); i++) {
    var link = links.get(i);
    var href = link.attr("href");
    if (!href || href.indexOf("/video-") !== 0) continue;
    if (seen[href]) continue;
    seen[href] = true;

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
      link: BASE + href,
      cover: thumb || "",
      host: BASE
    });
  }

  return Response.success(list);
}
