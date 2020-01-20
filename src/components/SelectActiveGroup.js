import React, { Component } from 'react';
import { Modal, Button, Form,Dropdown,InputGroup,DropdownButton,FormControl } from 'react-bootstrap';
import './SelectActiveGroup.css';
export default class SelectActiveGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowCreateNewGroup:false
        }

    }

    acceptGroupSelection=()=>{
        this.props.handleClose();
    }
    createNewGroup=()=>{
        this.setState({isShowCreateNewGroup:true});
        console.log ( "in create new group")
     }

    render() {
        const { show, handleClose ,activeUser, activeGroup} = this.props;

        let showThisCompponent={show}
        if (activeGroup)
        {
            showThisCompponent=true;
        }

        return (
            
            <Modal className="group-settings" show={showThisCompponent} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>here comes the modal title...</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                     <Form>
                        <Form.Group>
                            <Form.Label>current group is {activeGroup} </Form.Label>
                            <Form.Label>Select other group or create new </Form.Label>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Available groups are </Form.Label>
                            <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
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