import { Component } from 'react';
import './App.css';
import Catalogue from './components/Catalogue';
import Header  from './components/Header';
import Loader from './components/Loader';
import Character from './components/Character';
import {UserContext} from './context/Context';

export default class App extends Component {
  constructor(){
    super()
  this.state={
      data:[],
      number:20,
      text:"",
      loading:true,
      flag:false,
      chosen:""
  };
  this.handleClick = this.handleClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
}

  async handleClick (){
      this.setState((prevState)=>{
       return {
        ...prevState,
        number:this.state.number+10,
        loading:true
      }})
      setTimeout(()=>{
        this.setState((prevState)=>{
          return{
           ...prevState,
            loading:false
          };
        })
     },4000);
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
      const items = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.state.number}`,requestOptions);
      const item= await items.json();
      this.setState((prevState)=>{
          return {
            ...prevState,
            data:item.results
          }
        }) 
  }
  async componentDidMount(){
    setTimeout(()=>{
       this.setState((prevState)=>{
         return{
          ...prevState,
           loading:false
         };
       })
    },4000);
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  };
    const items = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.state.number}`,requestOptions);
    const item= await items.json();
    this.setState((prevState)=>{
        return {
          ...prevState,
          data:item.results
        }
      })
  }

  async handleChange(event){
    event.preventDefault();
     const search = event.target.value
    //  this.setState((prevState)=>{
    //   return {
    //     ...prevState,
    //     text:search
    //   }
    // })
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  };
    const items = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.state.number}`,requestOptions);
    const item= await items.json();

    const arr=item.results.filter((it)=>{
      return it.name.includes(search)});
    this.setState((prevState)=>{
        return {
          ...prevState,
          data:arr
          }
    })

  }
setFlag = () => {
  this.setState((prevState)=>{
    return {
      ...prevState,
      flag:true
    }
  })
} 
setChosen = (name) => {
  this.setState((prevState)=>{
    return {
      ...prevState,
      flag:true,
      chosen:name
    }
  })
}
  render(){
   const { data,number,text,loading,flag,chosen} =this.state;
   const {setFlag,setChosen,handleChange,handleClick}=this;
    console.log("chosen ",this.state.chosen)
  return (
    <UserContext.Provider value={{flag,chosen,setFlag,setChosen}}>
  
    <div className="App">
       <Header /> 
       <div className='bar'>
      { !this.state.flag ? <input type="search" placeholder='filter by name' onChange={this.handleChange}></input>:<h1></h1>}
       </div>
     
          
          {this.state.flag ? <Character name={this.state.chosen}/> :this.state.loading ? <Loader /> :   this.state.data.map((item)=>{return <Catalogue name={item.name} url={item.url}/>})  }  
     
       
     
      
          { !this.state.flag ?  <button className='more' onClick={this.handleClick}>See More</button>:<h1></h1>}
  </div>

  </UserContext.Provider>
  );
}
}

