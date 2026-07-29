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

  var author = "";
  var uploader = doc.select("a[href*='/profile/'], a[href*='/uploader/'], a.author").first();
  if (uploader) {
    author = uploader.text();
  }

  var description = doc.select("meta[name='description']").attr("content");
  if (!description) {
    description = doc.select("div.description, .video-description").text();
  }

  // Get tags as genres
  var genres = [];
  doc.select("a[href*='/s/'], a.tag, a[href*='/tag/']").forEach(function(el) {
    var tagName = el.text();
    tagName = tagName.trim();
    if (tagName && tagName.length > 0 && tagName.length < 60) {
      if (tagName.indexOf(" ") === -1 || tagName.length < 30) {
        var href = el.attr("href");
        if (href && href.indexOf("/") === 0) {
          href = "https://spankbang.com" + href;
        }
        genres.push({
          title: tagName,
          input: href,
          script: "search.js"
        });
      }
    }
  });

  var seen = {};
  var uniqueGenres = [];
  for (var i = 0; i < genres.length; i++) {
    var g = genres[i];
    if (!seen[g.title]) {
      seen[g.title] = true;
      uniqueGenres.push(g);
    }
  }

  // Get related videos
  var suggests = [];
  var videoLinks = doc.select("a[href*='/v/']");
  for (var i = 0; i < videoLinks.size(); i++) {
    var el = videoLinks.get(i);
    var href = el.attr("href");
    if (href && href.indexOf("/") === 0) {
      href = "https://spankbang.com" + href;
    }
    var name = el.text();
    if (!name) {
      name = el.attr("title");
    }
    if (!name) {
      name = "";
    }
    if (name && name.length > 0 && name.length < 100) {
      suggests.push({
        name: name,
        link: href,
        host: "https://spankbang.com"
      });
    }
  }

  var seenSugg = {};
  var uniqueSugg = [];
  for (var i = 0; i < suggests.length; i++) {
    var s = suggests[i];
    if (!seenSugg[s.link]) {
      seenSugg[s.link] = true;
      uniqueSugg.push(s);
    }
  }

  if (uniqueSugg.length > 20) {
    uniqueSugg = uniqueSugg.slice(0, 20);
  }

  return Response.success({
    name: title,
    cover: cover,
    author: author,
    description: description,
    host: "https://spankbang.com",
    ongoing: true,
    genres: uniqueGenres,
    suggests: uniqueSugg
  });
}
