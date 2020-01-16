import React from 'react';
import { Redirect } from 'react-router-dom';

export default class ShoppingPage extends React.Component {

    constructor(props) {
        super(props);
    }

  render() {
      const {activeUser}=this.props;

      if (!activeUser) {
        return <Redirect to="/"/>
    }
      return (
          <div>
             <h1>My Shopping</h1> 
             hello {activeUser.email}
          </div>
      );
  }

}