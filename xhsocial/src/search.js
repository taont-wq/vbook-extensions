function execute(key, page) {
  if (!page) page = "1";
  var url = "";

  if (key.indexOf("xhsocial.com") !== -1 || key.indexOf("xhamster.com") !== -1) {
    if (page === "1") {
      url = key;
    } else {
      if (key.charAt(key.length - 1) === "/") {
        url = key + page;
      } else {
        url = key + "/" + page;
      }
    }
  } else {
    url = "https://xhsocial.com/?q=" + encodeURIComponent(key) + "&page=" + page;
  }

  var doc;
  try {
    doc = fetch(url).html();
  } catch(e) {
    return Response.success([], null);
  }

  var items = [];
  // data-role="thumb-link" works on BOTH desktop and mobile versions
  var links = doc.select("a[data-role='thumb-link']");

  for (var i = 0; i < links.size(); i++) {
    var el = links.get(i);
    var href = el.attr("href");
    if (!href) continue;

    if (href.indexOf("http") !== 0) {
      href = "https://xhsocial.com" + href;
    }

    // data-role="thumb-preview-img" works on BOTH versions
    var img = el.select("img[data-role='thumb-preview-img']").first();
    var name = el.attr("aria-label") || el.attr("title") || "";
    if (!name) continue;

    items.push({
      name: name,
      link: href,
      cover: img ? img.attr("src") : "",
      host: "https://xhsocial.com"
    });
  }

  return Response.success(items, items.length > 0 ? String(parseInt(page) + 1) : null);
}
