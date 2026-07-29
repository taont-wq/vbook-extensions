var BASE = "https://spankbang.com";

function execute(url, page) {
  var reqUrl = url;
  if (page) {
    if (reqUrl.indexOf("?") !== -1) reqUrl = reqUrl + "&page=" + page;
    else reqUrl = reqUrl + "?page=" + page;
  }

  var doc;
  try {
    doc = fetch(reqUrl).html();
  } catch(e) {
    // Cloudflare block or other error - return empty
    return Response.success([], null);
  }

  var list = [];
  var seen = {};

  // Try multiple selectors for video links
  var selectors = [
    "a[href*='/video/']",
    "a[href*='spankbang.com/']",
    ".video-item a",
    "a img"
  ];

  for (var s = 0; s < selectors.length; s++) {
    var links = doc.select(selectors[s]);
    for (var i = 0; i < links.size(); i++) {
      var link = links.get(i);
      var href = link.attr("href");
      if (!href) continue;

      // Normalize relative URLs
      if (href.indexOf("http") !== 0 && href.indexOf("/") === 0) {
        href = BASE + href;
      }

      // Check if it's a video page link (spankbang.com/XXXX/video/)
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
    if (list.length > 0) break;
  }

  // Pagination
  var next = null;
  var nextPage = page ? parseInt(page) + 1 : 2;
  var pagers = doc.select("a[href*='page=" + nextPage + "']");
  if (pagers.size() > 0) {
    next = String(nextPage);
  }

  return Response.success(list, next);
}
