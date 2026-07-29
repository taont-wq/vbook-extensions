function execute() {
  var doc = fetch("https://xhsocial.com/categories").html();
  var genres = [];
  
  doc.select("a[href*='/categories/']").forEach(function(el) {
    var name = el.text();
    // Clean up the name - remove any duplicate or icon text
    if (name && name.length > 0 && name.length < 60) {
      // Remove emoji and special chars for clean display
      var cleanName = name.replace(/[^\x20-\x7E]/g, "").trim();
      if (cleanName.length > 0) {
        genres.push({
          title: cleanName,
          input: el.attr("href"),
          script: "search.js"
        });
      }
    }
  });
  
  // Deduplicate
  var seen = {};
  var unique = [];
  genres.forEach(function(g) {
    if (!seen[g.title]) {
      seen[g.title] = true;
      unique.push(g);
    }
  });
  
  if (unique.length === 0) {
    // Fallback: return hardcoded popular categories
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
      { title: "Korea", input: "https://xhsocial.com/categories/korean", script: "search.js" },
      { title: "Chinese", input: "https://xhsocial.com/categories/chinese", script: "search.js" },
      { title: "Vietnamese", input: "https://xhsocial.com/categories/vietnamese", script: "search.js" },
      { title: "Russian", input: "https://xhsocial.com/categories/russian", script: "search.js" },
      { title: "Indian", input: "https://xhsocial.com/categories/indian", script: "search.js" }
    ]);
  }
  
  return Response.success(unique);
}
