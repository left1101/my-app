import React from 'react';
import './ListItem.css';

const icon = require('../../../../../../assect/icons/select_music.png');

export default function ListItem(props) {
  const {
    songListEntity, Actions, item, mode, selectList, radioSelect
  } = props;
  const renderSelectBtn = () => {
    if (mode == 'radio') {
      if (radioSelect == item) { return (<img src={icon} className="ListItem-icon" />); }
    }
    if (mode == 'multiple') {
      const index = selectList.indexOf(item);
      if (index != -1) {
        return (<div className="multiple-select">{index + 1}</div>);
      }

      return (<div className="multiple-unselect" />);
    }
  };
  const handleClick = () => {
    const data = {
      id: item,
      songListEntity
    };
    if (mode == 'radio') {
      Actions.handleRadioSong(data);
    }
    if (mode == 'multiple') {
      const index = selectList.indexOf(item);
      if (index != -1) {
        data.method = 'unselect';
      } else {
        data.method = 'select';
      }
      Actions.handleMulSong(data);
    }
  };
  return (
    <div className="ListItem-wrap" onClick={handleClick}>
      <div className="ListItem-icon-wrap">{renderSelectBtn()}</div>
      <div className="ListItem-text">
        {songListEntity[item] ? songListEntity[item].name : ''}
      </div>
    </div>
  );
}
