function execute(url) {
  var isM3u8 = url.indexOf(".m3u8") !== -1;
  return Response.success({
    data: url,
    type: isM3u8 ? "hls" : "native",
    host: "https://www.eporner.com"
  });
}
