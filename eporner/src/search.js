function execute(key, page) {
  page = page || "1";
  var url = "";

  if (key.indexOf("eporner.com") !== -1) {
    // Browse mode: key is a URL
    if (page === "1") {
      url = key;
    } else {
      url = key + page + "/";
    }
  } else {
    // Search mode
    url = "https://www.eporner.com/search/?q=" + key + "&page=" + page;
  }

  var doc = fetch(url).html();
  var items = [];

  // Try to find video items on the page
  var videoLinks = doc.select("a[href*='/vid/']");
  if (videoLinks && videoLinks.size() > 0) {
    for (var i = 0; i < videoLinks.size(); i++) {
      var link = videoLinks.get(i);
      var href = link.attr("href");
      if (href && href.length > 0) {
        if (href.indexOf("http") !== 0) {
          href = "https://www.eporner.com" + href;
        }

        var img = link.select("img").first();
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

        var title = link.attr("title");
        if (!title) {
          title = link.select(".title, .video-title").text();
        }
        if (!title) {
          title = link.text();
        }

        items.push({
          name: title,
          link: href,
          cover: imgSrc,
          description: "",
          host: "https://www.eporner.com"
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
