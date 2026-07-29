function execute(url) {
  var isM3u8 = url.indexOf(".m3u8") !== -1;
  return Response.success({
    data: url,
    type: isM3u8 ? "hls" : "native",
    host: "https://xhsocial.com",
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
      "Referer": "https://xhsocial.com/",
      "Origin": "https://xhsocial.com"
    }
  });
}
