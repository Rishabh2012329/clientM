import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/spinner';
import classnames from 'classnames';
import back from './bat.jpg';
import '../layout/ClientDetails.css';

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: '',
    error:{}
  };

  // Update balance
  balanceSubmit = e => {
    e.preventDefault(); //preventing default action like reload

    const { client, firestore } = this.props;
    var { balanceUpdateAmount } = this.state;

    balanceUpdateAmount=Array.from(balanceUpdateAmount);
        var check=true;
        balanceUpdateAmount.map((bl)=>(
            bl=parseInt(bl),
            isNaN(bl)?
             check=false:null
        ))
        balanceUpdateAmount=balanceUpdateAmount.toString();
        balanceUpdateAmount=balanceUpdateAmount.split(",").join("");
        console.log(balanceUpdateAmount)
    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };
   
    if(check)
    // Update in firestore
    firestore.update({ collection: 'users', doc: client.id }, clientUpdate);
  };

  // Delete client
  onDeleteClick = () => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: 'users', doc: client.id })
      .then(history.push('/')); //pushing user to Home Component
  };

  onChange = (e) => {
    var {balanceUpdateAmount} =this.state;
    balanceUpdateAmount=Array.from(balanceUpdateAmount);
        var check=true;
        balanceUpdateAmount.map((bl)=>(
            bl=parseInt(bl),
            isNaN(bl)?
             check=false:null
        ))
        if(!check){
            this.setState({error:{balance:"it should be a number"}})
        }
        else
        this.setState({error:{}})
    this.setState({ [e.target.name]: e.target.value });}

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = '';
    // If balance form should display
    if (showBalanceUpdate) {
      const {error}=this.state;
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className={classnames("form-control",{
                "is-invalid":error.balance
            })}
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
              error={error.balance}
              required
            />
            {error?<div className="invalid-feedback">{error.balance}</div>:null}
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <style>{`body{background-image:url(${back});background-size:100%;overflow:hidden}`}</style>
          
          <div style={{maxWidth:"100%"}} className="row">
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/Home/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="my">
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{' '}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{' '}
                    <span
                      className={classnames({
                        'text-danger': client.balance > 0,
                        'text-success': client.balance === 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>{' '}
                    <small>
                      <a
                        href="#!"
                        onClick={() =>     //setting showbalanceUpdate to true on click
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {balanceForm}
                </div>
              </div>

              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}



export default compose(
  firestoreConnect(props => [
    { collection: 'users', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
