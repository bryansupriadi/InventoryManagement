import React, { useState, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { useNavigate } from 'react-router-dom';
import SideBar from '../Components/SideBar';

function Scanner() {
  const [scanResult, setScanResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.decodeFromInputVideoDevice(undefined, 'video', { videoFacingMode: 'environment' })
      .then((result) => {
        setScanResult(result.getText());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (scanResult) {
      navigate(scanResult);
    }
  }, [scanResult, navigate]);

  return (
    <div className='App'>
      <div className='scanner-page-container'>
        <div className='navbar-container'>
          <h1>Scan QR Code</h1>
          <SideBar />
        </div>
        <div className='product-qr-scan'>
          <video id='video' style={{ width: '100%', transform: 'scaleX(-1)' }}></video>
          <div>{scanResult}</div>
          <h6>You can see the product details by scanning the product QR code</h6>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
