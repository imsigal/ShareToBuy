import React from 'react';
import './App.css';
import { Switch, Route,HashRouter  } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import ShoppingPage from './pages/ShoppingPage';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    //saving the Parse(!)  group object ,  and not the model one
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

  setGroup=(group)=>
  {
    this.setState({
      activeGroup: group
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
                  <ShoppingPage activeUser={activeUser} activeGroup={activeGroup} setGroup={this.setGroup} ></ShoppingPage>
                </Route>
               
            </Switch>
          </HashRouter>
          
        // </div>
      );
  }

}
