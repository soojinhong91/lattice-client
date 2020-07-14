import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'

const SERVER_URL_PROJECTS = 'http://localhost:3000/projects'

class Lattice extends Component {
  constructor() {
    super();
    this.state = {
      name: []
    };

    const fetchProjects = () => {
      axios.get(SERVER_URL_PROJECTS).then( (res) => {
        this.setState({name: res.data.projects});
      })
    }

    fetchProjects();

  }

  saveProject(data) {
    console.log(data)
    axios.post(SERVER_URL_PROJECTS, {name: data}).then((res) => {
      this.setState({name: this.props << data})
    })
  }

  render() {
    return(
      <div>
        <h1>Projects</h1>

        <ProjectForm onSubmit={ this.saveProject } />
        <ProjectList name={ this.state.name } />
      </div>
    );
  }
}

class ProjectForm extends Component {
  constructor() {
    super();
    this.state = { newProject: '' };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange(event) {
    this.setState({newProject: event.target.value});
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit( this.state.newProject );
    this.setState({newProject: ''});
  }

  render() {
    return (
      <form onSubmit={ this._handleSubmit }>
        <input value={ this.state.newProject } onChange={ this._handleChange } placeholder="chores" required />
        <input type="submit" value="Add"/>
      </form>
    );
  }
}

const ProjectList = (props) => {
  return (
    <div>
      { props.name.map( (p) =>
        <div>
          <button key={ p.id }>{ p.name }</button>
          <Card project={p.id}/>
        </div> )}

    </div>
  );
};

export default Lattice;
