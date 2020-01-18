import React, { Component } from 'react';
import { Form, Button, Alert,Container } from 'react-bootstrap';
import Parse from 'parse';
import User from '../model/user';
import './LoginPage.css';
import { Redirect } from 'react-router-dom';
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            showInvalidLoginError: false  // clean the error 
        });
    
    }

    

    // login() {
    //     const { handleLogin } = this.props;
    //     const { email, pwd } = this.state;


    //     const newUser = User.login(email, pwd).then
    //     {   
    //         if (newUser)
    //         {
    //             handleLogin(newUser);   // send the user to app,to be passed to all appplication
    //                 //handle navigation to next page
    //                 this.setState({
    //                     redirectToNextPage: true
    //                 });
    //         }
    //         else
    //         {
    //             this.setState({
    //                 showInvalidLoginError: true,
    //                 pwd: ""
    //             });
    //         }
    //     }


        login() {
            const { handleLogin } = this.props;
            const { email, pwd } = this.state;

        // Pass the email and password to logIn function
            Parse.User.logIn(email, pwd)
            .then(parseUser => {
                // successful login
                const user = new User(parseUser);
                handleLogin(user);   // send the user to app,to be passed to all appplication
                //handle navigation to next page
                this.setState({
                    redirectToNextPage: true
                });
             })
            .catch(error => {
            console.error('Error while logging in user', error);
            this.setState({
                showInvalidLoginError: true,
                pwd: ""
            });
        })
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
                    <h1>Login to ShareToBuy</h1>
                    {errorAlert}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" value={email}
                                type="email" placeholder="Enter email" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="pwd" value={pwd}
                                type="password" placeholder="Password" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="success" type="button" block onClick={this.login}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
            </Container>
        );
    }
}
