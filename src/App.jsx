
import './App.css';
import QRCodeReader from './components/QRCodeReader.jsx';

function App() {
  return (
    <div className='container'>
      <header className='app-header'>
        <h1>QR Code Scanner</h1>
        <p>Scan QR codes using your device's camera or by uploading an image.</p>
      </header>
      <main>
        <QRCodeReader />
      </main>
    </div>
  );
}

export default App;