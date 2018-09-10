import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListGroupItem } from 'reactstrap';

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
      <ListGroupItem
        action active={this.props.active}
        onClick={this.fileClicked}
        tag="button"
      >{this.props.fileInfo.name}
      </ListGroupItem>
    );
  }
}
