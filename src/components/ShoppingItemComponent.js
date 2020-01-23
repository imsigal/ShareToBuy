import React, { Component } from 'react';
import './ShoppingItemComponent.css';
import { Container } from 'react-bootstrap';
import imageSource from '../images/delete.png'

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

            let deleteButtonClass=this.state.showDelete===true?"side-right":"hidden"
            return (
            <Container className="main-shopping-item" onMouseOver={this.handleMouseEnter} onMouseLeave={this.HandleMouseLeave}  >
                <label className={completedClass}>
                    {item.description}
                    <button className={deleteButtonClass} onClick={this.HandleDeleteItem.bind(this, item.id)}>
                        <img src={imageSource} alt="delete" />
                    </button> 
                </label>
            </Container>
           
            );
        }
    
}
