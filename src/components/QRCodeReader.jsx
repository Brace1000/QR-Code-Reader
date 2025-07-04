// src/components/QRCodeReader.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './QRCodeReader.css';

const qrConfig = { fps: 10, qrbox: { width: 250, height: 250 } };
let html5QrCode;

const QRCodeReader = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const fileInputRef = useRef(null);

    const stopScanning = useCallback(() => {
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop()
                .then(() => {
                    console.log("Scanner stopped.");
                    setIsScanning(false);
                })
                .catch((err) => {
                    console.error("Failed to stop scanner.", err);
                });
        }
    }, []);
    
    const handleScanSuccess = (decodedText) => {
        setResult(decodedText);
        setError(null);
        stopScanning();
    };

    const handleScanError = (errorMessage) => {
        // Optional: Handle specific scan errors
    };

    const startCameraScan = async () => {
        if (window.html5QrCode) {
           stopScanning();
        }
        
        setResult(null);
        setError(null);
        setIsScanning(true);
        html5QrCode = new Html5Qrcode('qr-reader-p');
        
        try {
            await html5QrCode.start(
                { facingMode: "environment" }, // Prioritize back camera
                qrConfig,
                handleScanSuccess,
                handleScanError
            );
        } catch (err) {
            console.error("Camera start failed.", err);
            setError("Failed to start camera. Please grant camera permissions.");
            setIsScanning(false);
        }
    };
    
    const handleFileScan = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        stopScanning();
        setResult(null);
        setError(null);

        try {
            // Create a temporary container for file scanning
            const tempContainerId = 'temp-file-scanner';
            const tempContainer = document.createElement('div');
            tempContainer.id = tempContainerId;
            tempContainer.style.display = 'none';
            document.body.appendChild(tempContainer);

            const fileScanner = new Html5Qrcode(tempContainerId);
            const decodedText = await fileScanner.scanFile(file, false);
            setResult(decodedText);
            
            // Clean up
            fileScanner.clear();
            document.body.removeChild(tempContainer);
        } catch (err) {
            console.error("File scan failed.", err);
            setError("Could not read QR code from the image. Please try another image.");
        } finally {
            fileInputRef.current.value = "";
        }
    };

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            alert("Copied to clipboard!");
        }
    };
    
    const handleReset = () => {
        stopScanning();
        setResult(null);
        setError(null);
        fileInputRef.current.value = ""; // Clear file input
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (html5QrCode && html5QrCode.isScanning) {
                stopScanning();
            }
        };
    }, [stopScanning]);

    return (
        <div className="qr-reader-container">
            <div className="scanner-window">
                <div id="qr-reader-p" className={isScanning ? 'visible' : ''}></div>
                {!isScanning && !result && !error && (
                    <div className="placeholder">
                        <p>Your camera view will appear here</p>
                    </div>
                )}
                {error && <div className="placeholder error">{error}</div>}
                {result && <div className="placeholder success">Scan Successful!</div>}
            </div>

            <div className="controls">
                {!isScanning ? 
                    <button onClick={startCameraScan}>Scan with Camera</button>
                    :
                    <button onClick={stopScanning}>Stop Camera</button>
                }
                <button onClick={() => fileInputRef.current.click()}>Scan from Image</button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileScan}
                    style={{ display: 'none' }}
                />
                {/* Reset button always visible for better UX */}
                <button className="reset-button" onClick={handleReset}>Reset Scanner</button>
            </div>

            {result && (
                <div className="result-container">
                    <h3>Scanned Result:</h3>
                    <div className="result-text">{result}</div>
                    <div className="result-actions">
                        <button onClick={handleCopy} className="copy-button">Copy</button>
                        <button onClick={handleReset} className="reset-button">Scan Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QRCodeReader;