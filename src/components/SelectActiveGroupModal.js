import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SelectActiveGroupModal.css';
import Parse from 'parse';
import ShoppingGroup from '../model/ShoppingGroup';


//SelectActiveGroupModal
// used to select a group , from the groups that are found in the DB 
// props:
//    -activeUser- who is the active user
//    -activeGroup- who is the current active group ( the one before this dialog was opened)
//    -handleClose- the function that will be handling close this dialog
//    -handleGroupSelection- the function that is responsible for the selection of the new created group 
//    -HandleCreateNewGroup- is called when new group creation was chosen
//state: 
//   - isShowCreateNewGroup- if need to open the createNewGroup dialog
//   - lstGroups- the list of existing groups , from the db (only name)
//   - selectedGroup- the group that was selected (only name)
//   - errorMessage- messages that will be shown to the user on the dialog footer


export default class SelectActiveGroupModal extends Component {
    constructor(props) {
        super(props);


        // lst groups are only the names
        // selected is also the name. 
        this.state = {
            isShowCreateNewGroup:false,
            lstGroups:[],
            selectedGroup:null,
            errorMessage:""
        }

        this.GetGroupByName=this.GetGroupByName.bind(this);

    }

    async componentDidMount()
    {
        this.GetGroupList();

    }
    // on pressing on the cancel button
    CancelSelection=()=>{
        if (this.props.activeGroup)  // the previos group 
        {
            this.props.handleClose();
            this.setState({
                errorMessage:""
            })    
        }
        else{
            console.log(" initial group was empty , you must select a group");
            this.setState({
                errorMessage:"Initial group was empty, select a group"
            })     
         }
    }

    // set in the state the selected item
    HandleGroupSelection=(event)=>{   
           let selectedGroupName=event.target.value;
           this.setState({
                selectedGroup:selectedGroupName,
                errorMessage:""
           })
    }

    // when ok, look for the group in the db, and send it to the app
    acceptGroupSelection=()=>{

        if (!this.state.selectedGroup)
        {
            console.log("no group was selected");
            this.setState({
                errorMessage:"no group was selected"
            })     
        }
        this.setState({
            errorMessage:""
        })     
        this.GetGroupByName(this.state.selectedGroup);
        this.props.handleClose();
    }

    //open the NewGroup Dialog
    createNewGroup=()=>{
        this.setState({isShowCreateNewGroup:true});
        this.props.HandleCreateNewGroup();
    }

    // get from the db the group itself, according to the group name, and send it to app 
    GetGroupByName(theGroupName)
    {
        const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
        const query2 = new Parse.Query(ParseShoppingGroup);
        query2.equalTo("GroupName", theGroupName);
        query2.first().then(result => {           
            let selectedItem= new ShoppingGroup(result);
            this.props.handleGroupSelection(selectedItem); 
          })
          .catch(function(error){
            console.log("Error: " + error.code + " " + error.message); 
            this.setState({
                errorMessage:"Error Getting Group"
            })      
        });
    }

    // get the list of the groups as appear in the db
    async GetGroupList()
    {
        const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
        const query = new Parse.Query(ParseShoppingGroup);
        query.find().then(results => {         
            let lstItems=[];
                results.forEach(
                    item=>lstItems.push(item.get("GroupName"))
                )
                let selected=lstItems.length>0?lstItems[0]:null
                this.setState({
                    lstGroups:lstItems,
                    selectedGroup:selected
                });
          });
    }

    render() {
        const { show, handleClose} = this.props;
        const {lstGroups,errorMessage}=this.state

         let lstGroupsOption=lstGroups.map((item,index)=>
         <option>{item} </option>)

        
        return (        
            <Modal show={show} className="group-settings"  onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>בחירת קבוצה</Modal.Title>          
                </Modal.Header>
                <Modal.Body>
                     <Form >
                        <Form.Group >
                            <Form.Label>בחר קבוצה </Form.Label>
                            <Form.Control as="select" onChange ={this.HandleGroupSelection}>
                           { lstGroupsOption}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label> או צור קבוצה חדשה &emsp; &emsp;</Form.Label>
                            <Button variant="info" onClick={this.createNewGroup}>
                                צור קבוצה
                            </Button>
                        </Form.Group>
                    </Form> 
                    </Modal.Body>
                <Modal.Footer>
                    <Form.Group>
                            <Form.Label>{errorMessage}</Form.Label>
                    </Form.Group>
                    <Button variant="secondary" onClick={this.CancelSelection}>
                        בטל
                    </Button>
                    <Button variant="info" onClick={this.acceptGroupSelection}>
                        בחר
                    </Button>
                </Modal.Footer>
            </Modal>);
    }
}