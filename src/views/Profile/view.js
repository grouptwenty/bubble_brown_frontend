import React, { Component } from 'react';
import { Button, Table, Card, CardHeader, Col, Row, InputGroup, InputGroupAddon, InputGroupText, Label, FormGroup, Input, Form, CardBody, imagePreview, CardFooter, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import { formatDate, parseDate, } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import ImgDefault from '../../assets/img/img_default.png'
import { saveStateLogout } from '../../_helpers';
import CustomerModel from '../../models/CustomerModel'
const customer_model = new CustomerModel

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_data: {},
            refresh: false

        };

    }



    async componentDidMount() {



        var customer_data = await localStorage.getItem('@customer_data')
 console.log("customer_data", customer_data);
        // var customer = await customer_model.getCustomerByEmail({"customer_email":customer_data.customer_email})
        this.setState({
            customer_data: JSON.parse(customer_data)

        })



       
        // console.log("customer_data",this.state.customer_data.customer_email);

    }

    signOut(e) {
        e.preventDefault()
        localStorage.clear();
        // this.props.setUser([])
        saveStateLogout()
        this.props.history.push('/login_customer')
      }

    render() {

        return (

            <div>
                <Row>
                    <Col lg="4">


                    </Col>
                    <Col lg="4">
                        <Row style={{ textAlign: 'center', fontSize: '35pt', color:'#9A7B4F',paddingTop: '30px',paddingBottom:'30px', }}>
                            <Col lg="12">
                                <label>ข้อมูลส่วนตัว</label>
                            </Col>
                            {/* <Col lg="12" style={{paddingBottom:'30px',paddingTop:'30px'}}>
                                <img style={{width:'150px',height:'150px'}} src={this.state.customer_data.customer_image != "" && this.state.customer_data.customer_image != null ?  this.state.customer_data.customer_image : ImgDefault} className="img"></img>
                            </Col> */}
                        </Row>
                        <Row >
                            <Col lg="12" >
                                <Row >
                                    <Col lg="12">
                                        <label style={{fontSize:'12pt'}}>ชื่อ</label>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col lg="12">
                                        <label style={{fontSize:'14pt'}}>{this.state.customer_data.customer_name}</label>
                                    </Col>

                                </Row>
                                <hr/>
                            </Col>
                            <Col lg="12">
                                <Row >
                                    <Col lg="12">
                                        <label style={{fontSize:'12pt'}}>อีเมล</label>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col lg="12">
                                        <label style={{fontSize:'14pt'}}>{this.state.customer_data.customer_email}</label>
                                    </Col>

                                </Row>
                                <hr/>
                            </Col>
                            <Col lg="12">
                                <Row >
                                    <Col lg="12">
                                        <label style={{fontSize:'12pt'}}>เบอร์</label>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col lg="12">
                                        <label style={{fontSize:'14pt'}}>{this.state.customer_data.customer_tel}</label>
                                    </Col>

                                </Row>
                                <hr/>
                            </Col>
                            <Col lg="12">
                                <Row >
                                    <Col lg="12" style={{textAlign:'center'}}>
                                        <Button onClick={e => this.signOut(e)}>ออกจากระบบ</Button>
                                    </Col>
                                </Row>
                                
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="4">
                    </Col>
                </Row>
            </div >

        )
    }
}
export default (ProfileView);