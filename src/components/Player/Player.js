
import React from 'react';
import './Player.css';

const playIcon = require('../../assect/icons/btn_play.png');
const pauseIcon = require('../../assect/icons/btn_pause.png');
const cutStartIcon = require('../../assect/icons/cut_music_start.png');
const cutFinishtIcon = require('../../assect/icons/cut_music_finish.png');

let timeupdate;
export default class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: 0,
      totalTime: '00:00',
      playedTime: '00:00',
      currentSong: {},
      isPlayed: false,
      initValue: 0
    };
  }

  componentDidMount() {
    const { mySongState, songListEntity } = this.props;
    const { radioSelect } = mySongState;
    const song = songListEntity[radioSelect];
    const totalTime = this.getTime(song.du);
    this.props.onRef && this.props.onRef(this);
    this.setState({
      ...this.state,
      isPlayed: true,
      totalTime,
      currentSong: song
    });
    const { audio } = this;
    if (song.bmt != 0) {
      audio.currentTime = song.bmt;
    }
    timeupdate = () => {
      // 判断是否越界
      if (
        (song.emt != 0 && audio.currentTime > song.emt) ||
        (song.bmt != 0 && audio.currentTime < song.bmt)
      ) {
        audio.currentTime = song.bmt;
      }
      const bmtWidth = song.bmt / song.du;
      // 设置播放进度条
      const newWidth = audio.currentTime / audio.duration;
      this.sliderHandler.style.left = `${newWidth * 100}%`;
      this.sliderTrack.style.left = `${bmtWidth * 100}%`;
      this.sliderTrack.style.width = `${(newWidth - bmtWidth) * 100}%`;
      // 设置经过时间
      const newPlayedTime = this.getTime(audio.currentTime);
      this.setState({
        playedTime: newPlayedTime
      });
    };
    audio.addEventListener('timeupdate', timeupdate);
  }

  componentWillUnmount() {
    const { audio } = this;
    audio.removeEventListener('timeupdate', timeupdate);
  }
  // 格式化时间
  getTime(musicTime) {
    if (musicTime) {
      if (musicTime < 60) {
        musicTime = `00:${musicTime < 10 ? `0${parseInt(musicTime, 10)}` : parseInt(musicTime, 10)}`;
      } else {
        musicTime = `${parseInt(musicTime / 60, 10) < 10 ?
          `0${parseInt(musicTime / 60, 10)}` :
          parseInt(musicTime / 60, 10)}:${musicTime % 60 < 10 ?
          `0${parseInt(musicTime % 60, 10)}` : parseInt(musicTime % 60, 10)}`;
      }
      return musicTime;
    }
    return '00:00';
  }
  // 设置进度条
  setSlider = e => {
    const { audio } = this;
    const song = this.state.currentSong;
    const limitStartWidth = song.bmt / song.du;
    const limitEndWidth = song.emt / song.du;
    const newWidth = (e.targetTouches[0].pageX - this.slideInner.offsetLeft) / this.slideInner.offsetWidth;
    if (newWidth > 1 || newWidth < 0) {
      this.setState({
        flag: 0
      });
      return;
    }
    if (limitEndWidth == 0 || (newWidth <= limitEndWidth && newWidth >= limitStartWidth)) {
      this.sliderHandler.style.left = `${newWidth * 100}%`;
      this.sliderTrack.style.left = `${limitStartWidth * 100}%`;
      this.sliderTrack.style.width = `${(newWidth - limitStartWidth) * 100}%`;
      audio.currentTime = newWidth * audio.duration;
    }
  }
  // 获取player类型
  getPlayerType = () => {
    if (this.props.type == 'reverse') {
      return 'Player-wrap-reverse';
    }
    return 'Player-wrap';
  }
  // 获取当前播放时间
  getCurrentTime() {
    const { audio } = this;
    return audio.currentTime;
  }
  // 手指触摸滑动条
  handleTouchStart = e => {
    this.setState({
      flag: 1
    });
    this.setSlider(e);
  }
  // 手指在滑动条上滑动
  handleTouchMousemove = e => {
    if (this.state.flag == 1) {
      this.setSlider(e);
    }
  }
  // 手指离开滑动条
  leave = () => {
    this.setState({
      flag: 0
    });
  }

  // 播放控制
  handlePlay = () => {
    const { audio } = this;
    if (this.state.isPlayed) {
      audio.pause();
      this.setState({
        isPlayed: false
      });
    } else {
      audio.play();
      this.setState({
        isPlayed: true
      });
    }
  }
  // 渲染截取片段图标
  renderCutIcon = () => {
    const { currentSong } = this.state;
    const cutStartLeft = currentSong.bmt / currentSong.du * 100;
    const cutFinishLeft = currentSong.emt / currentSong.du * 100;
    if (currentSong.bmt != 0 || currentSong.emt != 0) {
      return (
        <div className="Player-cutIcon-wrap">
          <img src={cutStartIcon} style={{ left: `${cutStartLeft}%` }} className="Player-cutIcon" />
          {currentSong.emt ? <img src={cutFinishtIcon} style={{ left: `${cutFinishLeft}%` }} className="Player-cutIcon" /> : ''}
        </div>
      );
    }
  }
  render() {
    return (
      <div className={this.getPlayerType()}>
        <div className="Player-top">
          {/* 时间 */}
          <div className="time-wrapper">
            <div className="remain-time">{this.state.currentSong.m_url ? this.state.playedTime : '00:00'}</div>
            <span>/</span>
            <div className="total-time">{this.state.currentSong.m_url ? this.state.totalTime : '00:00'}</div>
          </div>
        </div>
        <div className="Player-bottom">
          {/* 播放/暂停 按钮 */}
          <div onClick={this.handlePlay}>
            {this.state.isPlayed ? <img src={pauseIcon} className="Player-icon" /> :
            <img src={playIcon} className="Player-icon" />}
          </div>
          {/* 滑动轴 */}
          <div
            className="slider"
            onTouchMove={this.handleTouchMousemove}
            onTouchEnd={this.leave}
          >
            <div className="sliderInner" ref={self => { this.slideInner = self; }} onTouchStart={this.handleTouchStart}>
              <div
                ref={self => { this.sliderTrack = self; }}
                style={{ width: `${this.state.initValue}%` }}
                className="sliderTrack"
              />
              <div
                ref={self => { this.sliderHandler = self; }}
                style={{ left: `${this.state.initValue}%` }}
                className="sliderHandler"
                onTouchStart={this.handleTouchStart}
              />
              {this.renderCutIcon()}
            </div>
          </div>
        </div>
        <audio
          src={this.state.currentSong.m_url ? this.state.currentSong.m_url : ''}
          ref={child => this.audio = child}
          autoPlay
          loop
        />
      </div>
    );
  }
}
