var BASE = "https://spankbang.com";

function execute(key, page) {
  // Manual URL encoding for compatibility
  var encoded = key.replace(/ /g, "+");
  var reqUrl = BASE + "/s/" + encoded + "/";
  if (page) {
    reqUrl = reqUrl + "?page=" + page;
  }

  var doc;
  try {
    doc = fetch(reqUrl).html();
  } catch(e) {
    return Response.success([], null);
  }

  var list = [];
  var seen = {};

  var links = doc.select("a");
  for (var i = 0; i < links.size(); i++) {
    var link = links.get(i);
    var href = link.attr("href");
    if (!href) continue;

    if (href.indexOf("http") !== 0 && href.indexOf("/") === 0) {
      href = BASE + href;
    }

    var vidMatch = href.match(/https:\/\/spankbang\.com\/([a-z0-9]+)\/video\/?/);
    if (!vidMatch) continue;
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
      link: href,
      cover: thumb || "",
      host: BASE
    });
  }

  var next = null;
  var nextPage = page ? parseInt(page) + 1 : 2;
  var pagers = doc.select("a[href*='page=" + nextPage + "']");
  if (pagers.size() > 0) {
    next = String(nextPage);
  }

  return Response.success(list, next);
}
