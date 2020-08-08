import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Client from './clients/client'
//import firebase from 'firebase'; 
import firebase from 'firebase/app';
import 'firebase/firestore';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer,createFirestoreInstance} from 'redux-firestore';
import {createStore,combineReducers} from 'redux';
import {
  ReactReduxFirebaseProvider
} from 'react-redux-firebase'
import Navbar from './layout/navbar';
import Login from './auth/login';
import Addclients from './clients/Addclients';
import {UserIsNotAuthenticated,UserIsAuthenticated} from './protect/auth';
import ClientDetails from './clients/ClientDetails';
import EditClient from './clients/EditClient';
import Err from './Err';

var firebaseConfig = {
    apiKey: "AIzaSyC7qIcfA0jbocN5vb8PAW_WMJ-XlSN-TYY",
    authDomain: "auth-866d7.firebaseapp.com",
    databaseURL: "https://auth-866d7.firebaseio.com",
    projectId: "auth-866d7",
    storageBucket: "auth-866d7.appspot.com",
    messagingSenderId: "777932976155",
    appId: "1:777932976155:web:1de939fcd1f94c6e0708be",
    measurementId: "G-05GP10R22W"
  };

  const rrfConfig = {
    userProfile: null,
    useFirestoreForProfile: true //Firestore for Profile instead of Realtime DB
  }
  
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore=firebase.firestore();


const rootReducer= combineReducers({
  firebase:firebaseReducer,
  firestore:firestoreReducer
})
const initialState ={};
const store=createStore(rootReducer,initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

export default class App extends Component {
  render() {
    return (
      <Router>
      <Provider store={store}>       
        <ReactReduxFirebaseProvider {...rrfProps}>            
        <div>       
        <Navbar/> 
        <Switch>
        <Route exact path="/" component={UserIsAuthenticated(Client)}/>
        <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
        <Route exact path="/Home/addclients" component={UserIsAuthenticated(Addclients)}/>
        <Route exact path="/Home/:id" component={UserIsAuthenticated(ClientDetails)}/>
        <Route exact path="/Home/edit/:id" component={UserIsAuthenticated(EditClient)}/>
        <Route  component={UserIsAuthenticated(Err)}/>
        </Switch>
        </div>
        </ReactReduxFirebaseProvider>
      </Provider>
      </Router>     
    )
  }
}

