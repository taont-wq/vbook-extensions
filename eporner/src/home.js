function execute() {
  var apiUrl = "https://www.eporner.com/api/v2/video/search/?query=all&per_page=30&order=latest&format=json";
  var response = fetch(apiUrl);
  if (!response.ok) return Response.error("Khong the tai danh sach video");
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

  return Response.success(list);
}
