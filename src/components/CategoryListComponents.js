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
        this.setState({
            selectedTab: categoryArray?categoryArray[0]:""
        });
    }

    handleSelect= event =>{
        this.setState({
            selectedTab: event
        });
      }


    render() {
        const {categoryArray}=this.props;
        const {selectedTab}=this.state;
        
        let itemsLists=[];
        
        if (categoryArray && categoryArray.length>0)
        {
           
            categoryArray.forEach((element,index) => {
               
                itemsLists.push(
                <Tab className="vertical" eventKey={element.name} title={element.name} >
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
                <Tabs activeKey={selectedTab} onSelect={this.handleSelect}>
                    {itemsLists}
                </Tabs> 
            </div>
         
        )
    }
}
