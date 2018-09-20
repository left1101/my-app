import React from 'react';
import List from './List/List';
import './SongList.css';

export default function SongList(props) {
  const { songListEntity, mySongState, Actions } = props;
  const {
    mySonglist, recommendSonglist, mode, selectList, radioSelect
  } = mySongState;
  return (
    <div className="SongList-wrap">
      <List
        title="我的音乐"
        songListEntity={songListEntity}
        Actions={Actions}
        SongList={mySonglist}
        mode={mode}
        selectList={selectList}
        radioSelect={radioSelect}
      />
      <List
        title="推荐音乐"
        songListEntity={songListEntity}
        Actions={Actions}
        SongList={recommendSonglist}
        mode={mode}
        selectList={selectList}
        radioSelect={radioSelect}
      />
    </div>
  );
}
