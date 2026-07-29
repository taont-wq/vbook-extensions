function execute(key, page) {
  if (!page) page = "1";
  var reqUrl = "https://www.eporner.com/api/v2/video/search/?query=" + key + "&per_page=30&page=" + page + "&order=latest&format=json";
  var response = fetch(reqUrl);
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
