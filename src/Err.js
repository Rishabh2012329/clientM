import React, { Component } from 'react';
import back from './clients/bat.jpg';

export default class Err extends Component {
    render() {
        return (
            <div>
                <style>{`body{background-image:url(${back});background-size:100%;overflow:hidden}`}</style>
                <h1 style={{color:'white'}}>this page Does not Exist</h1>
            </div>
        )
    }
}
