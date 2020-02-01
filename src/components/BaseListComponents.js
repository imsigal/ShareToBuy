import React, { Component } from 'react'
import { FormControl, InputGroup,Button,ListGroup, Container} from 'react-bootstrap';
import ShoppingItemComponent from './ShoppingItemComponent';
import './BaseListComponents.css';
import CategoryListComponents from './CategoryListComponents';
import ShoppingItem from '../model/ShoppingItem';

export default class BaseListComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItemText: "",
            imgFile:undefined,
            FilterOptionIndex:1,
            changeItemCount:false,
           
        }
       
    }


    // handle input text change
    handleInputChange=(event)=> {
        const newText = event.target.value
        this.setState({
            newItemText: newText
        });
    }

    // handle for enter key to accept changes
    handleKeyDownEvent=(event)=>{
        if (event.key === 'Enter') {
            this.HandleNewItem(event);
        }
    }

     // handle New item is added to the list
    HandleNewItem=(event)=>{    

        const {newItemText,imgFile}=this.state;
        if (!newItemText)
        {
            console.log("new shopping item text cannot be empty");
            return;
        }
        let initialCount=1;
        let newShoppingItem=new ShoppingItem(0,newItemText,imgFile,initialCount);
        // call adding the item
        this.props.addShoppingItem(newShoppingItem);
        // clean the fields
        this.setState({
                newItemText:"",
                changeItemCount:true
            })
        
    }

    // set the index according to the button pressed ( handler to the button click)
    FilterResults=(event)=>{
        this.setState({
            FilterOptionIndex:event
        })
            
    }
    //actions to do when a task is completed
    CompletedTaskHandler=(count)=>{
        this.setState({
            changeItemCount:true
        });
        
    }

    // Filter the list according to the buttom show all/ show completed/show active
    filterOptions=()=>
    {
        let filteredArray=[];
        filteredArray= this.props.shoppingItemsArray;  // currently no filter
        return filteredArray;
    }

   
    render() {
        const {newItemText}=this.state;
        const {categoryArray,selectedCategoryItem}=this.props;
        
        //list
       let filteredArray=this.filterOptions();
        let itemsLists=[];
        filteredArray.forEach(element => {
            itemsLists.push(<ShoppingItemComponent item={element} OnCompletedTask={this.CompletedTaskHandler} ></ShoppingItemComponent>)
         }  );
          
  
        return (
          
            <Container>  
                <CategoryListComponents categoryArray={categoryArray} 
                    selectedCategoryItem={selectedCategoryItem}>
                </CategoryListComponents>
                <div className="main-base-list">
                <ListGroup>
                    {itemsLists}
                </ListGroup>
              
                 <InputGroup className="mb-3" size="lg">
                    <FormControl className="input"
                        placeholder="הוסף פריט"
                        aria-label="הוסף פריט"
                        aria-describedby="basic-addon2"
                        value={newItemText} 
                         onChange={this.handleInputChange}
                         onKeyDown={this.handleKeyDownEvent}
                    />
                    <InputGroup.Append>
                        <Button variant="info"  onClick={this.HandleNewItem}>הוסף</Button>
                       
                    </InputGroup.Append>
                </InputGroup>
                </div>
            </Container>
        )
    }
}
