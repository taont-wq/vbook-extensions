var BASE = "https://www.eporner.com";

function execute(key, page) {
  if (!page) page = "1";
  var url = BASE + "/search?q=" + key;
  if (page !== "1") {
    url = url + "&page=" + page;
  }

  var doc;
  try {
    doc = fetch(url).html();
  } catch(e) {
    return Response.success([], null);
  }

  var list = [];
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

  // Pagination
  var next = null;
  var nextPage = parseInt(page) + 1;
  var pagers = doc.select("a[href*='page=" + nextPage + "']");
  if (pagers.size() > 0) {
    next = String(nextPage);
  }

  return Response.success(list, next);
}
