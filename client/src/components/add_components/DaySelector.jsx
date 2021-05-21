import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const displaySelected = (arr) => {
  let selected = arr;

  if (selected.length == 7) {
    selected = ['day'];
  } else if (selected.length == 5 && selected.includes('Monday') && selected.includes('Tuesday') && selected.includes('Wednesday') && selected.includes('Thursday') && selected.includes('Friday')) {
    selected = ['Weekday'];
  } else if (selected.length == 2 && selected.includes('Sunday') && selected.includes('Saturday')) {
    selected = ['Weekend'];
  } else {
    return selected.join(', ');
  }

  return selected;
};

const DaySelector = (props) => (
    <div className="day-selector">
    <InputLabel className="day" shrink={false}>Every</InputLabel>
    <Select
    style={{
      maxWidth: "150px"
    }}
    MenuProps={{
      anchorOrigin: {
        vertical: "top",
        horizontal: "center"
      },
      transformOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      getContentAnchorEl: null
    }}
    labelId="goal"
    id="selected-day"
    value={props.selectedDays}
    onChange={(e) => props.handleChange(e)}
    multiple
    renderValue={(selected) => displaySelected(selected)}
    required
    >
      {dayNames.map((day) => (
        <MenuItem key={day} value={day}>
          <Checkbox checked={props.selectedDays.indexOf(day) > -1} />
          <ListItemText primary={day}/>
        </MenuItem>
      ))}
    </Select>
  </div>
);

export default DaySelector;