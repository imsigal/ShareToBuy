import React, { Component } from 'react'
import {Tabs,Tab} from 'react-bootstrap';
import './CategoryListComponents.css';

export default class CategoryListComponents extends Component {
    constructor(props) {
        super(props);

        this.state={
            categoryArray:[],
        }   
    }


    render() {
        const {categoryArray,selectedCategoryItem}=this.props;
      
        let selected=selectedCategoryItem?selectedCategoryItem.name:""   // currently the first
        let itemsLists=[];
        
        if (categoryArray && categoryArray.length>0)
        {
           
            categoryArray.forEach((element,index) => {
               
                itemsLists.push(
                <Tab className="vertical" eventKey={element.name} title={element.name}>
                </Tab>)
            });
        }
        else
        {
            itemsLists.push(
                <Tab />);
        }

        return (           
            <div className="category-list-main">
                <Tabs activeKey={selected}>
                    {itemsLists}
                </Tabs> 
            </div>
         
        )
    }
}
