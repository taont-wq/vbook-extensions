function execute(url, page) {
  if (!page) page = "1";
  if (page !== "1") {
    url = url + "&page=" + page;
  }
  var response = fetch(url);
  if (!response.ok) return Response.success([], null);
  var json = response.json();
  var list = [];

  for (var i = 0; i < json.videos.length; i++) {
    var v = json.videos[i];
    list.push({
      name: v.title,
      link: v.url,
      cover: v.default_thumb ? v.default_thumb.src : "",
      host: "https://www.eporner.com"
    });
  }

  var next = parseInt(page) + 1;
  if (next > json.total_pages) next = null;
  return Response.success(list, next);
}
