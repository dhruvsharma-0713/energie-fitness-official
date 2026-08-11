import React, { useEffect, useState, useRef } from 'react';
import { QrCode, Camera, X, CheckCircle2, AlertCircle, RefreshCw, Smartphone } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

export default function LiveQrScannerModal({ isOpen, onClose, onScanSuccess, members = [] }) {
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  
  const html5QrcodeScannerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setScanResult(null);
      setErrorMessage('');
      setManualCode('');
      
      // Get available video cameras
      Html5Qrcode.getCameras().then((devices) => {
        if (devices && devices.length > 0) {
          setCameras(devices);
          // Prefer back camera if available
          const backCamera = devices.find(d => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('rear')) || devices[0];
          setSelectedCameraId(backCamera.id);
        }
      }).catch(() => {
        // Camera access denied or not available
      });
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async (cameraId) => {
    setErrorMessage('');
    if (html5QrcodeScannerRef.current) {
      await stopCamera();
    }

    try {
      const html5QrCode = new Html5Qrcode('reader');
      html5QrcodeScannerRef.current = html5QrCode;
      
      const targetCam = cameraId || selectedCameraId || { facingMode: 'environment' };

      await html5QrCode.start(
        targetCam,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          handleDecodedText(decodedText);
        },
        (error) => {
          // Frame scan error (normal while scanning)
        }
      );
      setIsScanning(true);
    } catch (err) {
      setErrorMessage('Camera access failed or unavailable. Please use manual entry below.');
      setIsScanning(false);
    }
  };

  const stopCamera = async () => {
    if (html5QrcodeScannerRef.current && isScanning) {
      try {
        await html5QrcodeScannerRef.current.stop();
        html5QrcodeScannerRef.current.clear();
      } catch (err) {
        // Ignore stop errors
      }
      setIsScanning(false);
    }
  };

  const handleDecodedText = (qrString) => {
    const trimmed = qrString.trim();
    // Search member by QR code or ID or name
    const foundMember = members.find(
      (m) => (m.qrCode && m.qrCode.toLowerCase() === trimmed.toLowerCase()) ||
             (m.id && m.id.toLowerCase() === trimmed.toLowerCase()) ||
             (m.name && m.name.toLowerCase().includes(trimmed.toLowerCase()))
    );

    if (foundMember) {
      setScanResult({
        success: true,
        member: foundMember,
        message: `Attendance Verified! Welcome ${foundMember.name}`
      });
      onScanSuccess(foundMember.id);
      stopCamera();
    } else {
      setScanResult({
        success: false,
        member: null,
        message: `Scanned code "${trimmed}" not recognized in active member roster.`
      });
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    handleDecodedText(manualCode);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="bg-[#121212] border-2 border-red-600/60 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in relative text-white">
        
        {/* Header */}
        <div className="bg-[#0a0a0a] px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-yellow-400">
            <Camera className="w-5 h-5" />
            <h3 className="text-xl font-black font-['Outfit'] uppercase tracking-tight text-white">
              LIVE QR ATTENDANCE SCANNER
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Result Alert */}
          {scanResult && (
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
              scanResult.success 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400' 
                : 'bg-red-950/40 border-red-500/50 text-red-400'
            }`}>
              {scanResult.success ? (
                <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 shrink-0 text-red-400 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-extrabold text-sm">{scanResult.message}</p>
                {scanResult.member && (
                  <p className="text-xs text-neutral-300">
                    Plan: <span className="font-bold text-yellow-400">{scanResult.member.plan}</span> | Total Check-ins: <span className="font-bold text-white">{scanResult.member.totalCheckIns + 1}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Camera Scanner Container */}
          <div className="space-y-3">
            <div className="relative bg-black rounded-2xl overflow-hidden border border-neutral-800 aspect-square max-h-72 mx-auto flex items-center justify-center">
              
              <div id="reader" className="w-full h-full"></div>

              {!isScanning && !scanResult && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-neutral-950/90 space-y-3">
                  <QrCode className="w-12 h-12 text-yellow-400 animate-pulse" />
                  <p className="text-xs font-bold text-neutral-400 max-w-xs">
                    Click "Start Live Camera" to scan digital membership QR code using device camera.
                  </p>
                  <button
                    onClick={() => startCamera()}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-yellow-400/20 transition"
                  >
                    <Camera className="w-4 h-4" /> Start Live Camera
                  </button>
                </div>
              )}
            </div>

            {/* Controls */}
            {isScanning && (
              <div className="flex items-center justify-between text-xs">
                {cameras.length > 1 && (
                  <select
                    value={selectedCameraId}
                    onChange={(e) => {
                      setSelectedCameraId(e.target.value);
                      startCamera(e.target.value);
                    }}
                    className="bg-neutral-900 border border-neutral-700 text-white rounded-lg px-2.5 py-1.5 text-xs outline-none"
                  >
                    {cameras.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label || `Camera ${c.id}`}
                      </option>
                    ))}
                  </select>
                )}
                
                <button
                  onClick={stopCamera}
                  className="bg-red-600/30 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-extrabold px-3 py-1.5 rounded-lg transition ml-auto flex items-center gap-1"
                >
                  Stop Camera
                </button>
              </div>
            )}
          </div>

          {errorMessage && (
            <p className="text-xs text-red-400 text-center font-semibold">{errorMessage}</p>
          )}

          {/* Manual Entry Fallback */}
          <div className="pt-4 border-t border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-neutral-400">
              <Smartphone className="w-4 h-4 text-yellow-400" />
              <span>Or Enter QR Code / Member ID Manually</span>
            </div>

            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. EF-1001 or EF-1001-AMIT"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="input-field grow text-xs font-mono uppercase"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl shrink-0 transition"
              >
                Verify Pass
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
