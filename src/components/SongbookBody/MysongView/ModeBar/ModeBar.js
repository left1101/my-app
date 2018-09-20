import React from 'react';
import ModeBtnBlock from './ModeBtnBlock/ModeBtnBlock';
import './ModeBar.css';

export default function ModeBar(props) {
  const { mode, Actions, songListEntity } = props;
  const modeBarBtnList = [{
    BlockName: '单选',
    BlockType: 'radio'
  }, {
    BlockName: '多选',
    BlockType: 'multiple'
  }];
  const renderModeBtnBlock = () => modeBarBtnList.map((item, index) => (
    <ModeBtnBlock
      key={index}
      BlockName={item.BlockName}
      BlockType={item.BlockType}
      mode={mode}
      Actions={Actions}
      songListEntity={songListEntity}
    />
  ));
  return (
    <div className="ModeBar-wrap">
      {renderModeBtnBlock()}
    </div>
  );
}
