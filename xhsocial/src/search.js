function execute(key, page) {
  page = page || "1";
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
  
  var doc = fetch(url).html();
  var items = [];
  
  // Select video thumbnail links
  doc.select("a.video-thumb__image-container").forEach(function(el) {
    var img = el.select("img.thumb-image-container__image").first();
    var durationEl = el.select(".thumb-image-container__duration .tiny-8643e").first();
    var link = el.attr("href");
    
    if (link && link.length > 0) {
      // Normalize URL
      if (link.indexOf("http") !== 0) {
        link = "https://xhsocial.com" + link;
      }
      
      items.push({
        name: el.attr("aria-label") || el.attr("title") || "",
        link: link,
        cover: img ? img.attr("src") : "",
        description: durationEl ? durationEl.text() : "",
        host: "https://xhsocial.com"
      });
    }
  });
  
  // If we got items, always allow next page (up to a limit)
  if (items.length > 0) {
    var nextPage = parseInt(page) + 1;
    return Response.success(items, nextPage.toString());
  }
  
  return Response.success(items, "");
}
