function execute() {
  try {
    var doc = fetch("https://xhsocial.com/categories").html();
    var genres = [];
    var links = doc.select("a[href*='/categories/']");

    for (var i = 0; i < links.size(); i++) {
      var name = links.get(i).text().trim();
      if (name && name.length > 0 && name.length < 60) {
        var cleanName = name.replace(/[^\x20-\x7E]/g, "").trim();
        if (cleanName.length > 0) {
          genres.push({
            title: cleanName,
            input: "https://xhsocial.com" + links.get(i).attr("href"),
            script: "search.js"
          });
        }
      }
    }

    if (genres.length > 0) return Response.success(genres);
  } catch(e) {
    // Fallback to hardcoded
  }

  return Response.success([
    { title: "Hentai", input: "https://xhsocial.com/categories/hentai", script: "search.js" },
    { title: "Japanese", input: "https://xhsocial.com/categories/japanese", script: "search.js" },
    { title: "Asian", input: "https://xhsocial.com/categories/asian", script: "search.js" },
    { title: "Anal", input: "https://xhsocial.com/categories/anal", script: "search.js" },
    { title: "Blowjob", input: "https://xhsocial.com/categories/blowjob", script: "search.js" },
    { title: "Milf", input: "https://xhsocial.com/categories/milf", script: "search.js" },
    { title: "Teen", input: "https://xhsocial.com/categories/teen", script: "search.js" },
    { title: "Big Tits", input: "https://xhsocial.com/categories/big-tits", script: "search.js" },
    { title: "Lesbian", input: "https://xhsocial.com/categories/lesbian", script: "search.js" },
    { title: "Creampie", input: "https://xhsocial.com/categories/creampie", script: "search.js" },
    { title: "Babe", input: "https://xhsocial.com/categories/babe", script: "search.js" },
    { title: "Amateur", input: "https://xhsocial.com/categories/amateur", script: "search.js" },
    { title: "Korean", input: "https://xhsocial.com/categories/korean", script: "search.js" },
    { title: "Chinese", input: "https://xhsocial.com/categories/chinese", script: "search.js" },
    { title: "Vietnamese", input: "https://xhsocial.com/categories/vietnamese", script: "search.js" },
    { title: "Russian", input: "https://xhsocial.com/categories/russian", script: "search.js" },
    { title: "Indian", input: "https://xhsocial.com/categories/indian", script: "search.js" }
  ]);
}
