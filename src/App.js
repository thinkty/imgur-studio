import React, { Component } from 'react';
import FileInput from './FileInput';
import Uploader from './Uploader';

/**
 * Enum for the upload status
 * @readonly
 * @enum
 */
export const uploadStatus = {
  waiting: 0,
  ready: 1,
  uploading: 2,
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: null,
      status: uploadStatus.waiting,
    };
  }

  /**
   * This method is called when a file has been selected
   * @param {string[]} urls Array of string urls
   */
  setUrls = (urls) => {
    this.setState({ urls, status: uploadStatus.ready });
  }

  /**
   * This method is called during various stages while uploading the image
   * @param {uploadStatus} status
   */
  updateStatus = (status) => {
    this.setState({ status });
  }

  render() {
    const { urls, status } = this.state;

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
          <FileInput urls={urls} setUrls={this.setUrls} />
          <Uploader urls={urls} status={status} setStatus={this.updateStatus} />
        </div>
      </div>
    );
  }
}
