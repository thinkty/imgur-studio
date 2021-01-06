import React, { useState } from 'react';

export default function FileInput({ urls, setUrls }) {
  const previewFile = (e) => {
    const file = e.target.files[0];

    // Read from the file
    const reader = new FileReader();

    reader.onload = () => {
      let parsedUrls = reader.result.split('\n').filter((item) => {
        return typeof item === 'string' && item !== '';
      });
      parsedUrls = parsedUrls.map((item) => item.replaceAll(/\r?\n|\r/g, ''));

      setUrls(parsedUrls);
    }
    reader.onerror = () => {
      alert('Error while reading file. Check the logs!');
      console.log(reader.error);
    }
    reader.readAsText(file);
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
        urls &&
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
              urls.map((link) => (
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
