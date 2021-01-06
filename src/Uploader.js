import React, { Component } from 'react';
import { uploadStatus } from './App';


export default class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumId: null,
    };
  }

  /**
   * Upload the urls to Imgur.
   * 
   * 1. Create an anonymous album and get the deleteHash and id in return
   * 2. Upload the urls using the deleteHash
   */
  uploadFile = (e) => {
    e.preventDefault();

    const { setStatus, urls } = this.props;
    setStatus(uploadStatus.uploading);
    const clientId = '860c31d168c3708';

    // Album creation
    const albumHeaders = new Headers();
    albumHeaders.append('Authorization', `Client-ID ${clientId}`);
    const albumFormData = new FormData();
    albumFormData.append('privacy', 'hidden');

    fetch('https://api.imgur.com/3/album', {
      method: 'POST',
      headers: albumHeaders,
      body: albumFormData,
    })
    .then((albResRaw) => albResRaw.json())
    .then(async (albRes) => {
      if (albRes.status !== 200) {
        throw Error(JSON.stringify(albRes));
      }

      // DeleteHash and Id retrieved
      const { deletehash, id } = albRes.data;
      console.log(`Album id: ${id}`);

      for (const url of urls) {
        const imageHeaders = new Headers();
        imageHeaders.append('Authorization', `Client-ID ${clientId}`);
        const imageFormData = new FormData();
        imageFormData.append('type', 'URL');
        imageFormData.append('image', url);
        imageFormData.append('album', deletehash);

        await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: imageHeaders,
          body: imageFormData,
          redirect: 'follow',
        })
        .then((imgResRaw) => imgResRaw.json())
        .then((imgRes) => {
          if (imgRes.status !== 200) {
            throw Error(JSON.stringify(imgRes));
          }
        });
      }

      setStatus(uploadStatus.ready);
      this.setState({ albumId: id });
    })
    .catch((err) => {
      alert('Oops! Something went wrong!');
      console.error(err);
      setStatus(uploadStatus.ready);
    });
  }

  render() {
    const { albumId } = this.state;
    const { status } = this.props;

    return (
      <div style={{ width: '100%', marginTop: '20px' }}>
        <button
          type="button"
          disabled = {
            status === uploadStatus.waiting ||
            status === uploadStatus.uploading
          }
          onClick={this.uploadFile}
          style={{ width: '100%' }}
        >
          {
            status === uploadStatus.uploading
            ?
            'Uploading...'
            :
            'Upload'
          }
        </button>
        {
          albumId &&
          <div
            style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'normal',
              marginTop: '20px',
            }}
          >
            Upload successful:&nbsp;
            <a href={`https://imgur.com/a/${albumId}`}>
              {`https://imgur.com/a/${albumId}`}
            </a>
          </div>
        }
      </div>
    );
  }
}
