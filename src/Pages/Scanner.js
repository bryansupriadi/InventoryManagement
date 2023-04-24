// import React, { useState } from 'react';
// import QrReader from 'react-qr-reader';
// import { useHistory } from 'react-router-dom';

// function QRScanner() {
//   const history = useHistory();
//   const [qrData, setQRData] = useState('');

//   const handleScan = (data) => {
//     if (data) {
//       setQRData(data);
//       history.push(`/product-detail/${data}`);
//     }
//   }

//   const handleError = (err) => {
//     console.error(err);
//   }

//   return (
//     <div>
//       <QrReader
//         delay={300}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: '100%' }}
//       />
//       <p>{qrData}</p>
//     </div>
//   );
// }

// export default QRScanner;
