import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SelectActiveGroupModal.css';


export default class SelectActiveGroupModal extends Component {
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
        this.props.HandleCreateNewGroup();
     }

    render() {
        const { show, handleClose ,activeUser, activeGroup} = this.props;

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
                            <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
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