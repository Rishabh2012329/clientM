import React, { Component } from 'react'
import './navbar.css'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state={
    isAuthenticated: false
  }
  lout= (e)=>{
    e.preventDefault();
    const {firebase} =this.props;
    firebase.logout()/*.then(()=>window.location.reload(false))*/.then(()=>this.props.history.push('/Login')).catch((error)=>console.log(error))
  }
  static getDerivedStateFromProps(props,state){
    const {auth}=props;
    if(auth.uid){
        return {isAuthenticated:true}
    }else
    return {isAuthenticated:false}
    }
    render() {
      const {isAuthenticated} =this.state;
      const {auth} =this.props;
        return (
            <div>
                <div >
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
  <ul className="navbar-nav">
    <li className="nav-item" >
      <Link className="nav-link" to="/">Home</Link>
    </li>
  </ul>
  {isAuthenticated?(<ul className="navbar-nav ml-auto"> 
        <li className="nav-item"><span className="nav-link" >{auth.email}</span></li>
        <li className="nav-item"><span className="nav-link"  onClick={this.lout}>logout</span></li>

  </ul>):null}
</nav>
                </div>

            </div>
        )
    }
}

export default compose(
  firebaseConnect(),connect((state,props)=>({
    auth:state.firebase.auth
  }))
)(Navbar)
