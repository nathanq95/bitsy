import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const SideBar = (props) => (
  <div className="side-bar">
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={props.currentTab}
    >
      <Tab label="+" onClick={() => props.handleClick(0)}/>
      <Tab label="Today" onClick={() => props.handleClick(1)}/>
      <Tab label="Week" onClick={() => props.handleClick(2)}/>
      <Tab label="Overview" onClick={() => props.handleClick(3)}/>
    </Tabs>
  </div>
);

export default SideBar;