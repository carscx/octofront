// src/components/WebcamStream.tsx
import React from 'react';

const WebcamStream: React.FC = () => {
  const webcamUrl = 'http://192.168.1.19/webcam/?action=stream'; // Reemplaza con la URL de tu webcam

  return (
    <div>
      <h1>Webcam Stream</h1>
      <img src={webcamUrl} alt="Webcam Stream" style={{ width: '100%' }} />
    </div>
  );
};

export default WebcamStream;
