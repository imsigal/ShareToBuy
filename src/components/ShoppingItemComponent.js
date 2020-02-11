import React, { Component } from 'react';
import './ShoppingItemComponent.css';
import { Container ,Popover,OverlayTrigger,Image,Form,Row,Col} from 'react-bootstrap';
import imageAddSource from '../images/Add.png'
import closeImage from '../images/delete.png'

export default class ShoppingItemComponent extends Component {
    constructor(props) {
        super(props);
    
          this.state = {
            wasChanged:false,
            showChangeItemIcon:false, 
            fileImg: {
                file: undefined,
                URL:undefined
            },
            newCount:0,
            showImagetooltip:false
            
        };
        this.HandleOkPopup=this.HandleOkPopup.bind(this);
    }

    componentDidMount()
    {   
        const {item}=this.props;
        this.setState({
            newCount:item.count,
        })
        if (item.imgFile)
        {
            this.setState({
                fileImg:{
                    file: item.imgFile,
                    URL:URL.createObjectURL(item.imgFile.URL.createObjectURL)
                }
            })
        }
        
    }

    /******************************************** */
    //Popover functions=
    enterEditingItem=(event)=>{
        const {item}=this.props;
        this.setState({
            newCount:item.count,
        })
        if (item.imgFile)
        {
            this.setState({
                fileImg:{
                    file: item.imgFile,
                    URL:URL.createObjectURL(item.imgFile.URL.createObjectURL)
                }
            })
        }

    }

    HandleClosePopup=(event)=>{
        this.refs.overlay.handleHide();
    
    }
   async HandleOkPopup(event)
   {
        const {fileImg,newCount}=this.state;
        const{item}=this.props;
        this.setState({
            wasChanged:false,
            });

        if (item.count!==newCount)
        {
            item.UpdateShoppingItemCount(newCount).then(result=>{
                    item.count=newCount;
                    this.setState({
                        wasChanged:true,
                        });
                })
                .catch(error => {
                    console.error("error while updating Shopping item",error);
                });
               

        }
        if (item.fileImg!==fileImg.file)
        {
            item.UpdateShoppingItemImage(fileImg.file).then(result=>{
                item.img=fileImg.file;
                this.setState({
                    wasChanged:true,
                    });
                })
                .catch(error => {
                console.error("error while updating Shopping item",error);
                    
            });
           

        }

        this.refs.overlay.handleHide();
        
    }

    HandlePropertiesItem=(event)=>{
        if (this.state.showUpdateProperties===true)
        {
            return;
        }
    }
    handleCountChange=(event)=>{
        this.setState({
            newCount:event.target.valueAsNumber
        })

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
            this.setState({
                showChangeItemIcon:false,
                })
        }

        handleMouseEnter=(event)=>{
           
            this.setState({
                showChangeItemIcon:true,
                })
        }

        handleShowImage=()=>
        {
            this.setState({
                showImagetooltip:true
                })
        }
        handleHideImage=()=>
        {
            this.setState({
                showImagetooltip:false
                })
        }


        render()
        {
            const { item } = this.props;
            const {fileImg,showImagetooltip}=this.state;
 
            let completedClass = "";
            if (item.isCompleted) {
                completedClass = "linethrough-text";
            }
            else {
                completedClass = "regular-text";
            }
            let itemText=item.count + ' '+ item.name;

            const tooltipImage =item.img && showImagetooltip?
              <Popover >
                    <Popover.Title as="h3">
                        <button onClick={this.handleHideImage}>
                            <img src={closeImage} ></img>
                        </button>
                    </Popover.Title>
                    <Popover.Content> 
                        <img className="big-preview" src={item.img._url}></img>  
                    </Popover.Content>
                </Popover>
                :"";

            const itemImagepreview=item.img ?
            <Image className="preview" src={item.img._url}  onClick={this.handleShowImage} thumbnail />:<Image  />

            // for update item
            const popover = 
            (
                <Popover id="popover-basic" >
                  <Popover.Title as="h3">{item.name} : עדכון    
                        <button className="light-button" onClick={this.HandleClosePopup}>X</button>
                  </Popover.Title>
                  <Popover.Content>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>כמות</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" placeholder={item.count} min="1" onChange={this.handleCountChange} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תמונה</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control type="file" onChange={this.handleFileChange} />
                                </Col>
                            </Row> 
                            <Row>
                                <Col>
                                    <Image src={fileImg.URL} fluid/>
                                </Col>
                            </Row>

                        </Form.Group>

                        <button className="dark-button" variant="info" onClick={this.HandleOkPopup}>שנה</button>
                        <button className="dark-button" onClick={this.HandleClosePopup}>סגור</button>
                  </Popover.Content>
          
                </Popover>
              );

            let deleteButtonClass=this.state.showChangeItemIcon===true?"side-left":"hidden"
            
            return (
            <Container className="main-shopping-item" onMouseOver={this.handleMouseEnter} onMouseLeave={this.HandleMouseLeave}  >
                <p>
                <Row>
                    <Col  xs={2} >
                        {itemImagepreview}                 
                    </Col>
                        <label className={completedClass} onClick={this.HandleDeleteItem.bind(this, item.id)} tooltip={item.id}>
                        {itemText}                
                        </label>
                    {tooltipImage}
                    <OverlayTrigger trigger="click" onEnter={this.enterEditingItem} placement="bottom" overlay={popover} rootClose ref="overlay">
                        <button className={deleteButtonClass} onClick={this.HandlePropertiesItem} >
                            <img src={imageAddSource} alt="Add" />
                        </button> 
                    </OverlayTrigger>
                </Row>
                </p>
            </Container>
           
            );
        }
    
}
