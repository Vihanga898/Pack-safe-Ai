import React, { useState } from 'react';
import axios from 'axios';

const FrameViewer = () => {
  const [frameId, setFrameId] = useState('');
  const [frameUrl, setFrameUrl] = useState('');

  const handleViewFrame = async () => {
    try {
      // Fetch the frame image from Cloudinary
      const response = await axios.get(`https://res.cloudinary.com/dwkqvqvdj/image/upload/${frameId}`, {
        responseType: 'blob', // Important: responseType as 'blob' for binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setFrameUrl(url);
    } catch (error) {
      console.error('Error fetching frame:', error);
    }
  };

  return (
    <div>
      <input type="text" value={frameId} onChange={(e) => setFrameId(e.target.value)} placeholder="Paste Frame ID" />

      <button onClick={handleViewFrame}style={{width: '130px', height: '40px', fontSize: '15px' }}>View Frame</button>
      {frameUrl && (
        <div style={{ textAlign: 'center' }}>
          <img src={frameUrl} alt="Processed Frame" style={{ maxWidth: '57%', height: '60%' }} />
        </div>
      )}
    </div>
  );
};

export default FrameViewer;
