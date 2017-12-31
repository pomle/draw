import React, { Component } from 'react';

function getSize(width, height, aspectRatio) {
    const size = {
      w: height * aspectRatio,
      h: width / aspectRatio,
    };

    if (size.h > height) {
      size.h = height;
    } else {
      size.w = width;
    }

    return size;
}

class Fill extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.fit);
    this.fit();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fit);
  }

  fit = () => {
    const w = window.visualViewport.width;
    const h = window.visualViewport.height;

    const size = getSize(w, h, this.props.aspect);

    for (const node of this.node.children) {
      Object.assign(node.style, {
        position: 'absolute',
        top: `${(h - size.h) / 2}px`,
        left: `${(w - size.w) / 2}px`,
        height: `${size.h}px`,
        width: `${size.w}px`,
      });
    }
  }

  render() {
    return (
      <div ref={node => this.node = node}>
        {this.props.children}
      </div>
    );
  }
}

export default Fill;
