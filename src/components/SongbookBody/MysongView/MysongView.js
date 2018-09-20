import React, { Component } from 'react';
import ModeBar from './ModeBar/ModeBar';
import SongList from './SongList/SongList';
import ToolBar from './ToolBar/ToolBar';
import './MysongView.css';

const height = window.screen.height - 61 - 66 - 31;
export default class MysongView extends Component {
  componentDidMount() {
    const { Actions } = this.props;
    Actions.fetchMySonglsit();
    Actions.fetchRecommendSonglsit();
  }
  render() {
    const { mySongState, songListEntity, Actions } = this.props;
    const { mode } = mySongState;
    return (
      <div className="MysongView-wrap" style={{ height: `${height}px` }}>
        <ModeBar Actions={Actions} mode={mode} songListEntity={songListEntity} />
        <SongList songListEntity={songListEntity} mySongState={mySongState} Actions={Actions} />
        <ToolBar Actions={Actions} mySongState={mySongState} songListEntity={songListEntity} />
      </div>
    );
  }
}
