import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card'

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

  render() {
    return(
      <div>
        <h1>Projects</h1>


        <ProjectList name={ this.state.name } />
      </div>
    );
  }
}

const ProjectList = (props) => {
  console.log(props.name.projects);
  return (
    <div>
      { props.name.map((p) =>
        <div>
          <p key={ p.id }>{ p.name }</p>
          <Card project={p.id} />
        </div>
    )}
    </div>
  );
}

export default Lattice;
