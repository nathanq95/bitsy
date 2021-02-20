import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import New from './page_components/New';
import Overview from './page_components/Overview';
import Today from './page_components/Today';
import Week from './page_components/Week';
import axios from 'axios';
import css from '../../dist/styles/style.css'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      page: 0,
      selectedDays: []
    }
  }

  handleChange(event) {
    const val = event.target.value;

    this.setState({
      page: this.state.page,
      selectedDays: val
    });
  }

  handleSubmit(event) {
    let daysData = document.getElementById('selected-day').textContent.split(', ');
    const reqBody = {
      habit_1: document.getElementById('bit1').value,
      habit_2: document.getElementById('bit2').value,
      habit_3: document.getElementById('bit3').value,
      habit_4: document.getElementById('bit4').value,
      day_0: this.generateDayBoolean(daysData, 'Sunday'),
      day_1: this.generateDayBoolean(daysData, 'Monday'),
      day_2: this.generateDayBoolean(daysData, 'Tuesday'),
      day_3: this.generateDayBoolean(daysData, 'Wednesday'),
      day_4: this.generateDayBoolean(daysData, 'Thursday'),
      day_5: this.generateDayBoolean(daysData, 'Friday'),
      day_6: this.generateDayBoolean(daysData, 'Saturday')
    };

    axios.post('http://localhost:3004/posts', reqBody)
    .then(() => {
      this.setState({
        page: 1,
        selectedDays: []
      })
    })
    .catch((err) => {
      console.log(err);
    });

    event.preventDefault();
  }

  generateDayBoolean(array, day) {
    let result;

    if (array.indexOf(day) > -1) {
      result = true;
    } else {
      result = false;
    }

    return result;
  }

  sideBarClick(selectedPage) {
    this.setState({
      page: selectedPage
    })
  }

  render() {
    let currentPage;

    if (this.state.page == 0) {
      currentPage = <New handleChange={this.handleChange.bind(this)} selectedDays={this.state.selectedDays} handleSubmit={this.handleSubmit.bind(this)}/>;
    } else if (this.state.page == 1) {
      currentPage = <Today/>;
    } else if (this.state.page == 2) {
      currentPage = <Week/>;
    } else if (this.state.page == 3){
      currentPage = <Overview/>;
    } else {
      currentPage = 'PLACEHOLDER';
    }

    return (
      <div>
        <Header/>
        <div className="main">
          <SideBar handleClick={this.sideBarClick.bind(this)} currentTab={this.state.page}/>
          {currentPage}
        </div>
      </div>
    )
  }
}

export default App;