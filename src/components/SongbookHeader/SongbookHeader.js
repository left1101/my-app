import React from 'react';
import './SongbookHeader.css';

const returnIcon = require('../../assect/icons/return.png');

export default function SongbookHeader(props) {
  const { userInfo, songBook } = props;
  const { selectList, mode, radioSelect } = songBook.mySongState;
  const goback = () => {
    alert('go back');
  };
  const handleFinishBtn = () => {
    if (mode == 'radio') { alert(radioSelect); } else { alert(selectList); }
  };
  return (
    <div className="SongbookHeader-wrap">
      <div className="SongbookHeader-left">
        <img src={returnIcon} className="SongbookHeader-icon" />
        <span onClick={goback}>影集制作</span>
      </div>
      <div className="SongbookHeader-center">{userInfo.nick}</div>
      <div className="SongbookHeader-right" onClick={handleFinishBtn}>完成</div>
    </div>
  );
}
