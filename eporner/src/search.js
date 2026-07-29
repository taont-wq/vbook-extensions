function execute(key, page) {
  if (!page) page = "1";
  var apiUrl = "https://www.eporner.com/api/v2/video/search/?query=" + key + "&per_page=30&page=" + page + "&order=latest&thumbsize=big&format=json";
  var response = fetch(apiUrl);
  if (!response.ok) return Response.error("Khong tim thay ket qua");
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

  var next = null;
  var cp = parseInt(page);
  if (cp < json.total_pages) {
    next = String(cp + 1);
  }

  return Response.success(list, next);
}
