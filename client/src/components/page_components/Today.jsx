import React from 'react';
import ListBox from '../today_components/ListBox'

const Today = (props) => (
  <div id="today">
    <ListBox data={props.data}/>
  </div>
);

export default Today;