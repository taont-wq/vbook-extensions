function execute(url, page) {
  var BASE = "https://spankbang.com";
  var reqUrl = url;
  if (page) {
    if (reqUrl.indexOf("?") !== -1) reqUrl = reqUrl + "&page=" + page;
    else reqUrl = reqUrl + "?page=" + page;
  }

  var doc = fetch(reqUrl).html();
  var list = [];
  var seen = {};

  var links = doc.select("a");
  for (var i = 0; i < links.size(); i++) {
    var link = links.get(i);
    var href = link.attr("href");
    if (!href) continue;

    // Normalize href
    if (href.indexOf("http") !== 0 && href.indexOf("/") === 0) {
      href = BASE + href;
    }

    // Check if it's a video page link
    if (href.match(/https:\/\/spankbang\.com\/[a-z0-9]+\/video\/?/)) {
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
  }

  // Find next page number from pagination
  var next = null;
  var paginationLinks = doc.select("a[href*='page=']");
  for (var j = 0; j < paginationLinks.size(); j++) {
    var pl = paginationLinks.get(j);
    var ph = pl.attr("href");
    if (ph) {
      var idx = ph.indexOf("page=");
      if (idx !== -1) {
        var pn = ph.substring(idx + 5);
        var amp = pn.indexOf("&");
        if (amp !== -1) pn = pn.substring(0, amp);
        if (pn && !isNaN(pn)) {
          var currentPage = page ? parseInt(page) : 1;
          if (parseInt(pn) === currentPage + 1) {
            next = pn;
            break;
          }
        }
      }
    }
  }

  return Response.success(list, next);
}
