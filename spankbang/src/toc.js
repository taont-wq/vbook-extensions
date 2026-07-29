function execute(url) {
  var doc = fetch(url).html();
  var title = doc.select("h1").text();
  if (!title || title.length === 0) {
    title = doc.select("meta[property='og:title']").attr("content");
  }

  return Response.success([
    {
      name: title || "Full Video",
      url: url,
      host: "https://spankbang.com"
    }
  ]);
}
