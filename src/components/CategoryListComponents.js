import React, { Component } from 'react'
import {Tabs,Tab,Image} from 'react-bootstrap';
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
            // let imgUrl="";
            categoryArray.forEach((element,index) => {
                // if (element.imgFile)
                // {
                //     console.log(element);
                //     imgUrl=URL.createObjectURL(element.imgFile._url);//element.imgFile._url
                // }
                // else{
                //     imgUrl=""
                // }
                itemsLists.push(
                <Tab className="vertical" eventKey={element.name} title={element.name}>
                    {/* <Image src={imgUrl}/> */}
                    {/* <img border="0" alt={element.name} src={imgUrl} width="10" height="10"></img> */}
                </Tab>)
            });
        }
        else
        {
            itemsLists.push(
                <Tab ></Tab>);
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
