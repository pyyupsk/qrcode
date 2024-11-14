# QR Code Studio

QR Code Studio is a web application that allows users to generate, scan, and customize QR codes with advanced options. The application is built using Next.js and offers a user-friendly interface for creating and managing QR codes.

## Features

- **Generate QR Codes**: Create QR codes for URLs, and text.
- **Scan QR Codes**: Upload an image and retrieve the data contained within the QR code.
- **Customize Options**: Adjust error correction levels, margin sizes, colors, and resolution for generated QR codes.
- **Client-Side Processing**: The application works entirely on the client side, ensuring that no data is sent to the server.
- **Open Source**: The source code is available on GitHub for anyone to view and contribute.

## Installation

To get started with QR Code Studio, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pyyupsk/qrcode.git
   cd qrcode
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Usage

1. **Generating QR Codes**:
   - Select the type of input (URL or text).
   - Enter the desired content.
   - Customize the QR code options (color, resolution, etc.).
   - Click on "Generate QR Code" to create your QR code.

2. **Scanning QR Codes**:
   - Navigate to the scan tab.
   - Use the upload option or drag and drop an image containing a QR code.
   - Click on "Scan QR Code" to retrieve the data.

3. **Downloading QR Codes**:
   - After generating a QR code, you can download it by clicking the "Download QR Code" button.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
