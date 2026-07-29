function execute(url) {
  var doc = fetch(url).html();
  var title = "";
  var cover = "";

  // Get title
  var h1 = doc.select("h1").first();
  if (h1) title = h1.text().trim();

  if (!title) {
    var ogTitle = doc.select("meta[property='og:title']").first();
    if (ogTitle) title = ogTitle.attr("content");
  }

  // Get thumbnail
  var ogImg = doc.select("meta[property='og:image']").first();
  if (ogImg) cover = ogImg.attr("content");

  if (!cover) {
    var img = doc.select("video[poster]").first();
    if (img) cover = img.attr("poster");
  }

  var description = "";
  var metaDesc = doc.select("meta[name='description']").first();
  if (metaDesc) description = metaDesc.attr("content");

  return Response.success({
    name: title || "SpankBang Video",
    cover: cover || "",
    author: "SpankBang",
    description: description || title || "",
    detail: "",
    host: "https://spankbang.com"
  });
}
