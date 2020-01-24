import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Parse from 'parse';
import ShoppingGroup from '../model/ShoppingGroup';

//CreateNewGroupModal
// used to create new group in the DB , and select this group as active
// props:
//    -activeUser- who is the active user
//    -activeGroup- who is the current active group ( the one before this dialog was opened)
//    -handleClose- the function that will be handling close this dialog
//    -handleGroupSelection- the function that is responsible for the selection of the new created group 
//state: 
//   - newUserMail,newGroupName- the new values that the user has entered
//   -users- the list of users , that was selected for the new group. will be sent to db
//   - errorMessage- messages that will be shown to the user on the dialog footer

export default class CreateNewGroupModal extends Component {
    constructor(props) {
        super(props);
        this.lstUsers=[];

        // the uers is for the textarea
        this.state={
            newUserMail:"",
            newGroupName:"",
            users:[],
            errorMessage:""
        }
        
       
    }
    //general function to handle all input changes
    handleInputChange=(event)=> {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // this function checks if all mandatory fields are filled 
    //and creates a new group in the db
    createNewGroup=()=>{
        const{newGroupName,users}=this.state;
        this.setState({
            errorMessage:""
        })     
        if (!newGroupName)
        {
            console.log ( "in create new group:newGroupName is empty")
            this.setState({
                errorMessage:"new Group Name is empty"
            })     
            return;
        }
        if (users.length===0)
        {
            console.log ( "in create new group:there are no users defined")
            this.setState({
                errorMessage:"There are no users defined to the group"
            })     
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
                        this.setState({
                            errorMessage:"Error in connection to db"
                        })     
                        return null;
                        
                    }
                );
         }
    

     
    // this function adds a user to the users list
    // the user should be in the db in order to add it to the group
     AddUser=()=>{
            const{newUserMail,users}=this.state
            this.setState({
                errorMessage:""
            })     
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
              this.setState({
                errorMessage:"Error in connection to db"
            })     
            });
        // if does not exsist, do nothing
        
     }

    //return to select group....
     CancelSelection=()=>{
            this.props.handleClose(true);   // this may not work !!!
    }

    render() {
        const { show, handleClose} = this.props;
        const{newUserMail,newGroupName,users,errorMessage}=this.state
      
        const theUsers=users.join (" ");

        return (

            <Modal show={show} className="group-settings"  onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>יצירת קבוצה חדשה</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                
                <Form.Group  >
                    <Form.Label>שם קבוצה</Form.Label>
                    <Form.Control type="text" name="newGroupName" value={newGroupName} placeholder="הכנס שם קבוצה"  onChange={this.handleInputChange}/>
                </Form.Group>
                <Form.Group  >
                    <Form.Label>הוסף משתמש</Form.Label>
                    <Form.Control type="email" name="newUserMail" value={newUserMail} placeholder="הכנס דואר אלקטרוני"  onChange={this.handleInputChange} />
                </Form.Group>
                <Button variant="info" type="button" onClick={this.AddUser}>
                    הוסף משתמש
                </Button >
                <Form.Group >
                    <Form.Label>רשימת משתמשים</Form.Label>
                    <Form.Control as="textarea" rows="3" value={theUsers} />
                </Form.Group>
                
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group>
                            <Form.Label>{errorMessage}</Form.Label>
                    </Form.Group>
                    <Button variant="secondary" onClick={this.CancelSelection}>
                        בטל
                    </Button>
                    <Button variant="info" onClick={this.createNewGroup}>
                        צור
                    </Button>

                </Modal.Footer>
            </Modal>);
    }
}