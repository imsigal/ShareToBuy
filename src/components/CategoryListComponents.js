import React, { Component } from 'react'
import {Tabs,Tab} from 'react-bootstrap';
import './CategoryListComponents.css';

export default class CategoryListComponents extends Component {
    constructor(props) {
        super(props);

        this.state={
            categoryArray:[],
            selectedTab:""
        }   
    }
    componentDidMount(){
        const {categoryArray}=this.state
        if (categoryArray && categoryArray.length>0)
        {
            this.setState({
                selectedTab:categoryArray[0].name
            });
            this.props.setActiveShoppingList(categoryArray[0].name);
        }
        else
        {
            this.setState({
                selectedTab: ""
            }); 
        }

    }

    handleSelect= event =>{
        this.setState({
            selectedTab: event
        });
        this.props.setActiveShoppingList(event); // send the selected category to get its matchd shopping list
      }


    render() {
        const {categoryArray}=this.props;
        const {selectedTab}=this.state;
        
        let itemsLists=[];
        
        if (categoryArray && categoryArray.length>0)
        {
           
            categoryArray.forEach((element,index) => {
               
                itemsLists.push(
                <Tab className="vertical" eventKey={element.name} title={element.name} key={index} >
                </Tab>)
            });

        }
        // else
        // {
        //     itemsLists.push(
        //         <Tab />);
        // }

        return (           
            <div className="category-list-main">
                <Tabs activeKey={selectedTab} onSelect={this.handleSelect}>
                    {itemsLists}
                </Tabs> 
            </div>
         
        )
    }
}
