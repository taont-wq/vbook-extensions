function execute(key, page) {
  page = page || "1";
  var url = "";

  if (key.indexOf("spankbang.com") !== -1) {
    // Browse mode: key is a URL
    url = key;
  } else {
    // Search mode
    url = "https://spankbang.com/s/" + encodeURIComponent(key) + "/page-" + page + "/";
  }

  var doc = fetch(url).html();
  var items = [];

  // Try common selectors for spankbang video items
  doc.select("div.video-item, div[class*='video'], div.item, li.video").forEach(function(el) {
    var link = el.select("a[href^='/']").first();
    if (!link) {
      link = el.select("a").first();
    }

    if (link) {
      var href = link.attr("href");
      if (href && href.length > 0 && href.indexOf("/v/") !== -1) {
        if (href.indexOf("http") !== 0) {
          href = "https://spankbang.com" + href;
        }

        var img = el.select("img").first();
        var imgSrc = "";
        if (img) {
          imgSrc = img.attr("data-src") || img.attr("src") || "";
        }

        var title = el.select(".title, .name, a").text();
        if (!title || title.length === 0) {
          title = link.attr("title") || "";
        }

        items.push({
          name: title,
          link: href,
          cover: imgSrc,
          description: "",
          host: "https://spankbang.com"
        });
      }
    }
  });

  // Fallback: try direct link matching
  if (items.length === 0) {
    doc.select("a[href*='/v/']").forEach(function(el) {
      var href = el.attr("href");
      if (href && href.indexOf("http") !== 0) {
        href = "https://spankbang.com" + href;
      }

      var img = el.select("img").first();
      var imgSrc = "";
      if (img) {
        imgSrc = img.attr("data-src") || img.attr("src") || "";
      }

      var title = el.text() || el.attr("title") || "";

      items.push({
        name: title,
        link: href,
        cover: imgSrc,
        description: "",
        host: "https://spankbang.com"
      });
    });
  }

  if (items.length > 0) {
    var nextPage = parseInt(page) + 1;
    return Response.success(items, nextPage.toString());
  }

  return Response.success(items, "");
}
