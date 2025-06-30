## 📱 React QR Code Reader

A responsive QR code scanner application built with React and the html5-qrcode library. This app allows users to scan QR codes using their device's camera or by uploading an image file.

## 🚀 Features

- Camera Scanning: Real-time QR code detection using device camera

- Image Upload: Scan QR codes from uploaded image files

- Copy Functionality: One-click copy of scanned results

- Responsive Design: Works on both mobile and desktop devices

- Modern UI: Clean interface with dark/light mode support

🖼️ Screenshots

https://./src/qr-scanner-screenshot.png
Example: Scanning a QR code with the camera

## 🛠️ Getting Started
🔧 Prerequisites

    Node.js (v16 or later recommended)

    npm or yarn

    Modern browser with camera access

## 📦 Installation

    Clone the repository
    
    git clone https://github.com/Brace1000/QR-Code-Reader.git
    
```
    cd QR-CODE-READER
```
    


## Install dependencies
```
npm install
```



## Start the development server
npm run dev
```

Then open your browser and navigate to:
http://localhost:5173

## 📁 Project Structure

qr-code-reader/
├── public/
├── src/
│   ├── components/
│   │   ├── QRCodeReader.jsx
│   │   └── QRCodeReader.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md

## 🧠 Technologies Used

    - React (Functional Components with Hooks)

    - html5-qrcode for QR code scanning functionality

    - Modern CSS with CSS variables for theming

    - Vite for fast development environment

    💡 Usage Instructions

    1.Camera Scanning:

        - Click "Scan with Camera" button

        - Grant camera permissions when prompted

        - Point camera at QR code

        - Scanned results will appear automatically

    2.Image Upload:

        - Click "Scan from Image" button

        - Select an image file containing QR code

        - Results will display after processing

    3.After Scanning:

        - Click "Copy" to copy results to clipboard

        - Click "Scan Again" to reset the scanner

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙌 Acknowledgements

    html5-qrcode for the excellent scanning library

    React for the component-based architecture

    Vite for the fast development tooling