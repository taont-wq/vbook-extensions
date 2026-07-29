import struct, zlib

def create_png(width, height, r, g, b):
    def chunk(t, d):
        c = t + d
        crc = struct.pack('>I', zlib.crc32(c) & 0xffffffff)
        return struct.pack('>I', len(d)) + c + crc
    sig = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0))
    raw = b''
    for y in range(height):
        raw += b'\x00'
        for x in range(width):
            raw += bytes([r, g, b])
    idat = chunk(b'IDAT', zlib.compress(raw))
    iend = chunk(b'IEND', b'')
    return sig + ihdr + idat + iend

png = create_png(200, 200, 30, 120, 200)
with open(r'C:\Users\AD\.qwenpaw\workspaces\default\vbook-extensions\xhsocial\icon.png', 'wb') as f:
    f.write(png)
print('icon.png created')
