import React, { Component } from 'react';
import { Modal, Button, Form,Dropdown,InputGroup,DropdownButton } from 'react-bootstrap';

export default class CreateNewGroup extends Component {
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

        let showThisCompponent={show}
        if (activeGroup)
        {
            showThisCompponent=true;
        }

        return (

            <div>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <br />
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Default</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <br />
                <InputGroup size="lg">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg">Large</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </div>);
    }
}