function execute(url) {
  var list = [];
  list.push({
    name: "Full Video",
    url: url,
    host: "https://xhsocial.com"
  });
  return Response.success(list);
}
