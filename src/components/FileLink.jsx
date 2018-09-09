import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FileButton } from '../StructuralComponents.jsx';

export default class FileLink extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
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
        <FileButton
          active={this.props.active}
          onClick={this.fileClicked}
          type="button"
        >{this.props.fileInfo.name}
        </FileButton>
      </div>
    );
  }
}
