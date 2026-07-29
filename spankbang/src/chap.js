function execute(url) {
  var doc = fetch(url).html();
  var title = doc.select("h1").text();
  if (!title) {
    title = doc.select("meta[property='og:title']").attr("content");
  }
  if (!title) {
    title = "Video";
  }
  return Response.success({
    title: title,
    content: url,
    host: "https://spankbang.com"
  });
}
