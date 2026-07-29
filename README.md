# vBook Extensions của taont-wq

Thư viện extension cho [vBook app](https://vbook.app).

## Cách sử dụng

### Thêm repository vào vBook

1. Mở vBook app
2. Vào **Cài đặt → Extension → Kho**
3. Thêm URL:
   ```
   https://raw.githubusercontent.com/taont-wq/vbook-extensions/master/repository.json
   ```
4. Chọn các extension muốn cài

### Hoặc cài trực tiếp từ file

1. Tải file `plugin.zip` từ thư mục extension tương ứng
2. Vào **Cài đặt → Extension → Cài từ file**
3. Chọn file `.zip` đã tải

## Danh sách extensions

### Video

| Extension | Trang | Mô tả |
|-----------|-------|-------|
| [xHSocial](xhsocial/) | https://xhsocial.com | Xem video miễn phí trên xHSocial |

## Cấu trúc repository

```
vbook-extensions/
├── xhsocial/           # Extension xHSocial
│   ├── plugin.json     # Thông tin extension
│   ├── icon.png        # Icon (200x200)
│   ├── plugin.zip      # File cài đặt
│   └── src/            # Mã nguồn JavaScript
│       ├── home.js
│       ├── genre.js
│       ├── search.js
│       ├── detail.js
│       ├── toc.js
│       └── track.js
├── plugin.json         # Danh sách extensions novel/comic
├── video_plugin.json   # Danh sách extensions video
├── repository.json     # Cấu hình kho
└── README.md
```

## License

Private
