import React from 'react';
import './CutsongView.css';
import Player from '../../Player/Player';

const button_cut_music_start = require('../../../assect/icons/button_cut_music_start.png');
const button_cut_music_start_gray = require('../../../assect/icons/button_cut_music_start_gray.png');
const button_cut_music_finish = require('../../../assect/icons/button_cut_music_finish.png');
const button_cut_music_finish_gray = require('../../../assect/icons/button_cut_music_finish_gray.png');
const button_cut_music_clear = require('../../../assect/icons/button_cut_music_clear.png');
const button_cut_music_clear_gray = require('../../../assect/icons/button_cut_music_clear_gray.png');

export default class CutsongView extends React.PureComponent {
  onRef = ref => {
    this.child = ref;
  }
  getCurrentTime = () => this.child.getCurrentTime()
  // 格式化时间
  getTime(musicTime) {
    if (musicTime) {
      if (musicTime < 60) {
        musicTime = `00:${musicTime < 10 ? `0${parseInt(musicTime, 10)}` : parseInt(musicTime, 10)}`;
      } else {
        musicTime = `${parseInt(musicTime / 60, 10) < 10 ?
          `0${parseInt(musicTime / 60, 10)}` :
          parseInt(musicTime / 60, 10)}:${musicTime % 60 < 10 ?
          `0${parseInt(musicTime % 60, 10)}` :
          parseInt(musicTime % 60, 10)}`;
      }
      return musicTime;
    }
    return '00:00';
  }
  cutSong = type => {
    const { mySongState, Actions, songListEntity } = this.props;
    const { radioSelect } = mySongState;
    const currentSong = songListEntity[radioSelect];
    const { bmt, emt } = currentSong;
    const currentTime = this.getCurrentTime();
    const data = {
      id: radioSelect,
      val: currentTime
    };
    switch (type) {
      case 'Begin': {
        if (bmt != 0 || emt != 0) {
          return;
        }
        Actions.cutSongBegin(data);
      } break;
      case 'Clear': {
        if (bmt == 0 && emt == 0) {
          return;
        }
        Actions.cutSongClear(data);
      } break;
      case 'End': {
        if (emt != 0) {
          return;
        }
        if (bmt == 0) {
          Actions.changeTipsMessage('请先截取起点');
          return;
        }
        if (currentTime - bmt < 10) {
          Actions.changeTipsMessage('截取时间需要大于10s');
          return;
        }
        Actions.cutSongEnd(data);
      } break;
      default:
    }
  }
  cutSongBegin = () => {
    this.cutSong('Begin');
  }
  cutSongClear = () => {
    this.cutSong('Clear');
  }
  cutSongEnd = () => {
    this.cutSong('End');
  }
  render() {
    const { mySongState, songListEntity, Actions } = this.props;
    const { radioSelect } = mySongState;
    const currentSong = songListEntity[radioSelect];
    const startTime = this.getTime(currentSong.bmt);
    const endTime = this.getTime(currentSong.emt);
    let startIcon = button_cut_music_start_gray;
    let clearIcon = button_cut_music_clear_gray;
    let endIcon = button_cut_music_finish_gray;
    if (!currentSong.bmt && !currentSong.emt) {
      startIcon = button_cut_music_start;
    }
    if (!currentSong.emt) {
      endIcon = button_cut_music_finish;
    }
    if (currentSong.emt || currentSong.bmt) {
      clearIcon = button_cut_music_clear;
    }
    return (
      <div className="CutsongView-wrap">
        <div className="mask" onClick={Actions.hideSongPlayer} />
        <div className="CutsongView-content slideInUp">
          <div className="CutsongView-workor" onClick={this.click}>
            <div className="CutsongView-workor-item">
              <img src={startIcon} className="CutsongView-workor-icon" onClick={this.cutSongBegin} />
              <div className="CutsongView-workor-text">标记起点</div>
              <div className="CutsongView-workor-time">{startTime}</div>
            </div>

            <div className="CutsongView-workor-item">
              <img src={clearIcon} className="CutsongView-workor-icon" onClick={this.cutSongClear} />
              <div className="CutsongView-workor-text">清除</div>
            </div>

            <div className="CutsongView-workor-item">
              <img src={endIcon} className="CutsongView-workor-icon" onClick={this.cutSongEnd} />
              <div className="CutsongView-workor-text">标记终点</div>
              <div className="CutsongView-workor-time">{endTime}</div>
            </div>

          </div>
          <Player mySongState={mySongState} songListEntity={songListEntity} type="reverse" onRef={this.onRef} />
          <div onClick={Actions.hideSongPlayer} className="CutsongView-closebtn">完成</div>
        </div>
      </div>
    );
  }
}
