import React, { Component } from 'react'
import { FormControl, InputGroup,Button,ListGroup, Container} from 'react-bootstrap';
import ShoppingItemComponent from './ShoppingItemComponent';
import './BaseListComponents.css';
import CategoryListComponents from './CategoryListComponents';
import ShoppingItem from '../model/ShoppingItem';
import ShoppingGroup from '../model/ShoppingGroup';
import ShoppingList from '../model/ShoppingList';

export default class BaseListComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItemText: "",
            imgFile:undefined,
            FilterOptionIndex:1,
            changeItemCount:false,
            shoppingItemsArray:[],
            activeShoppingList:null
           
        }
        this.getShoppingItemsParams=this.getShoppingItemsParams.bind(this);
      this.addShoppingItem=this.addShoppingItem.bind(this);
      this.setActiveShoppingList=this.setActiveShoppingList.bind(this);
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
        this.addShoppingItem(newShoppingItem);


        // clean the fields
        this.setState({
                newItemText:"",
                changeItemCount:true
            })
        
    }


    addShoppingItem(newShoppingItem)
    {
      
        ShoppingItem.addShoppingItem(newShoppingItem)
          .then(result=>{
             newShoppingItem.shoppingItemId=result.id; // update the id
             // add the new item to the current shoppping list
             // sigal -to do....
             ShoppingList.addShoppingItemToList(this.state.activeShoppingList,newShoppingItem)
             .then(result=>{
                console.log(result);
                this.setState({
                    shoppingItemsArray:this.state.shoppingItemsArray.concat(newShoppingItem)
                    });
             })
             .catch(error=>{
                    console.error("error while adding New Shopping item to shopping list",error);
             })
             
          })
          .catch(error=>{
              console.error("error while creating New Shopping item",error);
          });
    }

    async getShoppingItemsParams(shoppingItem)
  {   
      
      ShoppingItem.getShoppingItemsParams(shoppingItem)
      .then(newItem=>{
          this.setState({
            shoppingItemsArray:this.state.shoppingItemsArray.concat(newItem)
          });
        })
      .catch(error=>{
          console.error("error while creating New Shopping item",error);
      });

  }

  async readShoppingItemList(){      
    ShoppingItem.readShoppingItemList()
      .then(shoppingListResults=>{
        shoppingListResults.forEach(              
          (item,index)=>
          {
            this.getShoppingItemsParams(item);
          }
      )

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
        filteredArray= this.state.shoppingItemsArray;  // currently no filter
        console.log (filteredArray);
        return filteredArray;
    }

    setActiveShoppingList(categoryName)
    {   const {activeGroup}=this.props;
        ShoppingGroup.GetShoppingListByCategoryAndGroup(categoryName,activeGroup)
        .then(theShoppingList=>{
           console.log(theShoppingList);
           // here we need to send the shopping items array insted of the filtered array
           this.setState({
            activeShoppingList:theShoppingList
           })
         })
         .catch(error=>{
             console.error("error while trying to get a shopping list",error);
         });

    }

   
    render() {
        const {newItemText}=this.state;
        const {categoryArray}=this.props;
        
        //list
       let filteredArray=this.filterOptions();
        let itemsLists=[];
        filteredArray.forEach((element,index) => {
            itemsLists.push(<ShoppingItemComponent item={element} key={index} OnCompletedTask={this.CompletedTaskHandler} ></ShoppingItemComponent>)
         }  );
          
  
        return (
          
            <Container>  
                <CategoryListComponents categoryArray={categoryArray} setActiveShoppingList={this.setActiveShoppingList}>
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
