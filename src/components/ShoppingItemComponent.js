import React, { Component } from 'react';
import './ShoppingItemComponent.css';
import { Container } from 'react-bootstrap';
import imageDeleteSource from '../images/delete.png'
import imageAddSource from '../images/Add.png'

export default class ShoppingItemComponent extends Component {
    constructor(props) {
        super(props);
    
          this.state = {
            wasChanged:false,
            showDelete:true, 
        };

    }
  
        HandleDeleteItem=(index)=>{
            this.props.item.isCompleted=!this.props.item.isCompleted;
                this.setState({
                    wasChanged:true
                    });
        }

        HandlePropertiesItem=(index)=>{
            console.log ("HandleButtonItem ",index);
        }

        HandleMouseLeave=(event)=>{
            
            this.setState({showDelete:false})
        }
        handleMouseEnter=(event)=>{
           
            this.setState({showDelete:true})
        }

        render()
        {
            const { item } = this.props;
            let completedClass = "";
            if (item.isCompleted) {
                completedClass = "linethrough-text";
            }
            else {
                completedClass = "regular-text";
            }

            let deleteButtonClass=this.state.showDelete===true?"side-left":"hidden"
            let itemText=item.count + ' '+ item.name
            return (
            <Container className="main-shopping-item" onMouseOver={this.handleMouseEnter} onMouseLeave={this.HandleMouseLeave}  >
                <p>
                <label className={completedClass} onClick={this.HandleDeleteItem.bind(this, item.id)}>
                    {itemText}                
                </label>
                <button className={deleteButtonClass} onClick={this.HandlePropertiesItem.bind(this, item.id)} >
                        <img src={imageAddSource} alt="Add" />
                    </button> 
                </p>
            </Container>
           
            );
        }
    
}
