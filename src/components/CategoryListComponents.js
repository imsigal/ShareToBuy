import React, { Component } from 'react'
import {Tabs,Tab} from 'react-bootstrap';
import Category from '../model/Category';
import './CategoryListComponents.css';
import Parse from 'parse';

export default class CategoryListComponents extends Component {
    constructor(props) {
        super(props);

        this.state={
            categoryArray:[],
            selectedCategoryItem:null
        }
        this.readCategoryList=this.readCategoryList.bind(this);
    }

    componentDidMount()
    {
        this.readCategoryList();
    }
     
    async readCategoryList(){
        const ParseCategory = Parse.Object.extend('Category');
        const query = new Parse.Query(ParseCategory);
        query.find().then(results => {         
            let lstItems=[];
                results.forEach(
                    item=>lstItems.push(new Category(item))
                )
                let selected=lstItems.length>0?lstItems[0]:null
                this.setState({
                    categoryArray:lstItems,
                    selectedItem:selected
                });
          });
    }

    render() {
        const {categoryArray,selectedItem}=this.state;
      
        let selected=selectedItem?selectedItem.name:""
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
                <Tab ></Tab>);
        }
        
        return (           
            <div class="category-list-main">
                <Tabs defaultActiveKey={selected}>
                    {itemsLists}
                </Tabs> 
            </div>
         
        )
    }
}
