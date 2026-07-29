function execute(key, page) {
  page = page || "1";
  var url = "";

  if (key.indexOf("eporner.com") !== -1) {
    // Browse mode: key is a URL
    if (page === "1") {
      url = key;
    } else {
      if (key.charAt(key.length - 1) === "/") {
        url = key + page + "/";
      } else {
        url = key + "/" + page + "/";
      }
    }
  } else {
    // Search mode
    url = "https://www.eporner.com/search/?q=" + encodeURIComponent(key) + "&page=" + page;
  }

  var doc = fetch(url).html();
  var items = [];

  doc.select("div.video-item, div.mb-video, div[class*='video'] a[href*='/vid/']").forEach(function(el) {
    var link = el.attr("href");
    if (!link || link.length === 0) {
      link = el.select("a[href*='/vid/']").attr("href");
    }

    if (link && link.length > 0) {
      if (link.indexOf("http") !== 0) {
        link = "https://www.eporner.com" + link;
      }

      var img = el.select("img").first();
      var imgSrc = "";
      if (img) {
        imgSrc = img.attr("data-src") || img.attr("src") || "";
      }

      var title = el.select(".title, .video-title, a[href*='/vid/']").text();
      if (!title || title.length === 0) {
        title = el.attr("title") || "";
      }

      items.push({
        name: title,
        link: link,
        cover: imgSrc,
        description: "",
        host: "https://www.eporner.com"
      });
    }
  });

  if (items.length > 0) {
    var nextPage = parseInt(page) + 1;
    return Response.success(items, nextPage.toString());
  }

  return Response.success(items, "");
}
