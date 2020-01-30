import React, { Component } from 'react';
import './ShoppingItemComponent.css';
import { Container ,Popover,OverlayTrigger} from 'react-bootstrap';
import imageAddSource from '../images/Add.png'

export default class ShoppingItemComponent extends Component {
    constructor(props) {
        super(props);
    
          this.state = {
            wasChanged:false,
            showChangeItemIcon:false, 
        };

    }
        HandleClosePopup=(event)=>{
            this.refs.overlay.handleHide();
        
        }

     

        HandlePropertiesItem=(event)=>{
            if (this.state.showUpdateProperties===true)
            {
                return;
            }
            console.log ("HandleButtonItem ",event.target);
        }

        HandleDeleteItem=(index)=>{
            this.props.item.isCompleted=!this.props.item.isCompleted;
                this.setState({
                    wasChanged:true,
                    });
        }

      
        HandleMouseLeave=(event)=>{
            
            this.setState({showChangeItemIcon:false})
        }
        handleMouseEnter=(event)=>{
           
            this.setState({showChangeItemIcon:true})
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

            const popover = 
            (
                <Popover id="popover-basic" >
                  <Popover.Title as="h3">עדכון פריט
                        <button onClick={this.HandleClosePopup}>X</button>
                  </Popover.Title>
                  <Popover.Content>
                    <button>Add image</button>
                    <button>count</button>
                    <button onClick={this.HandleClosePopup}>close</button>
                  </Popover.Content>
          
                </Popover>
              );

            let deleteButtonClass=this.state.showChangeItemIcon===true?"side-left":"hidden"
            let itemText=item.count + ' '+ item.name
            return (
            <Container className="main-shopping-item" onMouseOver={this.handleMouseEnter} onMouseLeave={this.HandleMouseLeave}  >
                <p>
                <label className={completedClass} onClick={this.HandleDeleteItem.bind(this, item.id)}>
                    {itemText}                
                </label>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose ref="overlay">
                    <button className={deleteButtonClass} onClick={this.HandlePropertiesItem} >
                        <img src={imageAddSource} alt="Add" />
                    </button> 
                </OverlayTrigger>
                </p>

            </Container>
           
            );
        }
    
}
