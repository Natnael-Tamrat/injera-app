import React, { Component } from 'react'
import "./character.css"
class Character extends Component {
    constructor(props){

        super(props);
        console.log(props);
        this.state={
            name:"",
            height:0,
             weight:0,
             url:`https://pokeapi.co/api/v2/pokemon/${props.name}`,
             sprite:""
         }
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
              sprite:item.sprites.other.home.front_default,
              height:item.height,
              weight:item.weight
            }
          })
    }
    render() {
        return (
            <div>
                 <img className={this.props.name} src={this.state.sprite} alt={this.props.name}></img>
              
              <h1 className={this.props.name}>{this.props.name}</h1>
                <h3>Weight :{this.state.weight}</h3>
                <h3>Height :{this.state.height}</h3>
            </div>
        )
    }
}
export default Character;