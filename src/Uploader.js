import React, { useState } from 'react';

export default function Uploader() {
  const [ content, setContent ] = useState(null);
  const [ progress, setProgress ] = useState(false);

  const previewFile = (e) => {
    const file = e.target.files[0];

    // Read from the file
    const reader = new FileReader();

    reader.onloadstart = () => {
      setProgress(true);
    }
    reader.onloadend = () => {
      setProgress(false);
    }
    reader.onload = () => {
      setContent(reader.result.split('\n').filter((item) => {
        return typeof item === 'string' && item !== '';
      }));
    }
    reader.onerror = () => {
      alert('Error while reading file. Check the logs!');
      console.log(reader.error);
    }
    reader.readAsText(file);
  }

  const uploadFile = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <input
        type="file"
        multiple={false}
        accept=".txt"
        onChange={previewFile}
      />
      {
        progress &&
        <div style={{ marginTop: '20px', }}>
          loading...
        </div>
      }
      {
        content &&
        <table 
          style={{
            width: '100%',
            display: 'block',
            maxHeight: '50vh',
            overflow: 'auto',
            border: 'thin solid lightgrey',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <tbody>
            <tr>
              <th
                style={{
                  position: 'sticky',
                  top: 0,
                  background: 'white',
                  boxShadow: '0 2px 2px -1px lightgrey',
                  padding: '5px',
                  textAlign: 'left',
                  borderBottom: 'thin solid lightgrey',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 'normal',
                }}
              >
                Links
              </th>
            </tr>
            {
              content.map((link) => (
                <tr key={link}>
                  <td
                    style={{
                      padding: '5px',
                      textAlign: 'left',
                      borderBottom: 'thin solid lightgrey',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    <a href={link}>
                      {
                        link
                      }
                    </a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
      <button
        type="button"
        disabled={!content}
        onClick={uploadFile}
        style={{
          width: '100%',
          marginTop: '20px',
        }}
      >
        Submit
      </button>
    </div>
  );
}
