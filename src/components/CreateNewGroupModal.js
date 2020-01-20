import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default class CreateNewGroupModal extends Component {
    constructor(props) {
        super(props);
       
    }


    acceptGroupSelection=()=>{
        this.props.handleClose();
    }
    createNewGroup=()=>{
        console.log ( "in create new group")
     }

    render() {
        const { show, handleClose ,activeUser, activeGroup} = this.props;

        let showThisCompponent=(show)?"visible":"collapsed";
        showThisCompponent=(activeGroup!=null)?"visible":showThisCompponent;
      

        return (

            <Modal show={show} className="group-settings"  onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>here comes the modal title...</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                
                <Form.Group  >
                    <Form.Label>group name</Form.Label>
                    <Form.Control type="text" placeholder="Enter group name" />
                    <Form.Text className="text-muted"/>
                </Form.Group>
                <Form.Group  >
                    <Form.Label>Add user</Form.Label>
                    <Form.Control type="text" placeholder="Enter user email" />
                    <Form.Text className="text-muted"/>
                </Form.Group>
                <Button variant="primary" type="button">
                    Add user
                </Button >
                <Form.Group >
                    <Form.Label>users list</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                
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