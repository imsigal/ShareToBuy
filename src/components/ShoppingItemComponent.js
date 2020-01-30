import React, { Component } from 'react';
import './ShoppingItemComponent.css';
import { Container ,Popover,OverlayTrigger,Image,Form,Row,Col} from 'react-bootstrap';
import imageAddSource from '../images/Add.png'

export default class ShoppingItemComponent extends Component {
    constructor(props) {
        super(props);
    
          this.state = {
            wasChanged:false,
            showChangeItemIcon:false, 
            fileImg: {
                file: undefined,
                URL:undefined
            }
        };

    }

    componentDidMount()
    { const {item}=this.props;
        if (item.imgFile)
        {
            console.log(item);
            this.setState({
                fileImg:{
                    file: item.imgFile,
                    URL:URL.createObjectURL(item.imgFile.URL.createObjectURL)
                }
            })
        }
        
    }

    /******************************************** */
    //Popover functions
    HandleClosePopup=(event)=>{
        this.refs.overlay.handleHide();
    
    }
    HandleOkPopup=(event)=>{
        console.log ("HandleOkPopup ",event.target);
        this.refs.overlay.handleHide();
        
    }

    HandlePropertiesItem=(event)=>{
        if (this.state.showUpdateProperties===true)
        {
            return;
        }
    }

    handleFileChange=(event)=> {
        let newFileImg;
        if (event.target.files[0]) {
            newFileImg = {
                file: event.target.files[0],
                URL: URL.createObjectURL(event.target.files[0])
            }
        } else {
            newFileImg = {
                file: undefined,
                URL: undefined
            }
        }
            this.setState({fileImg: newFileImg});        
        }

    /******************************************** */
    //component functions
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
            const {fileImg}=this.state;
            let completedClass = "";
            if (item.isCompleted) {
                completedClass = "linethrough-text";
            }
            else {
                completedClass = "regular-text";
            }
            let itemText=item.count + ' '+ item.name;
           
            const popover = 
            (
                <Popover id="popover-basic" >
                  <Popover.Title as="h3">{item.name} : עדכון    
                        <button onClick={this.HandleClosePopup}>X</button>
                  </Popover.Title>
                  <Popover.Content>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>כמות</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" placeholder={item.count} min="1"  />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תמונה</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control type="file" onChange={this.handleFileChange} />
                                </Col>
                                <Col>
                                    <Image src={fileImg.URL} fluid/>
                                </Col>

                            </Row>
                        </Form.Group>

                        <button onClick={this.HandleOkPopup}>שנה</button>
                        <button onClick={this.HandleClosePopup}>סגור</button>
                  </Popover.Content>
          
                </Popover>
              );

            let deleteButtonClass=this.state.showChangeItemIcon===true?"side-left":"hidden"
           
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
