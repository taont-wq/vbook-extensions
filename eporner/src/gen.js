var BASE = "https://www.eporner.com";

function execute(url, page) {
  var reqUrl = url;
  if (page) {
    // Strip trailing slash, append /page/
    if (reqUrl.charAt(reqUrl.length - 1) === "/") {
      reqUrl = reqUrl + page + "/";
    } else {
      reqUrl = reqUrl + "/" + page + "/";
    }
  }

  var doc;
  try {
    doc = fetch(reqUrl).html();
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

  // Simple pagination: always return next page number
  var next = page ? String(parseInt(page) + 1) : "2";
  return Response.success(list, next);
}
