import React, { Component } from 'react';
import { Form, Button, Alert,Container } from 'react-bootstrap';
import User from '../model/user';
import './LoginPage.css';
import { Redirect } from 'react-router-dom';
import imageMainIcon from '../images/ShareToBuy.png'

//LoginPage
// this is the first page the user sees, 
//sign in the the system and the db
// states:
//  -email:user email adress,
//  -pwd:user password,
//  -showInvalidLoginError: true - will show the text area saved for the error message
//  -redirectToNextPage: true- will redirect to the next pag
//properties:
//  handleLogin-the pointer to the function that actualy preform the login
export default  class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pwd: "",
            showInvalidLoginError: false,
            redirectToNextPage: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }
   // handle the changes in the form fields
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            showInvalidLoginError: false  // clean the error 
        });
    
    }

    // this function is the one that actually tries to loggin the db
    login() {
        const { handleLogin } = this.props;
        const { email, pwd } = this.state;

        User.login(email, pwd).then(user => {
            handleLogin(user);
            this.setState({
                redirectToNextPage: true
            });
            localStorage.setItem('user', user)
        })
        .catch(error => {
            console.error('Error while logging in user', error);
            this.setState({
                        showInvalidLoginError: true,
                        pwd: ""
                    });
        });

}

    render() {
        const { email, pwd, showInvalidLoginError, redirectToNextPage } = this.state;

         if (redirectToNextPage) {
             return <Redirect to="/shopping"/>
         }
        const errorAlert = showInvalidLoginError ? <Alert variant="danger">Invalid email or password!</Alert> : null;

        return (
            <Container>
            <div className="p-login">
                <div className="main">
                    <img src={imageMainIcon} alt="ShareToBuy" />
                    <span className="header-title">   ShareToBuy</span>
                    {errorAlert}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" value={email}
                                type="email" placeholder="הכנס דואר אלקטרוני" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="pwd" value={pwd}
                                type="password" placeholder="ססמא" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="info" type="button" block onClick={this.login}>
                            כניסה
                        </Button>
                    </Form>
                </div>
            </div>
            </Container>
        );
    }
}
