import React, { Component } from 'react'
import { FormControl, InputGroup,Button,ListGroup, Container,ButtonToolbar,ToggleButton,ToggleButtonGroup} from 'react-bootstrap';
import MyListItem from '../model/MyListItem';
import ShoppingItemComponent from './ShoppingItemComponent';
import './BaseListComponents.css';
import CategoryListComponents from './CategoryListComponents';

export default class BaseListComponents extends Component {
    constructor(props) {
        super(props);

        this.todoList=[];
        this.todoList.push(new MyListItem(0, "feed the cat"));
        this.todoList.push(new MyListItem(1,"buy present"));
        this.state = {
            NewItemText: "",
            theListItems:this.todoList,
            FilterOptionIndex:1,
            changeItemCount:false
        }

    }

    
    // handle input text change
    handleInputChange=(event)=> {
        const newText = event.target.value
        this.setState({
            NewItemText: newText
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

        const {NewItemText}=this.state;
        let newListItem =new MyListItem(this.todoList[this.todoList.length-1].id+1, NewItemText);
        this.todoList.push(newListItem);
        this.setState({
            theListItems: this.todoList.concat(),
            NewItemText: "",
            changeItemCount:true
        });
        

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

    DeleteItemHandler=(listIndex)=>
    {
        var itemIndex=this.todoList.findIndex(item=>item.id===listIndex)
        if (itemIndex>=0)
        {
            // if the task is not completed, show user a message
            if (this.todoList[itemIndex].isCompleted===false)
            {
                let result=window.confirm("This task was not completed, to delete it anyway??");
                if (result===false)
                    {
                        return;
                    }
            }
            this.todoList.splice(itemIndex,1);

            this.setState({
                theListItems: this.todoList,
                changeItemCount:true
            });
            
        }
        

    }

    // Filter the list according to the buttom show all/ show completed/show active
    filterOptions=()=>
    {
        let filteredArray=[];
        switch (this.state.FilterOptionIndex) {
            case 1:
                filteredArray= this.todoList;
                break;
            case 2:
                filteredArray=this.todoList.filter(item=>item.isCompleted===false);
                break;
            case 3:
                filteredArray=this.todoList.filter(item=>item.isCompleted===true);
                break;
            default:
                filteredArray= this.todoList;
                break;
        }
     
        return filteredArray;
    }

     getActiveItemCount()
    {
        let filteredArray=this.todoList.filter(item=>item.isCompleted===false);
       return (filteredArray.length);    
    }

  
    render() {
        const {NewItemText}=this.state;

        let filteredArray=this.filterOptions();
        let itemsLists=[];
        filteredArray.forEach(element => {
            itemsLists.push(<ShoppingItemComponent item={element} OnCompletedTask={this.CompletedTaskHandler} OnDeleteItem={this.DeleteItemHandler}></ShoppingItemComponent>)
         }  );
          
        const activeItemCount= this.getActiveItemCount();
    
        return (
          
               <Container>              
                   <ButtonToolbar >
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.FilterResults}>
                            <ToggleButton variant="light" value={1}>Show All</ToggleButton>
                            <ToggleButton variant="light" value={2}>Show Active</ToggleButton>
                            <ToggleButton variant="light" value={3}>Show completed</ToggleButton>
                        </ToggleButtonGroup>
                </ButtonToolbar>
                <CategoryListComponents></CategoryListComponents>
                <div className="main-base-list">
                <h5 className="left-items">{activeItemCount} items left </h5>
                <ListGroup>
                    {itemsLists}
                </ListGroup>
              
                 <InputGroup className="mb-3" size="lg">
                    <FormControl className="input"
                        placeholder="Add new item..."
                        aria-label="Add new Item..."
                        aria-describedby="basic-addon2"
                        value={NewItemText} 
                         onChange={this.handleInputChange}
                         onKeyDown={this.handleKeyDownEvent}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary"  onClick={this.HandleNewItem}>Add item</Button>
                    </InputGroup.Append>
                </InputGroup>
                </div>
            </Container>
        )
    }
}
