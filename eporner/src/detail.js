function execute(url) {
  var doc = fetch(url).html();
  var title = "";
  var cover = "";
  var description = "";

  var ogTitle = doc.select("meta[property='og:title']").first();
  if (ogTitle) {
    title = ogTitle.attr("content");
    if (title.indexOf(" - EPORNER") > 0) title = title.replace(" - EPORNER", "");
  }
  if (!title) {
    var h1 = doc.select("h1").first();
    if (h1) title = h1.text().trim();
  }

  var ogImg = doc.select("meta[property='og:image']").first();
  if (ogImg) cover = ogImg.attr("content");

  var metaDesc = doc.select("meta[name='description']").first();
  if (metaDesc) description = metaDesc.attr("content");

  return Response.success({
    name: title || "EPorner Video",
    cover: cover || "",
    author: "EPorner",
    description: description || title || "",
    detail: "",
    host: "https://www.eporner.com"
  });
}
