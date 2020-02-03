import React, { Component } from 'react';
import { Modal, Button, Form,Row,Col } from 'react-bootstrap';
import Category from '../model/Category';
import ShoppingGroup from '../model/ShoppingGroup';


export default class CategoryNewModal extends Component {
    constructor(props) {
        super(props);

        this.state={
            name:"",
            imgFile:undefined,
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
    createNewCategory=()=>{
        const{name,imgFile}=this.state;
        this.setState({
            errorMessage:""
        })     
        if (!name)
        {
            console.log ( "in create new category:category name is empty")
            this.setState({
                errorMessage:"new Category Name is empty"
            })     
            return;
        }
        
        // create the category in the db      
         Category.createNewCategory(name,imgFile)
            .then(newCategory => {            
                // add the category to the corrent group
                ShoppingGroup.addCategoryToGroup(newCategory,this.props.activeGroup)
                .then(result=>{
                    this.ClearCategoryDialog();
                    this.props.handleCategoryClose(true);
                })
                .catch(error=>{
                    console.error('Error while creating connection category to group: ', error);
                    this.setState({
                            errorMessage:"Error in connection to db"
                    })                   
                })

            })
            .catch(error => {
                console.error('Error while creatingnew category: ', error);
                this.setState({
                        errorMessage:"Error in connection to db"
                })                   
            });
         }
    

     
         handleFileChange=(event)=> {
            if (event.target.files[0]) {
                this.setState({
                    imgFile:event.target.files[0]
                })
            } else {
                this.setState({
                    imgFile:undefined
                })
            }     
        }

    // clear all field  and close dialog.
    // since it is modal , it is not created again when reoprn. only hide and show
    ClearCategoryDialog=()=>{
        this.setState({
            errorMessage:"",
            imgFile:undefined,
            name:""
        })  
    }

    //return to select group....
     CancelSelection=()=>{
            this.ClearCategoryDialog();
            this.props.handleCategoryClose(false);   
    }
  
    render() {
        const { show, handleCategoryClose} = this.props;
        const{name,errorMessage}=this.state
        return (

            <Modal show={show} className="group-settings"  onHide={handleCategoryClose}>
                <Modal.Header>
                    <Modal.Title>יצירת קטגוריה חדשה</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                
                <Form.Group  >
                    <Form.Label>שם קטגוריה</Form.Label>
                    <Form.Control type="text" name="name" value={name} placeholder="הכנס שם קטגוריה"  onChange={this.handleInputChange}/>
                </Form.Group>
                 
                <Form.Group>
                            <Form.Label>Image URL</Form.Label>
                            <Row>
                                <Col>
                            <Form.Control type="file" onChange={this.handleFileChange} />
                                </Col>
                            </Row>
                        </Form.Group>
                
            </Modal.Body>
                <Modal.Footer>
                    <Form.Group>
                            <Form.Label>{errorMessage}</Form.Label>
                    </Form.Group>
                    <Button variant="secondary" onClick={this.CancelSelection}>
                        בטל
                    </Button>
                    <Button variant="info" onClick={this.createNewCategory}>
                        צור
                    </Button>

                </Modal.Footer>
            </Modal>);
    }
}