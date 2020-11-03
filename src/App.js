import './custom.scss';
import React from 'react';
import './App.css';
import { Switch, Route,HashRouter  } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import ShoppingPage from './pages/ShoppingPage';
import Parse from 'parse'

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    //getFromStorage();
    const loggedInUser = localStorage.getItem("user");
    const currentGroup = localStorage.getItem("Group");
    // save state
    this.state = {
         activeUser: loggedInUser,
         activeGroup:currentGroup
       }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // getFromStorage()
  // {
  //    // get from local storage
  //    const loggedInUser = localStorage.getItem("user");
  //    // if (loggedInUser) {
  //    //   const foundUser = JSON.parse(loggedInUser);
  //    //   //setUser(foundUser);
  //    // }
 
  //    const currentGroup = localStorage.getItem("Group");
  //    // save state
  //    this.state = {
  //         activeUser: loggedInUser,
  //         activeGroup:currentGroup
  //       }

  // }

  handleLogin(user) {
    this.setState({
      activeUser: user,
      activeGroup: null
    });
  }

  handleLogout() {
    this.setState({
      activeUser: null,
      activeGroup: null
    })
    Parse.User.logOut();
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
                  <LoginPage  handleLogin={this.handleLogin} ></LoginPage>
                </Route>
                <Route exact path="/shopping">
                  <ShoppingPage handleLogout={this.handleLogout} activeUser={activeUser} activeGroup={activeGroup} setGroup={this.setGroup} ></ShoppingPage>
                </Route>
               
            </Switch>
          </HashRouter>
          
        // </div>
      );
  }

}
