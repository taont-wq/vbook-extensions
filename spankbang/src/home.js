function execute() {
  var BASE = "https://spankbang.com";
  var list = [];

  // Use browse mode via gen.js with pre-defined URLs
  list.push({ title: "Xu hướng", input: BASE + "/s/?filter=trending", script: "gen.js" });
  list.push({ title: "Mới nhất", input: BASE + "/s/?filter=new", script: "gen.js" });
  list.push({ title: "Phổ biến", input: BASE + "/s/?filter=popular", script: "gen.js" });
  list.push({ title: "HD", input: BASE + "/s/?quality=hd", script: "gen.js" });
  list.push({ title: "Full HD", input: BASE + "/s/?quality=fhd", script: "gen.js" });
  list.push({ title: "4K", input: BASE + "/s/?quality=uhd", script: "gen.js" });
  return Response.success(list);
}
