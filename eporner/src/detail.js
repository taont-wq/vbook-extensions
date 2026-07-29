function execute(url) {
  var doc = fetch(url).html();

  var title = doc.select("h1").text();
  if (!title || title.length === 0) {
    title = doc.select("meta[property='og:title']").attr("content");
  }

  var cover = doc.select("meta[property='og:image']").attr("content");
  if (!cover || cover.length === 0) {
    cover = doc.select("link[rel='image_src']").attr("href");
  }

  var author = doc.select("a[href*='/pornstar/'], a[href*='/channel/']").first()?.text() || "";

  var description = doc.select("meta[name='description']").attr("content");
  if (!description) {
    description = doc.select("div.video-description, .description").text();
  }

  var duration = doc.select("meta[property='video:duration']").attr("content");
  var views = doc.select("span.views, .views-count").text();
  var rating = doc.select("span.rating, .rating-value").text();

  var detail = "";
  if (views) detail += "Views: " + views;
  if (rating) detail += " | Rating: " + rating;
  if (duration) detail += " | Duration: " + duration + "s";

  // Get tags as genres
  var genres = [];
  doc.select("a[href*='/c/'], a[href*='/category/']").forEach(function(el) {
    var tagName = el.text().trim();
    if (tagName && tagName.length > 0 && tagName.length < 60) {
      genres.push({
        title: tagName,
        input: el.attr("href"),
        script: "search.js"
      });
    }
  });

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
    detail: detail,
    host: "https://www.eporner.com",
    ongoing: true,
    genres: uniqueGenres
  });
}
