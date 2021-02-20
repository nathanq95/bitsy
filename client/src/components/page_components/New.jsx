import React from 'react';
import NewForm from '../add_components/NewForm';

const New = (props) => (
  <div className="add-page"><NewForm handleChange={props.handleChange.bind(this)} selectedDays={props.selectedDays} handleSubmit={props.handleSubmit}/></div>
);

export default New;