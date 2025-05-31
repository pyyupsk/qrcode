# QR Code Studio

A modern web application for creating and scanning QR codes with advanced customization options. Built with Next.js, it offers a sleek interface and powerful features for all your QR code needs.

## Features

- **Create QR Codes**: Generate QR codes for URLs and custom messages
- **Scan QR Codes**: Upload or paste images to decode QR codes instantly
- **Advanced Customization**: Fine-tune error recovery, colors, borders, and image quality
- **Privacy-First**: Everything runs in your browser - no data leaves your device
- **Open Source**: Free to use, modify, and contribute

## Quick Start

1. **Clone and install**:

   ```bash
   git clone https://github.com/pyyupsk/qrcode.git
   cd qrcode
   npm install
   ```

2. **Start the app**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser

## How to Use

### Creating QR Codes

1. Choose between URL or text input
2. Enter your content
3. Customize appearance and settings
4. Click "Create QR Code"

### Scanning QR Codes

1. Switch to the scan tab
2. Upload an image or paste a URL
3. Click "Decode QR Code" to extract the content

### Downloading

- Click the download button to save your QR code
- Choose your preferred image format and quality

### API Usage

The app provides REST API endpoints for generating QR codes programmatically:

#### GET /api/generate

Query Parameters:

- `text` (required): Content to encode
- `level` (optional): Error correction level (L, M, Q, H) - defaults to H
- `margin` (optional): Border size (0-10) - defaults to 4
- `dark` (optional): Dark color hex - defaults to #000000
- `light` (optional): Light color hex - defaults to #ffffff
- `size` (optional): Image size in pixels (100-2000) - defaults to 512

Example:

```
GET /api/generate?text=hello&level=H&margin=4&dark=#000000&light=#ffffff&size=512
```

Response:

```json
{
  "qrCode": "data:image/png;base64,..." // base64 encoded PNG
}
```

Error Response:

```json
{
  "error": "Invalid request data",
  "details": [...] // validation errors
}
```

## Contributing

Found a bug or have an idea? Contributions are welcome! Feel free to:

- Open an issue
- Submit a pull request
- Suggest improvements

## License

[MIT License](https://github.com/pyyupsk/qrcode/blob/main/LICENSE) - feel free to use this project however you like.
