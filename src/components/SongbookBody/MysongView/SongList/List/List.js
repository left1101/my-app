import React from 'react';
import ListItem from './ListItem/ListItem';
import './List.css';

export default function List(props) {
  const {
    songListEntity, SongList, Actions, title, mode, selectList, radioSelect
  } = props;
  const renderListitem = () => SongList.map((item, index) => (
    <ListItem
      key={index}
      item={item}
      songListEntity={songListEntity}
      Actions={Actions}
      mode={mode}
      selectList={selectList}
      radioSelect={radioSelect}
    />
  ));
  return (
    <div className="List-wrap">
      <div className="List-title">{title}</div>
      <div className="List-item">
        {renderListitem()}
      </div>
    </div>
  );
}
