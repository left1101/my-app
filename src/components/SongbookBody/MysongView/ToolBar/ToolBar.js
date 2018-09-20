import React from 'react';
import ToolBarBtnBlock from './ToolBarBtnBlock/ToolBarBtnBlock';
import './ToolBar.css';

const button_new_play = require('../../../../assect/icons/button_new_play.png');
const button_new_play_gray = require('../../../../assect/icons/button_new_play_gray.png');
const button_rename_red = require('../../../../assect/icons/button_rename_red.png');
const button_rename_gray = require('../../../../assect/icons/button_rename_gray.png');
const button_cut = require('../../../../assect/icons/button_cut.png');
const button_cut_gray = require('../../../../assect/icons/button_cut_gray.png');
const button_share = require('../../../../assect/icons/button_share.png');
const button_share_gray = require('../../../../assect/icons/button_share_gray.png');
const button_delete = require('../../../../assect/icons/button_delete.png');
const button_delete_gray = require('../../../../assect/icons/button_delete_gray.png');


export default function ToolBar(props) {
  const { mySongState, Actions, songListEntity } = props;
  const { toolsStatus, mode } = mySongState;
  const toolBarBtnList = {
    play: {
      selectIcon: button_new_play,
      unselectIcon: button_new_play_gray,
      BlockName: '播放',
      BlockType: 'showPlaySongPlayer',
      abled: false
    },
    rename: {
      selectIcon: button_rename_red,
      unselectIcon: button_rename_gray,
      BlockName: '重命名',
      BlockType: 'showRenameSongDialog',
      abled: false
    },
    cut: {
      selectIcon: button_cut,
      unselectIcon: button_cut_gray,
      BlockName: '选择片段',
      BlockType: 'showCutSongPlayer',
      abled: false
    },
    share: {
      selectIcon: button_share,
      unselectIcon: button_share_gray,
      BlockName: '送给朋友',
      BlockType: 'shareSong',
      abled: false
    },
    delete: {
      selectIcon: button_delete,
      unselectIcon: button_delete_gray,
      BlockName: '删除',
      BlockType: 'showDeleteSongDialog',
      abled: false
    }
  };
  switch (toolsStatus) {
    case 1:
      toolBarBtnList.delete.abled = true;
      break;
    case 2:
      toolBarBtnList.play.abled = true;
      break;
    case 3:
      Object.keys(toolBarBtnList).forEach(item => { toolBarBtnList[item].abled = true; });
      toolBarBtnList.rename.abled = false;
      break;
    case 4:
      Object.keys(toolBarBtnList).forEach(item => { toolBarBtnList[item].abled = true; });
      break;
    default:
      break;
  }
  return (
    <div className="ToolBar-wrap">
      {Object.keys(toolBarBtnList).map((item, index) =>
        (<ToolBarBtnBlock
          key={index}
          item={toolBarBtnList[item]}
          Actions={Actions}
          mySongState={mySongState}
          songListEntity={songListEntity}
          mode={mode}
        />))}
    </div>
  );
}
