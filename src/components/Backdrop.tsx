import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = (props: { onClick: React.MouseEventHandler<HTMLDivElement> | undefined; }) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
