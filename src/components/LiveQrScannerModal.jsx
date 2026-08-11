import React, { useEffect, useState, useRef } from 'react';
import { QrCode, Camera, X, CheckCircle2, AlertCircle, RefreshCw, Smartphone, Monitor, ShieldCheck, User, Zap, Sparkles, AlertTriangle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

export default function LiveQrScannerModal({ 
  isOpen, 
  onClose, 
  onScanSuccess, 
  members = [], 
  initialMode = 'scanner' // 'scanner' | 'station-display'
}) {
  const [modalMode, setModalMode] = useState(initialMode); // 'scanner' | 'station-display'
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  
  const html5QrcodeScannerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setModalMode(initialMode);
      setScanResult(null);
      setErrorMessage('');
      setManualCode('');
      
      // Get available video cameras
      Html5Qrcode.getCameras().then((devices) => {
        if (devices && devices.length > 0) {
          setCameras(devices);
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
  }, [isOpen, initialMode]);

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
          // Scanning frame error
        }
      );
      setIsScanning(true);
    } catch (err) {
      setErrorMessage('Camera access permission denied or no video input device found. Use manual verification below.');
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
    // Search member by QR code, ID, phone, or name
    const foundMember = members.find(
      (m) => (m.qrCode && m.qrCode.toLowerCase() === trimmed.toLowerCase()) ||
             (m.id && m.id.toLowerCase() === trimmed.toLowerCase()) ||
             (m.phone && m.phone.includes(trimmed)) ||
             (m.name && m.name.toLowerCase().includes(trimmed.toLowerCase()))
    );

    if (foundMember) {
      const isActive = foundMember.status === 'Active' || !foundMember.status || foundMember.status === 'ACTIVE';

      if (isActive) {
        setScanResult({
          type: 'active',
          success: true,
          member: foundMember,
          title: 'ACCESS GRANTED • VALID ACTIVE MEMBER',
          message: `Check-in verified for ${foundMember.name} (${foundMember.id}). Plan: ${foundMember.plan || 'Quarterly Transformation'}.`
        });
        if (onScanSuccess) {
          onScanSuccess(foundMember.id);
        }
      } else {
        setScanResult({
          type: 'expired',
          success: false,
          member: foundMember,
          title: 'ACCESS RESTRICTED • MEMBERSHIP EXPIRED / INACTIVE',
          message: `Member ${foundMember.name} (${foundMember.id}) has an expired membership. Renewal is required.`
        });
      }
      stopCamera();
    } else {
      setScanResult({
        type: 'unknown',
        success: false,
        member: null,
        title: 'UNRECOGNIZED QR CODE / MEMBER ID',
        message: `Code "${trimmed}" was not found in the active member database.`
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
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border-2 border-yellow-400/80 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in relative text-white max-h-[90vh] overflow-y-auto">
        
        {/* Top Accent */}
        <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-lime-400 to-red-600" />

        {/* Modal Header */}
        <div className="bg-[#0a0a0a] px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-black font-['Outfit'] uppercase tracking-tight text-white">
              GYM QR STATION & SCANNER
            </h3>
          </div>
          <button 
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODE SWITCHER TABS */}
        <div className="p-4 bg-[#0d0d0d] border-b border-neutral-800 flex gap-2">
          <button
            onClick={() => {
              setModalMode('scanner');
              setScanResult(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase transition flex items-center justify-center gap-2 cursor-pointer ${
              modalMode === 'scanner' 
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" /> Mode A: Desk Scanner
          </button>

          <button
            onClick={() => {
              stopCamera();
              setModalMode('station-display');
              setScanResult(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase transition flex items-center justify-center gap-2 cursor-pointer ${
              modalMode === 'station-display' 
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" /> Mode B: Station QR Display
          </button>
        </div>

        {/* MODE A: DESK SCANNER & VERIFICATION */}
        {modalMode === 'scanner' && (
          <div className="p-6 space-y-6">
            
            {/* Real-Time Scan Status Result Banner */}
            {scanResult && (
              <div className={`p-4 rounded-2xl border flex items-start gap-3 shadow-xl ${
                scanResult.type === 'active' 
                  ? 'bg-emerald-950/90 border-emerald-500 text-emerald-400' 
                  : scanResult.type === 'expired'
                    ? 'bg-amber-950/90 border-amber-500 text-amber-300'
                    : 'bg-red-950/90 border-red-500 text-red-400'
              }`}>
                {scanResult.type === 'active' ? (
                  <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 shrink-0 text-amber-400 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="font-black text-xs uppercase tracking-wider">{scanResult.title}</p>
                  <p className="text-xs text-neutral-200">{scanResult.message}</p>
                  {scanResult.member && (
                    <div className="pt-1.5 flex items-center gap-2 text-[11px] font-mono text-white">
                      <span>ID: <strong>{scanResult.member.id}</strong></span>
                      <span>•</span>
                      <span>Total Check-ins: <strong>{(scanResult.member.totalCheckIns || 1) + (scanResult.type === 'active' ? 1 : 0)} Days</strong></span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Camera Scanner Viewport */}
            <div className="space-y-3">
              <div className="relative bg-black rounded-2xl overflow-hidden border-2 border-neutral-800 aspect-square max-h-64 mx-auto flex items-center justify-center shadow-inner">
                
                <div id="reader" className="w-full h-full"></div>

                {!isScanning && !scanResult && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-neutral-950/90 space-y-3">
                    <QrCode className="w-12 h-12 text-yellow-400 animate-pulse" />
                    <p className="text-xs font-bold text-neutral-400 max-w-xs">
                      Click "Start Live Camera Scanner" to scan digital membership passes using webcam.
                    </p>
                    <button
                      onClick={() => startCamera()}
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-yellow-400/20 transition cursor-pointer"
                    >
                      <Camera className="w-4 h-4" /> Start Live Camera Scanner
                    </button>
                  </div>
                )}
              </div>

              {/* Controls */}
              {isScanning && (
                <div className="flex items-center justify-between text-xs pt-1">
                  {cameras.length > 1 && (
                    <select
                      value={selectedCameraId}
                      onChange={(e) => {
                        setSelectedCameraId(e.target.value);
                        startCamera(e.target.value);
                      }}
                      className="bg-neutral-900 border border-neutral-700 text-white rounded-xl px-3 py-1.5 text-xs outline-none"
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
                    className="bg-red-600/30 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-extrabold px-3.5 py-1.5 rounded-xl transition ml-auto flex items-center gap-1 cursor-pointer"
                  >
                    Stop Scanner
                  </button>
                </div>
              )}
            </div>

            {errorMessage && (
              <p className="text-xs text-red-400 text-center font-bold">{errorMessage}</p>
            )}

            {/* Manual Verification Input */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-neutral-300">
                <Smartphone className="w-4 h-4 text-yellow-400" />
                <span>Or Enter Member ID / Phone Manually</span>
              </div>

              <form onSubmit={handleManualSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. EF-1001 or 9876543210"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white uppercase font-mono grow outline-none focus:border-yellow-400"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-5 py-3 rounded-xl shrink-0 transition cursor-pointer"
                >
                  Verify Member
                </button>
              </form>
            </div>

          </div>
        )}

        {/* MODE B: STATIONARY DISPLAY QR CODE (FOR DESK COUNTER) */}
        {modalMode === 'station-display' && (
          <div className="p-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 px-3.5 py-1 rounded-full text-yellow-400 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> OFFICIAL DESK SCAN STATION
            </div>

            <div>
              <h4 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                ENERGIE FITNESS <span className="text-yellow-400">CHECK-IN STATION</span>
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                Members: Point your phone camera or Member Portal scanner at this QR code to log attendance.
              </p>
            </div>

            {/* QR Code Display Frame */}
            <div className="bg-white p-6 rounded-3xl inline-block shadow-2xl border-4 border-yellow-400 relative">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=ENERGIE-FITNESS-BULANDSHAHR-STATION-CHECKIN" 
                alt="Energie Fitness Check-In Station QR Code" 
                className="w-48 h-48 mx-auto"
              />
              <div className="mt-3 text-[10px] font-mono font-black text-black uppercase tracking-widest border-t border-neutral-300 pt-2">
                STATION-ID: EF-BLD-VIP-01
              </div>
            </div>

            <div className="p-4 bg-black rounded-2xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span className="font-bold text-white">Live Desk Status:</span>
              <span className="text-lime-400 font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" /> STATION ONLINE
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
