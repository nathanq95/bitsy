import React from 'react';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';

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

const NewForm = (props) => (
  <div className="add-form">
    <form>
      <Container 
        fixed
        maxWidth="xs"
        className="new">
        <TextField className="habit" type="text" id="bit4" label="Goal Habit" required/>
        <TextField className="habit" type="text" id="bit1" label="bit 1" required/>
        <TextField className="habit" type="text" id="bit2" label="bit 2" required/>
        <TextField className="habit" type="text" id="bit3" label="bit 3" required/>
        <div className="day-selector">
          <InputLabel shrink={false}>Every</InputLabel>
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
      </Container>
      <div className="submit-btn">
        <Button type="submit" variant="contained" color="secondary" onClick={(e) => props.handleSubmit(e)}>Start!</Button>
      </div>
    </form>
  </div>
);

export default NewForm;