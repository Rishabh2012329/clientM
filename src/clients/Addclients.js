import React, { Component } from 'react'
import {connect} from 'react-redux';
import  {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import background from './bat.jpg'
import '../layout/Addclients.css'

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
        //Changing state as we change input
        this.setState({[e.target.name]:e.target.value})
    }
     sub=(e)=>{
        const newClient=this.state;
        newClient.uid=this.props.auth.uid;
        if(newClient.balance===""){
            newClient.balance=0;
        }
        const {firestore}= this.props
        //Adding new Client 
        firestore.add({collection:"users"},newClient).then(()=>this.props.history.push('/')).catch((error)=>alert(error))
    }
    

    render() {   
        const {firstName,lastName,email,phone,balance}=this.state;
        return (
             <div>
                 <style>{`body{background-image:url(${background});background-size:100%;overflow:hidden}`}</style>
            <div className="row">
            <div className="col-md-3 mx-auto"> 
            <div className="cust">
            <div className="card">
                <div className="card-body">
                <form>
                <div className="form-group">
                <input type="text" className="form-control" value={firstName} name="firstName" onChange={this.onChange} placeholder="firstName..." required ></input>   
                </div>
                <div className="form-group">
                <input type="text" className="form-control" value={lastName} name="lastName" onChange={this.onChange} placeholder="lastName..." required ></input>
                </div>
                <div className="form-group">
                <input type="text" className="form-control" value={email} name="email" onChange={this.onChange} placeholder="Email..." required></input> 
                </div>
                <div className="form-group">
                <input type="text" className="form-control" value={phone} name="phone" onChange={this.onChange} placeholder="phone..." ></input>  
                </div>
                <div className="form-group">
                <input type="text" className="form-control" value={balance} name="balance" onChange={this.onChange} placeholder="balance..."required ></input>  
                </div>
                </form>
                <button onClick={firstName!==""&&lastName!==""&&email!==""&&phone!==""?this.sub:null} className="btn btn-dark  btn-block">Add</button>    
                </div>
              </div>
              </div>
              </div>
            </div>
             </div>
        )
    }
}


export default compose(firestoreConnect(),connect((state,props)=>({
    auth:state.firebase.auth
})))(Addclients)