import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL_PROJECTS = 'http://localhost:3000/projects'

class Task extends Component {
  constructor() {
    super();
    this.state = {
      taskDetail: ''
    }
    this.saveTaskDetailChange = this.saveTaskDetailChange.bind(this);
  }

  saveTaskDetailChange(detail) {
    console.log(detail)
    axios.post(SERVER_URL_PROJECTS, {taskDetailChanged: detail}).then( (res) => {
      this.setState({ taskDetail: [... this.state.taskDetail, res.data]});
    } );
  }

  render() {
    return(
      <div>
        <h3>Tasks</h3>
        <TaskForm onFocusout={ this.saveTaskDetailChange }/>
        <TaskList />
      </div>
    );
  }
}

class TaskForm extends Component {
  constructor() {
    super();
    this.state = { taskDetailChanged : '' };
    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleTaskSubmit = this._handleTaskSubmit.bind(this);
  }

  _handleTaskChange(event) {
    this.setState({ taskDetailChanged: event.target.value});
  }

  _handleTaskSubmit(event) {
    this.props.onFocusout( this.state.taskDetailChanged );
    this.setState({ taskDetailChanged: '' });
  }

  render() {
    return(
        <textarea value={ this.state.taskDetailChanged } required cols="30" rows="1" onChange={ this._handleTaskChange } onFocusout={ this._handleTaskSubmit }></textarea>
    );
  }
}

const TaskList = () => {
  return (
    <div>
      <p>TaskList coming soon</p>
    </div>
  );
}


export default Task;


//make an axios request to the db for all of the tasks
//iterate over all of the tasks on the json page
//map the tasks to their own unique paragraphs

//somehow, you have to allow for the creation of new tasks
//that means...
