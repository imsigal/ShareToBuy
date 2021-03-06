import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import User from '../model/user';
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

        ShoppingGroup.CreateNewGroup(newGroupName, this.lstUsers).then(result=>{
        
                let NewGroup = new ShoppingGroup(result); 
                this.props.handleGroupSelection(NewGroup);  
                this.props.handleClose();
        
        })
      
        .catch(error => {
            console.error("error while Creating New Group",error);
            this.setState({
                errorMessage:"error while Creating New Group"
            })     
        });
                  
    }
    

     
    // this function adds a user to the users list
    // the user should be in the db in order to add it to the group
     AddUser=()=>{
            const{newUserMail,users}=this.state
            this.setState({
                errorMessage:""
            })     
            // find the user in the database  
            // since mail is unique, only one user should be
            User.findUserbyEmail(newUserMail).then(result=>{
                this.setState({
                    errorMessage:""
                })     
                if (result!==undefined && result!==null && result.length>0) //should be only one user,// if does not exsist, do nothing
                {
                  this.lstUsers.push(result[0].id);  //enter the id of the user
                  // add  the name to the textarea window
                  this.setState({
                      users: users.concat(newUserMail)
                  })
                }
                else{
                    this.setState({
                        errorMessage:"could not find this user"
                        })     
                }
            })
              
            .catch(error => {
              console.error('Error while fetching ParseObjects', error);
              this.setState({
                errorMessage:"Error in fetching the user"
                })     
            });
        
     }

    //return to select group....
     CancelSelection=()=>{
            this.props.handleClose(true);   // this may not work !!!
    }

    render() {
        const { show, handleClose} = this.props;
        const{newUserMail,newGroupName,users,errorMessage}=this.state
      
        const theUsers=users.join ("\n");
        
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