import React from 'react';
import Uploader from './Uploader';

export default function App() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          border: 'thin solid lightgrey',
          borderRadius: '10px',
          padding: '20px',
          margin: '20px',
        }}
      >
        <div
          style={{
            paddingBottom: '20px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Upload images to Imgur by reading texts from a given file
        </div>
        <Uploader />
      </div>
    </div>
  );
}
