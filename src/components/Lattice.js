import React, { Component } from 'react';
import axios from 'axios';
import CardDeck from './CardDeck'

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
        this.setState({name: res.data, currentlyRendering: res.data[0]});
        console.log(res.data[0].tasks)
      })
    }

    fetchProjects();
    this.saveProject = this.saveProject.bind(this)
    this.changeCurrentlyRendering = this.changeCurrentlyRendering.bind(this)
  }



  saveProject(data) {
    axios.post(SERVER_URL_PROJECTS, {name: data}, {withCredentials: true}).then((res) => {
      this.setState({name: res.data.projects})
      console.log(res.data)

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
        <ProjectList
          pickProject={ this.changeCurrentlyRendering}
          projectNames={ this.state.name }
          projectInFocus={ this.state.currentlyRendering }
        />
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
      { props.projectNames.map( (p, i) =>
        <div>
          <button onClick={ () => props.pickProject(i) } key={ p.project.id }>{ p.project.name }</button>
        </div> )}
        <CardDeck projectCards={ props.projectInFocus }/>
    </div>

  );
};

export default Lattice;



{/*
  <CardDeck info={this.state.currentlyRendering}
      the buttons
  <Card project={p.cards}/>
  */}
// <button key={ p.project.id }>{ p.project.name }</button>
