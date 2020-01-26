import React, { Component } from 'react'
import {Tabs,Tab} from 'react-bootstrap';
import Category from '../model/Category';
import './CategoryListComponents.css';


export default class CategoryListComponents extends Component {
    constructor(props) {
        super(props);

        this.tempCategoryList=[];
        // this.tempCategoryList.push(new Category( "super",undefined));
        // this.tempCategoryList.push(new Category("pharm",undefined));
        this.state={
            categoryArray:this.tempCategoryList
        }

    }


 
    
    render() {
        const {categoryArray}=this.state;
        let defaultItem=categoryArray[0];
        let itemsLists=[];
        categoryArray.forEach((element,index) => {
            itemsLists.push(
             <Tab className="vertical" eventKey={element.name} title={element.name}>
            </Tab>)
         }  );
        return (
            
            <div>
                <Tabs defaultActiveKey={defaultItem}>
                    {itemsLists}
                </Tabs>

              
            </div>
            
               
        )
    }
}
