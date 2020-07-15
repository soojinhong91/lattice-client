import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card'

const SERVER_URL_PROJECTS = 'http://localhost:3000/projects'

class Lattice extends Component {
  constructor() {
    super();
    this.state = {
      name: [],
      currentlyRendering: {}
    };

    const fetchProjects = () => {
      axios.get(SERVER_URL_PROJECTS).then( (res) => {
        console.log(res.data)
        this.setState({name: res.data, currentlyRendering: res.data[0]});
      })
    }

    fetchProjects();
    this.saveProject = this.saveProject.bind(this)
  }

  saveProject(data) {
    axios.post(SERVER_URL_PROJECTS, {name: data}).then((res) => {
      this.setState({name: res.data.projects})
    })
  }

  changeCurrentlyRendering(index){
    this.setState({currentlyRendering: this.state.name[index]})
  }

  render() {
    return(
      <div>
        <h1>Projects</h1>
        <ProjectForm onSubmit={ this.saveProject } />
        <ProjectList pickProject={ this.changeCurrentlyRendering} name={ this.state.name } />
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
      { props.name.map( (p, i) =>
        <div>
          <button onClick={ () => props.pickProject(i) } key={ p.project.id }>{ p.project.name }</button>
          <Card project={p.cards}/>
        </div> )}
    {/* <CardDeck info={this.state.currentlyRendering}
          the buttons */}
    </div>
  );
};

export default Lattice;

// <button key={ p.project.id }>{ p.project.name }</button>
