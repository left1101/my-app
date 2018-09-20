import React from 'react';
import './ToolBarBtnBlock.css';

export default function ToolBarBtnBlock(props) {
  const {
    item, Actions, mySongState, songListEntity
  } = props;
  const { mode } = mySongState;
  const {
    selectIcon, unselectIcon, BlockName, BlockType, abled
  } = item;
  let icon = unselectIcon;
  if (abled) {
    icon = selectIcon;
  }
  const data = {
    mySongState,
    songListEntity,
    Actions
  };
  const handleClick = () => {
    if (abled) {
      Actions[BlockType](data);
      return;
    }
    switch (BlockType) {
      case 'showPlaySongPlayer': {
        mode == 'radio' ?
          Actions.changeTipsMessage('您还没有选择音乐') :
          Actions.changeTipsMessage('多选状态不能播放');
      } break;
      case 'showRenameSongDialog': {
        mode == 'radio' ?
          Actions.changeTipsMessage('不能重命名') :
          Actions.changeTipsMessage('多选状态不能重命名');
      } break;
      case 'showCutSongPlayer': {
        mode == 'radio' ?
          Actions.changeTipsMessage('推荐音乐不能截取') :
          Actions.changeTipsMessage('多选状态不能截取');
      } break;
      case 'shareSong': {
        mode == 'radio' ?
          Actions.changeTipsMessage('推荐音乐不能分享朋友') :
          Actions.changeTipsMessage('多选状态不能分享');
      } break;
      case 'showDeleteSongDialog': {
        Actions.changeTipsMessage('推荐音乐不能删除');
      } break;
      default:
    }
  };
  const getClassName = () => {
    if (!abled) {
      return 'ToolBarBtnBlock-text-unabled';
    }
    return 'ToolBarBtnBlock-text-abled';
  };
  return (
    <div className="ToolBarBtnBlock-wrap" onClick={handleClick}>
      <div className="ToolBarBtnBlock-icon-wrap" >
        <img src={icon} className="ToolBarBtnBlock-icon" />
      </div>
      <div className={getClassName()}>
        {BlockName}
      </div>
    </div>
  );
}
