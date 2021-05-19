import React from 'react';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DaySelector from './DaySelector';
import TimeSelector from './TimeSelector';

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

        <TimeSelector />

        <DaySelector handleChange={props.handleChange} selectedDays={props.selectedDays}/>
      </Container>
      <div className="submit-btn">
        <Button type="submit" variant="contained" color="secondary" onClick={(e) => props.handleSubmit(e)}>Start!</Button>
      </div>
    </form>
  </div>
);

export default NewForm;