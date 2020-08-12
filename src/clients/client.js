import React, { Component } from 'react';
import {connect} from 'react-redux';
import  {compose} from 'redux';
import {firestoreConnect, isEmpty} from 'react-redux-firebase';
import Loading from '../layout/spinner'
import {Link} from 'react-router-dom';
import '../layout/client.css';
import back1 from './4.jpg';
import back2 from './bat.jpg';
import back3 from './8.jpg';
class Client extends Component {
  state={
    totalOwed:null,
    index:0,
  }

  static getDerivedStateFromProps(props, state) //this method is invoked right before calling the render method
  {
    var { users } = props;
    const {auth} = props;

    if (users) {
      users= users.map(cl=>(
        auth.uid===cl.uid?cl:null  //filtering clients of the user
    ))

    users=users.filter(function (cl)  //filtering null elements in users
    { 
      return  cl!=null;
    }) 
    
      // Add balances
      var total = users.reduce((total, client) => {
       return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    }

    return null;
  }


    render() {
     const {index} = this.state;
     const change=()=>{
       if(index<2)
       this.setState({index:index+1});
       else
       this.setState({index:0});
     }
      const back=[back1,back2,back3];
      const backy=back[index];
        const {auth} = this.props;
        const {totalOwed}=this.state;
        var clients = this.props.users; 
        if(clients){
            clients= clients.map(cl=>(      //filtering clients of the user
                auth.uid===cl.uid?cl:null
            ))
            clients=clients.filter(function (cl)  //filtering null elements in users
            { 
              return  cl!=null;
            }) 
        }   
  
        if(clients){
         
            return (
              <div>
                <style>{`body{background-image:url(${backy});background-size:100%;overflow:hidden}`}</style>
              <div className="row">
                <div className="col-md-2">
                  <h2>
                    {' '}
                    <i className="fas fa-users" /> Clients{' '}
                  </h2>
                </div>
                <div className="col-md-7">
                  <Link to={'/Home/addclients'}>
                  <button style={{margin:"auto"}} className="btn btn-dark"><i className="fas fa-plus"></i> Add</button>
                  </Link>
                </div>
                <div   className="col-md-3">
                  <h5  className="text-left text-secondary" style={{textAlign:'left'}}>
                    Total Owed{' '}
                    <span className="text-primary">
                      ${parseFloat(totalOwed).toFixed(2)}
                    </span>
                  </h5>
                </div>
                <div style={{textAlign:'center'}} className="container">      
                 <button id="but" onClick={change}style={{background:'rgba(0,0,0,.700)',color:'white',padding:'20px',borderRadius:'23px 23px 23px 23px',outline:'none'}}>change</button>                     
              </div>
              </div>
                <div>
                  <div className="row" style={{marginTop:'2%'}}>
                  <div className="col">
                  <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.length!==0?
              clients.map(client => (
                  client!==null?
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  {(client.balance!==0?<td className="text-danger">${parseFloat(client.balance).toFixed(2)}</td>:<td className="text-success">${parseFloat(client.balance).toFixed(2)}</td>)}
                  
                  <td>
                    <Link
                      to={`/Home/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>:null
              )):<h3>No clients,Go ahead and add one</h3>}
            </tbody>
          </table>
                    </div>
                  </div>
                  </div>
                </div>
            )
        }
        else
        return(
            <h1><Loading/></h1>
        )
    }
}

export  default compose(firestoreConnect([
    'users'                                                      
]),connect((state,props)=>({
    users:state.firestore.ordered.users,
    auth:state.firebase.auth
})))(Client)
