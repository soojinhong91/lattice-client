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
        this.setState({name: res.data});
      })
    }

    fetchProjects();
  }

  render() {
    return(
      <div>
        <h1>Projects</h1>


        <ProjectList projects={ this.state.projects } />
        <Task />
      </div>
    );
  }
}

const ProjectList = (props) => {
  return (
    <div>
      { props.name.map( (p) => <p key={ p.id }>{ p.name }</p> )}
    </div>
  );
};

export default Lattice;
