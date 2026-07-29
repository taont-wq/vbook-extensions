function execute() {
  var BASE = "https://www.eporner.com";
  var list = [];
  list.push({ title: "Mới nhất", input: BASE + "/newest/", script: "gen.js" });
  list.push({ title: "Xem nhiều", input: BASE + "/top/", script: "gen.js" });
  list.push({ title: "Dài nhất", input: BASE + "/longest/", script: "gen.js" });
  list.push({ title: "Đánh giá cao", input: BASE + "/top-rated/", script: "gen.js" });
  list.push({ title: "HD 1080p", input: BASE + "/cat/hd-1080p/", script: "gen.js" });
  list.push({ title: "4K", input: BASE + "/cat/4k/", script: "gen.js" });
  list.push({ title: "VR", input: BASE + "/cat/vr-porn/", script: "gen.js" });
  list.push({ title: "Big Dick", input: BASE + "/cat/big-dick/", script: "gen.js" });
  list.push({ title: "Blowjob", input: BASE + "/cat/blowjob/", script: "gen.js" });
  list.push({ title: "Creampie", input: BASE + "/cat/creampie/", script: "gen.js" });
  list.push({ title: "Interracial", input: BASE + "/cat/interracial/", script: "gen.js" });
  list.push({ title: "Anal", input: BASE + "/cat/anal/", script: "gen.js" });
  list.push({ title: "Milf", input: BASE + "/cat/milf/", script: "gen.js" });
  list.push({ title: "Teen", input: BASE + "/cat/teen/", script: "gen.js" });
  list.push({ title: "Amateur", input: BASE + "/cat/amateur/", script: "gen.js" });
  list.push({ title: "Japanese", input: BASE + "/cat/japanese/", script: "gen.js" });
  list.push({ title: "Lesbian", input: BASE + "/cat/lesbian/", script: "gen.js" });
  return Response.success(list);
}
