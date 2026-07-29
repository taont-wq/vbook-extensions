function execute(url) {
  var doc = fetch(url).html();

  // Get title from h1 or og:title
  var title = doc.select("h1").text();
  if (!title || title.length === 0) {
    title = doc.select("meta[property='og:title']").attr("content");
  }
  // Clean up title (remove Vue comment artifacts)
  if (title) {
    title = title.replace(/<!---->/g, "").replace(/<!--\[/g, "").replace(/-->/g, "").replace(/\[/g, "").trim();
  }

  // Get cover from og:image
  var cover = doc.select("meta[property='og:image']").attr("content");
  if (!cover || cover.length === 0) {
    cover = doc.select("meta[name='twitter:image']").attr("content");
  }

  // Get author/channel
  var author = "";
  var channelLink = doc.select("a[href*='/channels/']").first();
  if (channelLink) {
    author = channelLink.text().trim();
  }
  if (!author || author.length === 0) {
    var uploader = doc.select("a.video-uploader-link, a[href*='/uploader/']").first();
    if (uploader) {
      author = uploader.text().trim();
    }
  }

  // Get description
  var description = doc.select("meta[name='description']").attr("content");

  return Response.success({
    name: title || "xHSocial Video",
    cover: cover || "",
    author: author || "xHSocial",
    description: description || "",
    host: "https://xhsocial.com",
    ongoing: true
  });
}
