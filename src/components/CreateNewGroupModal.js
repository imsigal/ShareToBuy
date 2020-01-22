import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Parse from 'parse';
import ShoppingGroup from '../model/ShoppingGroup';

export default class CreateNewGroupModal extends Component {
    constructor(props) {
        super(props);
        this.lstUsers=[];

        // the uers is for the textarea
        this.state={
            newUserMail:"",
            newGroupName:"",
            users:[]
        }
        
       
    }

    handleInputChange=(event)=> {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // acceptGroupSelection=()=>{
    //     this.props.handleClose();
    // }

    createNewGroup=()=>{
        console.log ( "in create new group")
        const{newGroupName,users}=this.state;
        if (!newGroupName)
        {
            console.log ( "in create new group:newGroupName is empty")
            return;
        }
        if (users.length===0)
        {
            console.log ( "in create new group:there are no users defined")
            return;
        }

            // db connection    ( should be handles saparately)
            const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
            const myNewObject = new ParseShoppingGroup(); 
            myNewObject.set('GroupName', newGroupName);
            myNewObject.set('lstUsers', this.lstUsers);
            myNewObject.set('lstShoppingLists', []);   //  create empty list
            myNewObject.set('lstCategories', []);       // create empty list
                myNewObject.save().then(
                    (result) => {
                        if (result)
                        {  
                                let NewGroup = new ShoppingGroup(result); 
                                this.props.handleGroupSelection(NewGroup);  
                                this.props.handleClose();
                        }
                    },
                    (error) => {
                        console.error('Error while creating ParseObject: ', error);
                        return null;
                        
                    }
                );
         }
    

     

     AddUser=()=>{
            const{newUserMail,users}=this.state
                // find the user in the database
            const user   = Parse.Object.extend('User');
            const query = new Parse.Query(user);
            query.equalTo("email", newUserMail);
            query.find().then((result) => {   
              // since mail is unique, only one user should be
              if (result!==undefined || result!==null)
              {
                this.lstUsers.push(result);
                // add  the name to the textarea window
                this.setState({
                    users: users.concat(newUserMail)
                })
              }
            }, (error) => {
              console.error('Error while fetching ParseObjects', error);
            });
        // if does not exsist, do nothing
        
     }

    render() {
        const { show, handleClose ,activeUser, activeGroup} = this.props;
        const{newUserMail,newGroupName,users}=this.state

        let showThisCompponent=(show)?"visible":"collapsed";
        showThisCompponent=(activeGroup!=null)?"visible":showThisCompponent;
      
        const theUsers=users.join (" ");

        return (

            <Modal show={show} className="group-settings"  onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>here comes the modal title...</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                
                <Form.Group  >
                    <Form.Label>group name</Form.Label>
                    <Form.Control type="text" name="newGroupName" value={newGroupName} placeholder="Enter group name"  onChange={this.handleInputChange}/>
                    {/* <Form.Text className="text-muted"/> */}
                </Form.Group>
                <Form.Group  >
                    <Form.Label>Add user</Form.Label>
                    <Form.Control type="email" name="newUserMail" value={newUserMail} placeholder="Enter user email"  onChange={this.handleInputChange} />
                    {/* <Form.Text className="text-muted"/> */}
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.AddUser}>
                    Add user
                </Button >
                <Form.Group >
                    <Form.Label>users list</Form.Label>
                    <Form.Control as="textarea" rows="3" value={theUsers} />
                </Form.Group>
                
                </Modal.Body>
                <Modal.Footer>
                   
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="info" onClick={this.createNewGroup}>
                            Ok
                    </Button>

                </Modal.Footer>
            </Modal>);
    }
}