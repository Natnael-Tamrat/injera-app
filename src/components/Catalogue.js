import React, { Component } from 'react'
import "./catalogue.css"
import {UserContext} from '../context/Context'
export default class Catalogue extends Component {
  static contextType = UserContext;
    constructor(props){
     super(props)
      this.state ={
          name:this.props.name,
        type:"",
        sprite:"",
         url:this.props.url
      }
      console.log(this.props.name," created")
      this.handleClicked=this.handleClicked.bind(this);
    }

   async componentDidMount(){
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
      const items = await fetch(this.state.url,requestOptions);
    const item= await items.json();

      this.setState((prevState)=>{
        return {
          ...prevState,
          sprite:item.sprites.other.home.front_default
        }
      })
     
    }
    componentDidUpdate(){
      console.log(this.context);
    }
    handleClicked(event){
      const {chosen,flag,setChosen,setFlag} = this.context
       
       setChosen(event.target.className);
      //  setFlag();  
      
    }
    render() {
  
        return (
            <div className='catalogue' onClick={this.handleClicked}>
                <img className={this.props.name} src={this.state.sprite} alt={this.props.name}></img>
              
            <h1 className={this.props.name}>{this.props.name}</h1>
            </div>
        )
    }
}
