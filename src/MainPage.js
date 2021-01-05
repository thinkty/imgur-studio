import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredOverUpload: false,
      hoveredOverView: false,
      redirect: false,
    };
  }

  redirect = (event) => {
    this.setState({ redirect: event.target.id });
  }

  onMouseEnter = (event) => {
    const id = event.target.id;
    if (id === 'upload') {
      this.setState({ hoveredOverUpload: true });
    } else if (id === 'view') {
      this.setState({ hoveredOverView: true });
    }
  }

  onMouseLeave = (event) => {
    const id = event.target.id;
    if (id === 'upload') {
      this.setState({ hoveredOverUpload: false });
    } else if (id === 'view') {
      this.setState({ hoveredOverView: false });
    }
  }

  render() {
    const { redirect, hoveredOverUpload, hoveredOverView } = this.state;

    if (redirect === 'upload') {
      return (
        <Redirect
          push
          from="/"
          to="/upload"
        />
      );
    }

    if (redirect === 'view') {
      return (
        <Redirect
          push
          from="/"
          to="/view"
        />
      );
    }

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
            display: 'grid',
            gridTemplateColumns: '10vw 10vw',
            gridTemplateRows: 'auto 10vw',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              gridColumn: '1 / span 2',
              textAlign: 'center',
              fontFamily: 'monospace',
              fontSize: '30px',
            }}
          >
            Imgur Studio
          </div>
          <div
            id="upload"
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={this.redirect}
            style={{
              display: 'grid',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              border: `thin solid ${hoveredOverUpload ? '#c4c4c4' : '#4f4f4f'}`,
              borderRadius: '5px',
              backgroundColor: `${hoveredOverUpload ? '#c4c4c4' : '#fff'}`,
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '30px',
                color: `${hoveredOverUpload ? '#fff' : '#000'}`,
              }}
            >
              Upload
            </div>
          </div>
          <div
            id="view"
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={this.redirect}
            style={{
              display: 'grid',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              border: `thin solid ${hoveredOverView ? '#c4c4c4' : '#4f4f4f'}`,
              borderRadius: '5px',
              backgroundColor: `${hoveredOverView ? '#c4c4c4' : '#fff'}`,
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '30px',
                color: `${hoveredOverView ? '#fff' : '#000'}`,
              }}
            >
              View
            </div>
          </div>
        </div>
      </div>
    );
  }
}
