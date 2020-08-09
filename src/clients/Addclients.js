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
        error:{},
    }

    onChange=(e)=>{
        var {balance} =this.state;
        balance=Array.from(balance);
        var check=true;
        balance.map((bl)=>(
            bl=parseInt(bl),
            isNaN(bl)?
             check=false:null 
        ))
        if(!check){
            this.setState({error:{balance:"it should be a number"}})
        }
        else
        this.setState({error:{}})
        //Changing state as we change input   
        this.setState({[e.target.name]:e.target.value})
    }
     sub=(e)=>{
        const newClient=this.state;
        newClient.uid=this.props.auth.uid;
        var {balance} =this.state;
        var check=true;
        if(newClient.balance===""){
            newClient.balance=0;
        }
        balance=Array.from(balance)
        const {firestore}= this.props
        balance.map((bl)=>(
            bl=parseInt(bl),
            isNaN(bl)?
             check=false:null 
        ))
        //Adding new Client 
        if(check)
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
                <input type="text" className={classnames("form-control",{
                    "is-invalid":error.balance
                })} value={balance} name="balance" onChange={this.onChange} placeholder="balance..." error={error.balance} required ></input>

                {error?<div className="invalid-feedback">{error.balance}</div>:null}   

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