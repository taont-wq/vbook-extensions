function execute(key, page) {
  page = page || "1";
  var url = "";

  if (key.indexOf("spankbang.com") !== -1) {
    // Browse mode: key is a URL
    url = key;
  } else {
    // Search mode
    url = "https://spankbang.com/s/" + key + "/page-" + page + "/";
  }

  var doc = fetch(url).html();
  var items = [];

  // Try to find video links
  var videoLinks = doc.select("a[href*='/v/']");
  for (var i = 0; i < videoLinks.size(); i++) {
    var el = videoLinks.get(i);
    var href = el.attr("href");
    if (href && href.length > 0) {
      if (href.indexOf("http") !== 0) {
        href = "https://spankbang.com" + href;
      }

      var img = el.select("img").first();
      var imgSrc = "";
      if (img) {
        imgSrc = img.attr("data-src");
        if (!imgSrc) {
          imgSrc = img.attr("src");
        }
        if (!imgSrc) {
          imgSrc = "";
        }
      }

      var title = el.attr("title");
      if (!title) {
        title = el.text();
      }
      if (!title) {
        title = "";
      }

      // Skip items without proper video links
      if (href && href.indexOf("/v/") !== -1 && title && title.length > 0) {
        items.push({
          name: title,
          link: href,
          cover: imgSrc,
          description: "",
          host: "https://spankbang.com"
        });
      }
    }
  }

  if (items.length > 0) {
    var nextPage = parseInt(page) + 1;
    return Response.success(items, "" + nextPage);
  }

  return Response.success(items, "");
}
