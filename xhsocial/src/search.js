function execute(key, page) {
  if (!page) page = "1";
  var url = "";

  if (key.indexOf("xhsocial.com") !== -1 || key.indexOf("xhamster.com") !== -1) {
    // Browse mode: key is a URL
    if (page === "1") {
      url = key;
    } else {
      // Append page number
      if (key.charAt(key.length - 1) === "/") {
        url = key + page;
      } else {
        url = key + "/" + page;
      }
    }
  } else {
    // Search mode
    url = "https://xhsocial.com/?q=" + encodeURIComponent(key) + "&page=" + page;
  }

  var doc;
  try {
    doc = fetch(url).html();
  } catch(e) {
    return Response.success([], null);
  }

  var items = [];
  var links = doc.select("a.video-thumb__image-container");

  for (var i = 0; i < links.size(); i++) {
    var el = links.get(i);
    var href = el.attr("href");
    if (!href) continue;

    // Normalize URL
    if (href.indexOf("http") !== 0) {
      href = "https://xhsocial.com" + href;
    }

    var img = el.select("img.thumb-image-container__image").first();
    var name = el.attr("aria-label") || el.attr("title") || "";
    if (!name) continue;

    items.push({
      name: name,
      link: href,
      cover: img ? img.attr("src") : "",
      host: "https://xhsocial.com"
    });
  }

  // Next page
  var next = null;
  var nextPage = parseInt(page) + 1;
  var nextLinks = doc.select("a[href*='page=" + nextPage + "']");
  if (nextLinks.size() > 0) {
    next = String(nextPage);
  } else {
    // Try next-page button
    var pagers = doc.select("a.pagination__next, a[rel='next']");
    if (pagers.size() > 0) {
      next = String(nextPage);
    }
  }

  return Response.success(items, next);
}
