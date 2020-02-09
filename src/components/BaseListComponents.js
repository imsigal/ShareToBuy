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
            changeItemCount:false,
            shoppingItemsArray:[],
            activeShoppingList:null,
           
        }
        this.getShoppingItemsParams=this.getShoppingItemsParams.bind(this);
      this.addShoppingItem=this.addShoppingItem.bind(this);
      this.setActiveCategoryAndShoppingList=this.setActiveCategoryAndShoppingList.bind(this);
    }


    componentDidUpdate(prevProps) {   
         if (this.props.categoryActive !== prevProps.categoryActive) {
            // clear the list
            this.setState({
            shoppingItemsArray:[]
            })
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
        this.addShoppingItem(newShoppingItem);

        // clean the fields
        this.setState({
                newItemText:"",
                changeItemCount:true
            })
        
    }


    async addShoppingItem(newShoppingItem)
    {
       const {activeShoppingList}=this.state;
       const {activeGroup,categoryActive} =this.props;
        // if there is no shopping list , create one
       if (!activeShoppingList)
       {
            // active category is a string, must turn it to object..s
           activeGroup.CreateNewShoppingListinGroup(categoryActive)  
           .then(result=>{        
               this.ClearCategoryDialog();
               console.log ("addShoppingItem: ",categoryActive);
               this.props.handleCategoryClose(true,categoryActive);
           }) 
           .catch(error=>{
               console.error('Error while creating new shopping List: ', error);
               this.setState({
                       errorMessage:"Error in connection to db"
               })                     
           })

       }

       // create shopping item
        ShoppingItem.addShoppingItem(newShoppingItem)
          .then(result=>{
             newShoppingItem.shoppingItemId=result.id; // update the id          
            // add the item to the current shopping list
            ShoppingList.addShoppingItemToList(activeShoppingList, newShoppingItem)
             .then(result=>{
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

    //actions to do when a task is completed
    CompletedTaskHandler=(count)=>{
        this.setState({
            changeItemCount:true
        });
        
    }

 
    async setActiveCategoryAndShoppingList(categoryName)
    {   
        const {activeGroup}=this.props;
        // clean the list
        this.setState({
            shoppingItemsArray:[],
            });

            //set Category
            this.props.setNewActiveCategory(categoryName);

         // get the shopping list according to the active group and the selected category     
         activeGroup.GetShoppingListByCategoryAndGroup(categoryName)
        .then(theShoppingList=>{
           // update the active shopping list
           this.setState({
            activeShoppingList:theShoppingList
           })
           // update the list itself
           if (theShoppingList)
           {
                ShoppingList.GetShoppingItemsByList(theShoppingList).then(shoppingItems=>{
                    if (shoppingItems.length>0)
                    {
                            shoppingItems.forEach(item=>{
                                this.getShoppingItemsParams(item);
                            });
                        }  
                })
            }
         })
        
         .catch(error=>{
             console.error("error while trying to get a shopping list",error);
         });

    }

   
    render() {
        const {newItemText,shoppingItemsArray}=this.state;
        const {categoryArray,categoryActive}=this.props;
        
        //list
        let itemsLists=[];
        shoppingItemsArray.forEach((element,index) => {
            itemsLists.push(<ShoppingItemComponent item={element} key={index} OnCompletedTask={this.CompletedTaskHandler} ></ShoppingItemComponent>)
         }  );

        const isDisablesInput=categoryActive && categoryActive!==""?false:true
          
  
        return (
          
            <Container>  
                <CategoryListComponents categoryArray={categoryArray} categoryActive={categoryActive} setActiveCategoryAndShoppingList={this.setActiveCategoryAndShoppingList}>
                </CategoryListComponents>
                <div className="main-base-list">
                <ListGroup>
                    {itemsLists}
                </ListGroup>
              
                 <InputGroup className="mb-3" size="lg" >
                    <FormControl className="input"
                        placeholder="הוסף פריט"
                        aria-label="הוסף פריט"
                        aria-describedby="basic-addon2"
                        value={newItemText} 
                         onChange={this.handleInputChange}
                         onKeyDown={this.handleKeyDownEvent}
                         disabled={isDisablesInput }
                    />
                    <InputGroup.Append>
                        <Button variant="info"  onClick={this.HandleNewItem} disabled={isDisablesInput }>הוסף</Button>
                       
                    </InputGroup.Append>
                </InputGroup>
                </div>
            </Container>
        )
    }
}
