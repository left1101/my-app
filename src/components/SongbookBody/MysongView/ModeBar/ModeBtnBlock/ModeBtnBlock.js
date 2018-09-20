import React from 'react';
import './ModeBtnBlock.css';

export default function ModeBtnBlock(props) {
  const {
    BlockName, BlockType, mode, Actions, songListEntity
  } = props;
  const getClassName = () => {
    if (mode == BlockType) {
      return 'ModeBtnBlock-btn-select';
    }
    return 'ModeBtnBlock-btn-unselect';
  };
  const changeMode = () => {
    const data = {
      songListEntity
    };
    if (BlockType == 'radio') { Actions.checkRadioMode(data); }
    if (BlockType == 'multiple') { Actions.checkMulMode(data); }
  };
  return (
    <div className="ModeBtnBlock-wrap" onClick={changeMode}>
      <div className="ModeBtnBlock-btn-wrap">
        <div className={getClassName()} />
      </div>
      <div className="ModeBtnBlock-text">
        {BlockName}
      </div>
    </div>
  );
}
