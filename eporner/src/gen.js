function execute(input, page) {
  if (!page) page = "1";

  var query = input;
  var order = "latest";

  // If input is a known sort order, query all videos
  var sorts = ["latest", "most-popular", "top-weekly", "top-monthly", "top-rated", "longest"];
  for (var i = 0; i < sorts.length; i++) {
    if (input === sorts[i]) {
      query = "all";
      order = input;
      break;
    }
  }

  var apiUrl = "https://www.eporner.com/api/v2/video/search/?query=" + query + "&per_page=30&page=" + page + "&order=" + order + "&thumbsize=big&format=json";
  var response = fetch(apiUrl);
  if (!response.ok) return Response.error("Khong the tai danh sach");
  var json = response.json();
  var list = [];

  for (var i2 = 0; i2 < json.videos.length; i2++) {
    var v = json.videos[i2];
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
