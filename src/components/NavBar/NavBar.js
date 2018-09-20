import React from 'react';
import NavBarBtn from './NavBarBtn/NavBarBtn';
import './NavBar.css';

const search_select = require('../../assect/icons/search_select.png');
const search_unselect = require('../../assect/icons/search_unselect.png');
const upload_select = require('../../assect/icons/upload_select.png');
const upload_unselect = require('../../assect/icons/upload_unselect.png');
const music_select = require('../../assect/icons/music_select.png');
const music_unselect = require('../../assect/icons/music_unselect.png');

export default function NavBar(props) {
  const { selectView, Actions } = props;
  const NavBarBtnList = [{
    selectIcon: music_select,
    unselectIcon: music_unselect,
    viewName: '我的音乐',
    viewType: 'mySongView'
  }, {
    selectIcon: search_select,
    unselectIcon: search_unselect,
    viewName: '搜索音乐',
    viewType: 'searchSongView'
  }, {
    selectIcon: upload_select,
    unselectIcon: upload_unselect,
    viewName: '上传音乐',
    viewType: 'uploadSongView'
  }];
  const renderBtn = () => NavBarBtnList.map((item, index) => (
    <NavBarBtn
      data={item}
      selectView={selectView}
      Actions={Actions}
      key={index}
    />));
  return (
    <div className="NavBar-wrap">
      {renderBtn()}
    </div>
  );
}
