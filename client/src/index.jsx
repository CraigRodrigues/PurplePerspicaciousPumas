import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SignUp from './components/SignUp.jsx';
import { Router, Route, hashHistory } from 'react-router';
import Lobby from './components/Lobby.jsx';
import Home from './components/Home.jsx';
import Game from './components/Game.jsx';
import io from 'socket.io-client';

const ioSocket = io();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.sendToGame = this.sendToGame.bind(this);
    this.sendToLobby = this.sendToLobby.bind(this);
  }

  sendToLobby(disconnectTimeOut) {
    console.log('Sending to lobby');
    hashHistory.push('/lobby');
  }

  sendToGame(gameName) {
    ioSocket.emit('leave lobby', {id: ioSocket.id});
    hashHistory.push(/game/ + gameName);
  }

  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/"
            component={Home}
            sendToLobby={this.sendToLobby}
            handleSignUp={this.handleSignUp}
            handleLogIn={this.handleLogIn} />
          <Route path="/lobby"
            component={Lobby}
            ioSocket={ioSocket}
            sendToGame={this.sendToGame}
            disconnectTimeOut={this.state.disconnectTimeOut} />
          <Route path="/lobby/:disconnectTimeOut"
            component={Lobby}
            ioSocket={ioSocket}
            sendToGame={this.sendToGame}
            disconnectTimeOut={this.state.disconnectTimeOut} />
          <Route path="/game/:gamename"
            component={Game}
            ioSocket={ioSocket}
            sendToLobby={this.sendToLobby} />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

