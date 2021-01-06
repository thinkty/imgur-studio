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
      <form
        onSubmit={uploadFile}
        style={{
          paddingBottom: '20px',
        }}
      >
        <input
          type="file"
          multiple={false}
          accept=".txt"
          onChange={previewFile}
        />
        <button
          type="submit"
          disabled={!content}
        >
          Submit
        </button>
      </form>
      {
        progress &&
        <div>
          loading...
        </div>
      }
      {
        content &&
        <table 
          style={{
            width: '100%',
            border: 'thin solid lightgrey',
            borderCollapse: 'collapse',
          }}
        >
          <tbody>
            <tr>
              <th
                style={{
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
    </div>
  );
}
