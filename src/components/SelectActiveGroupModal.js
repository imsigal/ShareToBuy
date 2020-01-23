import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SelectActiveGroupModal.css';
import Parse from 'parse';
import ShoppingGroup from '../model/ShoppingGroup';


export default class SelectActiveGroupModal extends Component {
    constructor(props) {
        super(props);


        // lst groups are only the names
        // selected is also the name. 
        this.state = {
            isShowCreateNewGroup:false,
            lstGroups:[],
            selectedGroup:null
        }

        this.GetGroupByName=this.GetGroupByName.bind(this);

    }

    async componentDidMount()
    {
        this.GetGroupList();

    }

    // set in the state the selected item
    HandleGroupSelection=(event)=>{
           let selectedGroupName=event.target.value;
           this.setState({
                selectedGroup:selectedGroupName
           })
    }

    // when ok, look for the group in the db, and send it to the app
    acceptGroupSelection=()=>{

        if (!this.state.selectedGroup)
        {
            console.log("no group was selected");
        }
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
            console.log(result) ;         
            let selectedItem= new ShoppingGroup(result);
            this.props.handleGroupSelection(selectedItem); 
          })
          .catch(function(error){
            console.log("Error: " + error.code + " " + error.message);       
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
        const { show, handleClose , activeGroup} = this.props;
        const {lstGroups}=this.state

         let lstGroupsOption=lstGroups.map((item,index)=>
         <option>{item} </option>)

        
        return (        
            <Modal show={show} className="group-settings"  onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>here comes the modal title...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <Form >
                        <Form.Group >
                            <Form.Label>current group is {activeGroup} </Form.Label>
                            
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Select other group, Available groups are </Form.Label>
                            <Form.Control as="select" onChange ={this.HandleGroupSelection}>
                           { lstGroupsOption}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>or, Create new group </Form.Label>
                            <Button variant="info" onClick={this.createNewGroup}>
                                Create New Group
                            </Button>
                        </Form.Group>

                    </Form> 


                    </Modal.Body>
                <Modal.Footer>
                   
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="info" onClick={this.acceptGroupSelection}>
                            Ok
                    </Button>

                </Modal.Footer>
            </Modal>);
    }
}