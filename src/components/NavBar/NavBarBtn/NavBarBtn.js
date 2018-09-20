import React from 'react';
import './NavBarBtn.css';

export default function NavBarBtn(props) {
  const {
    selectIcon, unselectIcon, viewType, viewName
  } = props.data;
  const { selectView, Actions } = props;
  const selectflag = (selectView == viewType);
  let icon = unselectIcon;
  if (selectflag) {
    icon = selectIcon;
  }
  const getClassName = () => {
    if (selectflag) {
      return 'NavBarBtn-wrap-select';
    }
    return 'NavBarBtn-wrap-unselect';
  };
  const changeSelectView = () => {
    Actions.changeSelectView(viewType);
  };
  return (
    <div className={getClassName()} onClick={changeSelectView}>
      <div className="NavBarBtn-content">
        <div className="NavBarBtn-left">
          <img src={icon} className="NavBarBtn-icon" />
        </div>
        <div className="NavBarBtn-right">
          <span>{viewName}</span>
        </div>
      </div>
      {selectflag ? (
        <div className="NavBarBtn-bottom">
          <div className="NavBarBtn-deraction" />
        </div>) : ''}
    </div>
  );
}
