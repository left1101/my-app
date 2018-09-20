import React from 'react';
import PropTypes from 'prop-types';
import './Dialog.css';

export default class Dialog extends React.Component {
  static defaultProps = {
    isActive: false,
    title: '这里是事例',
    renderBody: () => {},
    okText: '确定',
    cancelText: '取消',
    onOk: () => { alert('点击确定'); },
    onCancel: () => {}
  };
  static propTypes = {
    isActive: PropTypes.bool,
    title: PropTypes.string,
    renderBody: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  }

  getShowlog = () => {
    if (!this.props.isActive) {
      return 'hide';
    }
    return 'show';
  }
  render() {
    const { title } = this.props;
    return (
      <div className={this.getShowlog()}>
        <div className="mask" onClick={this.props.onCancel} />
        <div className="Dialog-wrap">
          {title.length ? <div className="dialog-title">{title}</div> : null}
          {
            this.props.renderBody ? this.props.renderBody() : ''
          }
          <div className="btnWrap">
            <div className="btn-cancel" onClick={this.props.onCancel}>{this.props.cancelText}</div>
            <div className="btn-ok" onClick={this.props.onOk}>{this.props.okText}</div>
          </div>
        </div>
      </div>
    );
  }
}
