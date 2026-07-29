function execute(url) {
  var doc = fetch(url).html();
  
  // Get title from h1 or og:title
  var title = doc.select("h1").text();
  if (!title || title.length === 0) {
    title = doc.select("meta[property='og:title']").attr("content");
  }
  
  // Get cover from og:image
  var cover = doc.select("meta[property='og:image']").attr("content");
  if (!cover || cover.length === 0) {
    cover = doc.select("meta[name='twitter:image']").attr("content");
  }
  
  // Get channel/author from tags
  var author = "";
  var channelLink = doc.select("a[href*='/channels/']").first();
  if (channelLink) {
    author = channelLink.text();
  }
  if (!author || author.length === 0) {
    // Try from tag list
    var tagLinks = doc.select("a.tag-96c3e");
    if (tagLinks && tagLinks.size() > 0) {
      author = tagLinks.first().text();
    }
  }
  
  // Get description
  var description = doc.select("meta[name='description']").attr("content");
  
  // Get tags/categories as genres
  var genres = [];
  doc.select("a[href*='/categories/']").forEach(function(el) {
    var tagName = el.text();
    if (tagName && tagName.length > 0 && tagName.length < 50) {
      genres.push({
        title: tagName,
        input: el.attr("href"),
        script: "search.js"
      });
    }
  });
  
  // Deduplicate genres
  var seen = {};
  var uniqueGenres = [];
  genres.forEach(function(g) {
    if (!seen[g.title]) {
      seen[g.title] = true;
      uniqueGenres.push(g);
    }
  });
  
  return Response.success({
    name: title,
    cover: cover,
    author: author,
    description: description,
    host: "https://xhsocial.com",
    ongoing: true,
    genres: uniqueGenres
  });
}
