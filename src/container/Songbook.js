import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar/NavBar';
import * as actionCreators from '../actions';
import SongbookHeather from '../components/SongbookHeader/SongbookHeader';
import SongbookBody from '../components/SongbookBody/SongbookBody';
import './Songbook.css';

function Songbook(props) {
  const {
    songBook, userInfo, songListEntity, Actions, dialog
  } = props;
  const { selectView } = songBook.songBookState;
  return (
    <div className="Songbook-wrap">
      <SongbookHeather userInfo={userInfo} songBook={songBook} />
      <NavBar selectView={selectView} Actions={Actions} />
      <SongbookBody songBook={songBook} songListEntity={songListEntity} Actions={Actions} dialog={dialog} />
    </div>
  );
}

function mapStateToProps(state) {
  const {
    entities, songBook, userInfo, dialog
  } = state;
  const { songListEntity } = entities;
  return {
    songBook,
    userInfo,
    songListEntity,
    dialog
  };
}

const mapDispatchToProps = dispatch => ({
  Actions: bindActionCreators(actionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Songbook);
