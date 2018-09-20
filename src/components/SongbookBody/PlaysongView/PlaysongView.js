import React from 'react';
import './PlaysongView.css';
import Player from '../../Player/Player';

export default class PlaysongView extends React.PureComponent {
  render() {
    const { mySongState, songListEntity, Actions } = this.props;
    const { radioSelect } = mySongState;
    return (
      <div className="PlaysongView-wrap">
        <div className="mask" onClick={Actions.hideSongPlayer} />
        <div className="PlaysongView-content slideInUp">
          <div className="PlaysongView-closeBtn" onClick={Actions.hideSongPlayer}>关闭</div>
          <div className="PlaysongView-text">{songListEntity[radioSelect].name}</div>
          <Player mySongState={mySongState} songListEntity={songListEntity} />
        </div>
      </div>
    );
  }
}
