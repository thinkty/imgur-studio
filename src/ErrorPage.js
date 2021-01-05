import React from 'react';

export default function ErrorPage() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '40px',
          fontWeight: 'bold',
        }}
      >
        404 Not Found 😞
      </div>
    </div>
  );
}
