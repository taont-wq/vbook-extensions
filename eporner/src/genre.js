function execute() {
  return Response.success([
    { title: "Mới nhất", input: "https://www.eporner.com/api/v2/video/search/?query=all&per_page=30&order=latest&format=json", script: "gen.js" },
    { title: "Xem nhiều", input: "https://www.eporner.com/api/v2/video/search/?query=all&per_page=30&order=top-monthly&format=json", script: "gen.js" },
    { title: "Đánh giá cao", input: "https://www.eporner.com/api/v2/video/search/?query=all&per_page=30&order=top-rated&format=json", script: "gen.js" },
    { title: "Dài nhất", input: "https://www.eporner.com/api/v2/video/search/?query=all&per_page=30&order=longest&format=json", script: "gen.js" },
    { title: "HD", input: "https://www.eporner.com/api/v2/video/search/?query=all&per_page=30&order=latest&lq=0&format=json", script: "gen.js" },
    { title: "Nổi bật tuần", input: "https://www.eporner.com/api/v2/video/search/?query=all&per_page=30&order=top-weekly&format=json", script: "gen.js" },
    { title: "Phổ biến nhất", input: "https://www.eporner.com/api/v2/video/search/?query=all&per_page=30&order=most-popular&format=json", script: "gen.js" },
    { title: "Ngắn nhất", input: "https://www.eporner.com/api/v2/video/search/?query=all&per_page=30&order=shortest&format=json", script: "gen.js" },
  ]);
}
