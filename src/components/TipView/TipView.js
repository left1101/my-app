import React from 'react';
import PropTypes from 'prop-types';
import './TipView.css';

export default class TipView extends React.Component {
  static defaultProps = {
    text: '默认',
    onCancel: () => {},
    duration: 2000
  };
  static propTypes = {
    text: PropTypes.string,
    onCancel: PropTypes.func,
    duration: PropTypes.number
  }
  constructor() {
    super();
    this.state = {
      className: 'TipView-wrap-hide'
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.text != '') {
      this.setState({
        className: 'TipView-wrap-show'
      });
      window.setTimeout(() => {
        nextProps.onCancel();
      }, nextProps.duration);
    } else {
      this.setState({
        className: 'TipView-wrap-hide'
      });
    }
  }
  render() {
    const { text } = this.props;
    return (
      <div className={this.state.className}>
        {text}
      </div>
    );
  }
}
