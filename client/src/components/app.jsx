import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import New from './page_components/New';
import Overview from './page_components/Overview';
import Today from './page_components/Today';
import Week from './page_components/Week';
import axios from 'axios'
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
    if (this.checkValues()) {
      const day0 = this.generateDayBoolean('Sunday');
      const day1 = this.generateDayBoolean('Monday');
      const day2 = this.generateDayBoolean('Tuesday');
      const day3 = this.generateDayBoolean('Wednesday');
      const day4 = this.generateDayBoolean('Thursday');
      const day5 = this.generateDayBoolean('Friday');
      const day6 = this.generateDayBoolean('Saturday');
      const reqBody = {
        habit_1: document.getElementById('bit1').value,
        habit_2: document.getElementById('bit2').value,
        habit_3: document.getElementById('bit3').value,
        habit_4: document.getElementById('bit4').value,
        day_0: day0,
        day_1: day1,
        day_2: day2,
        day_3: day3,
        day_4: day4,
        day_5: day5,
        day_6: day6,
        time_1: document.getElementById('time1').value,
        time_2: document.getElementById('time2').value,
        time_3: document.getElementById('time3').value,
        time_4: document.getElementById('time4').value,
      };
  
      axios.post('http://localhost:3000/api/add', reqBody)
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
  }

  checkValues() {
    const bit1Val = document.getElementById('bit1').value;
    const bit2Val = document.getElementById('bit2').value;
    const bit3Val = document.getElementById('bit3').value;
    const bit4Val = document.getElementById('bit4').value;
    const dayVal = this.state.selectedDays;
    
    if (bit1Val.length < 1 || bit2Val.length < 1 || bit3Val.length < 1 || bit4Val.length < 1 || dayVal.length < 1) {
      return false;
    } else {
      return true;
    }
  }

  generateDayBoolean(day) {
    let result;

    if (this.state.selectedDays.indexOf(day) > -1) {
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