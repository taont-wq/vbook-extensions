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

  var author = doc.select("a[href*='/profile/'], a[href*='/uploader/'], a.author").first()?.text() || "";

  var description = doc.select("meta[name='description']").attr("content");
  if (!description) {
    description = doc.select("div.description, .video-description").text();
  }

  // Get tags as genres
  var genres = [];
  doc.select("a[href*='/s/'], a.tag, a[href*='/tag/']").forEach(function(el) {
    var tagName = el.text().trim();
    if (tagName && tagName.length > 0 && tagName.length < 60) {
      // Skip generic navigation
      if (tagName.indexOf(" ") === -1 || tagName.length < 30) {
        genres.push({
          title: tagName,
          input: "https://spankbang.com" + el.attr("href"),
          script: "search.js"
        });
      }
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

  // Get related videos
  var suggests = [];
  doc.select("a[href*='/v/']").forEach(function(el) {
    var href = el.attr("href");
    if (href && href.indexOf("http") !== 0) {
      href = "https://spankbang.com" + href;
    }
    var name = el.text() || el.attr("title") || "";
    if (name && name.length > 0 && name.length < 100) {
      suggests.push({
        name: name,
        link: href,
        host: "https://spankbang.com"
      });
    }
  });

  var seenSugg = {};
  var uniqueSugg = [];
  suggests.forEach(function(s) {
    if (!seenSugg[s.link]) {
      seenSugg[s.link] = true;
      uniqueSugg.push(s);
    }
  });

  return Response.success({
    name: title,
    cover: cover,
    author: author,
    description: description,
    host: "https://spankbang.com",
    ongoing: true,
    genres: uniqueGenres,
    suggests: uniqueSugg.slice(0, 20)
  });
}
