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
      activeGroup:null
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

  setGroup=(groupName)=>
  {
    this.setState({
      activeGroup: groupName
    })
  }

  render() {
    const { activeUser,activeGroup } = this.state;
      return (
        // <div className="App">
         <HashRouter>
            <Switch>
                <Route exact path="/">
                  <LoginPage  handleLogin={this.handleLogin} getGroup={this.getGroup}></LoginPage>
                </Route>
                <Route exact path="/shopping">
                  <ShoppingPage activeUser={activeUser} activeGroup={activeGroup}></ShoppingPage>
                </Route>
               
            </Switch>
          </HashRouter>
          
        // </div>
      );
  }

}
