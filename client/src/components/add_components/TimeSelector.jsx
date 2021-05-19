import React from 'react';
import TextField from '@material-ui/core/TextField'; 

const TimeSelector = (props) => (
  <div className="time-selector">
      <TextField id="time4" type="time" defaultValue="07:30" inputProps={{ step: 300 }}/>
      <TextField id="time1" type="time" defaultValue="07:30" inputProps={{ step: 300 }}/>
      <TextField id="time2" type="time" defaultValue="07:30" inputProps={{ step: 300 }}/>
      <TextField id="time3" type="time" defaultValue="07:30" inputProps={{ step: 300 }}/>
  </div>
);

export default TimeSelector;
