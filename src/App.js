import React from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      activeUser: null,
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(user) {
    this.setState({
      activeUser: user
    });
  }

  handleLogout() {
    this.setState({
      activeUser: null
    })
  }

  render() {

      return (
        <div className="App">
         
            Hello share2buy
          <LoginComponent handleLogin={this.handleLogin}/>
          
        </div>
      );
  }

}
