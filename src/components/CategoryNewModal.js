import React, { Component } from 'react';
import { Modal, Button, Form,Row,Col } from 'react-bootstrap';
import Category from '../model/Category';
import ShoppingGroup from '../model/ShoppingGroup';
import ShoppingList from '../model/ShoppingList';


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
        const {activeGroup}=this.props;
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
        // create the category in the db and add the new category to the current group
        // add a new shopping List to this category and add this shopping List to this group      
         Category.createNewCategory(name,imgFile)
            .then(newCategory => {            
                // add the category to the corrent group
                activeGroup.addCategoryToGroup(newCategory)
                .then(result=>{
                        this.props.activeGroup.CreateNewShoppingListinGroup(newCategory)
                         .then(result=>{
                            // set this category as selected, and show the content in the tab
                            // close the dialog
                            this.ClearCategoryDialog();
                            this.props.handleCategoryClose(true);
                         })
                        .catch(error=>{
                            console.error('Error while creating new shopping List: ', error);
                            this.setState({
                                    errorMessage:"Error in connection to db"
                            })                                       
                        })
                    })
                   
                .catch(error=>{
                        console.error('Error while creating connection category to group: ', error);
                        this.setState({
                                errorMessage:"Error in connection to db"
                        })                   
                    })

            })
            .catch(error => {
                console.error('Error while creating new category: ', error);
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