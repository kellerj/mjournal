import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FileLink extends Component {
  static propTypes = {
    fileInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  }

  fileClicked = () => {
    this.props.onClick(this.props.fileInfo);
  }

  render() {
    return (
      <div>
        <button
          onClick={this.fileClicked}
          type="button"
        >{this.props.fileInfo.name}
        </button>
      </div>
    );
  }
}
