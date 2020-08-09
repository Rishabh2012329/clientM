import React, { Component } from 'react';
import {firebaseConnect} from 'react-redux-firebase';
import firebase from 'firebase';
import '../layout/login.css';
import background from './3.jpg';

class Login extends Component {
    state={
        email:'',
        password:'',
        confirmpassword:'',
        newtothis:false,
    }
  ;
    sub=(e)=>{
        const {email,password} =this.state;
        e.preventDefault();//from preventing any default action like reload
        firebase.login({
            email,
            password
        }).then(()=> this.props.history.push('/')) //we will get pushed at out Home component
        .catch((error)=>{alert(error);//we will get alerted if any errors came up
        this.setState({email:"",password:""}) 
        })       
    }
    sign=(e)=>{
        e.preventDefault();
        this.setState({newtothis:true}); 
        this.setState({email:"",password:"",confirmpassword:""}) 
    }
    newto=(e)=>{
        e.preventDefault(); //from preventing any default action like reload
        const {email,password,confirmpassword}=this.state;
        if(password===confirmpassword)
         firebase.auth().createUserWithEmailAndPassword(email,password) //creating a new user
         .catch((error)=>{alert(error)
        this.setState({email:"",password:"",confirmpassword:""})})
        else
        alert("you have to put same password in confirmpassword as password")
    }
    show=(e)=>{
    if(e.target.parentElement.parentElement[1]!==undefined){
        if(e.target.parentElement.parentElement[1].type==="password")
      e.target.parentElement.parentElement[1].type="text"
    else
    e.target.parentElement.parentElement[1].type="password"
    }    
    }
    logi=(e)=>{
        e.preventDefault();
        this.setState({newtothis:false});
        this.setState({email:"",password:""}) 
    }
    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    render() {
        const { newtothis }=this.state;
        return (
            <div>
                <style>{`body{background-image:url(${background});background-size:fit}`}</style>
            
                <form className="log animated bounce infinite">
                    <h2>Game of Codes</h2>
                <input  type="email" value={this.state.email} name="email" onChange={this.onChange} placeholder="Email..." required autoComplete="off"></input>
                <input type="password" value={this.state.password} name="password" onChange={this.onChange} placeholder="Password..." required autoComplete="off" ></input>
                <label style={{textAlign:'left',color:'grey'}}>show password<input type="checkbox" onClick={this.show}></input></label>
                {newtothis?<div>
                    <input type="password" value={this.state.confirmpassword} name="confirmpassword" onChange={this.onChange} placeholder="ConfirmPassword..." required >
                        </input>
                         <button id="new" onClick={this.newto}>submit
                         </button>
                         <button id="new" onClick={this.logi}>back to login
                         </button>
                         </div>:<div className="row">
                <button id="log" type="submit" onClick={this.state.email!==""&&this.state.password!==""?this.sub:null}>Login</button>
                <button onClick={this.sign}id="sign" type="submit">signup</button>
                </div> 
                }    </form>
                </div>   
                 
                 
           
        )
    }
}

export default firebaseConnect()(Login)