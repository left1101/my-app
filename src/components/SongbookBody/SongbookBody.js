import React from 'react';
import MysongView from './MysongView/MysongView';
import SearchsongView from './SearchsongView/SearchsongView';
import UploadsongView from './UploadsongView/UploadsongView';
import TipView from '../TipView/TipView';
import Dialog from '../Dialog/Dialog';
import CutsongView from './CutsongView/CutsongView';
import PlaysongView from './PlaysongView/PlaysongView';
import './SongbookBody.css';

const that = this;

export default function SongbookBody(props) {
  const {
    songBook, songListEntity, Actions
  } = props;
  const { mySongState } = songBook;
  const { selectView } = songBook.songBookState;
  const {
    handleSongView, dialogType, mode, selectList, radioSelect
  } = mySongState;
  let dialog = {};
  switch (dialogType) {
    case 'SHOW_DELETE_SONG_DIALOG': {
      if (mode == 'radio') {
        dialog = {
          type: '',
          isActive: true,
          title: `确定删除${songListEntity[radioSelect].name}这首音乐吗`,
          renderBody: () => { },
          okText: '删除',
          cancelText: '取消',
          onOk: () => { Actions.deleteSong(); Actions.hideDialog(); },
          onCancel: () => { Actions.hideDialog(); }
        };
      }
      if (mode == 'multiple') {
        dialog = {
          type: '',
          isActive: true,
          title: `确定删除这${selectList.length}首音乐吗`,
          renderBody: () => { },
          okText: '删除',
          cancelText: '取消',
          onOk: () => { Actions.deleteSong(); Actions.hideDialog(); },
          onCancel: () => { Actions.hideDialog(); }
        };
      }
    } break;
    case 'SHOW_RENAME_SONG_DIALOG': {
      dialog = {
        type: '',
        isActive: true,
        title: '请输入新音乐名称',
        renderBody: () => (
          <div className="rename-input-wrap">
            <input className="rename-input" ref={child => that._input = child} />
          </div>
        ),
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          Actions.renameSong({
            val: that._input.value,
            id: radioSelect
          }); Actions.hideDialog();
        },
        onCancel: () => { Actions.hideDialog(); }
      };
    } break;
    case 'HIDE_DIALOG': {
      dialog = {
        type: '',
        isActive: false,
        title: '',
        renderBody: () => { },
        okText: '确定',
        cancelText: '取消',
        onOk: () => { alert('点击确定'); },
        onCancel: () => { }
      };
      if (that._input) {
        that._input.value = '';
      }
    } break;
    default:
  }
  const {
    type, isActive, title, renderBody, okText, cancelText, onOk, onCancel
  } = dialog;
  const renderHandleSongView = () => {
    if (handleSongView == 'CutsongView') {
      return (<CutsongView
        mySongState={mySongState}
        songListEntity={songListEntity}
        Actions={Actions}
      />);
    }
    if (handleSongView == 'PlaysongView') {
      return (<PlaysongView
        mySongState={mySongState}
        songListEntity={songListEntity}
        Actions={Actions}
      />);
    }
    return undefined;
  };
  const renderView = () => {
    switch (selectView) {
      case 'mySongView': {
        return (
          <MysongView
            mySongState={mySongState}
            songListEntity={songListEntity}
            Actions={Actions}
          />
        );
      }
      case 'searchSongView': {
        return <SearchsongView />;
      }
      case 'uploadSongView': {
        return <UploadsongView />;
      }
      default: return '';
    }
  };
  const onCancelTips = () => {
    Actions.changeTipsMessage('');
  };
  return (
    <div className="SongbookBody-wrap">

      {renderView()}
      <TipView text={mySongState.tips} onCancel={onCancelTips} duration={1000} />
      <Dialog
        type={type}
        isActive={isActive}
        title={title}
        renderBody={renderBody}
        okText={okText}
        cancelText={cancelText}
        onOk={onOk}
        onCancel={onCancel}
      />
      {renderHandleSongView()}
    </div>
  );
}
