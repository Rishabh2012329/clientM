import React, { Component } from 'react'
import {connect} from 'react-redux';
import  {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import background from './bat.jpg'
import '../layout/Addclients.css';
import classnames from 'classnames';

class Addclients extends Component {

    state={
        email:"",
        firstName:"",
        uid:"",
        lastName:"",
        phone:"",
        balance:"",
    }

    onChange=(e)=>{
           
        this.setState({[e.target.name]:e.target.value})
    }
     sub=(e)=>{
         e.preventDefault();
        const {users}=this.props;
        var checkph=true;
        var checknm=true
        const newClient=this.state;
        newClient.uid=this.props.auth.uid;
        users.map((user)=>(
            user.phone===newClient.phone?checkph=false:null,
            user.firstName===newClient.firstName&&user.lastName===newClient.lastName?checknm=false:null
        ))
        console.log(newClient.balance)
        if(newClient.balance===""){
            newClient.balance=0;
        }  
        if(!checkph){
            alert("another client is using this phone no.");
        }
        if(!checknm){
            alert("there can't be two clients with same name")
        }
        const {firestore}= this.props
       
        //Adding new Client 
       if(checkph&&checknm) 
        firestore.add({collection:"users"},newClient).then(()=>this.props.history.push('/')).catch((error)=>alert(error))
    }
    

    render() {   
        const {firstName,lastName,email,phone,balance,error}=this.state;
       
        return (
             <div>
                 <style>{`body{background-image:url(${background});background-size:100%;overflow:hidden}`}</style>
            <div className="row">
            <div className="col-md-3 mx-auto"> 
            <div className="cust">
            <div className="card">
                <div className="card-body">
                <form onSubmit={this.sub}>
                <div className="form-group">
                <input type="text"   minLength="2" className="form-control" value={firstName} name="firstName" onChange={this.onChange} placeholder="firstName..." required ></input>   
                </div>
                <div className="form-group">
                <input type="text"  minLength="2" className="form-control" value={lastName} name="lastName" onChange={this.onChange} placeholder="lastName..." required ></input>
                </div>
                <div className="form-group">
                <input type="email" className="form-control" value={email} name="email"  onChange={this.onChange} placeholder="Email..." required></input> 
                </div>
                <div className="form-group">
                <input type="text" className="form-control" value={phone} name="phone"  minLength="10" onChange={this.onChange} placeholder="phone..." required></input>  
                </div>
                <div className="form-group">
                <input type="number"  step="1"  className="form-control" value={balance} name="balance" onChange={this.onChange} placeholder="balance..."  required ></input>
                </div>
                <input type="submit" value="add" className="btn btn-dark  btn-block"></input>    
                </form>
                </div>
              </div>
              </div>
              </div>
            </div>
             </div>
        )
    }
}


export default compose(firestoreConnect(['users']),connect((state,props)=>({
    users:state.firestore.ordered.users,
    auth: state.firebase.auth,
})))(Addclients)