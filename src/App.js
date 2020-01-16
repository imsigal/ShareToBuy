import React from 'react';
import './App.css';
import { Switch, Route,HashRouter  } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import ShoppingPage from './pages/ShoppingPage';

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
    const { activeUser } = this.state;
      return (
        <div className="App">
         <HashRouter>
            <Switch>
                <Route exact path="/">
                  <LoginPage  handleLogin={this.handleLogin}></LoginPage>
                </Route>
                <Route exact path="/shopping">
                  <ShoppingPage activeUser={activeUser} ></ShoppingPage>
                </Route>
               
            </Switch>
          </HashRouter>
          
        </div>
      );
  }

}
