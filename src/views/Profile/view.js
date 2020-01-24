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
        this._changeName = this._changeName.bind(this);
        this._changeEmail = this._changeEmail.bind(this);
        this._changeTel = this._changeTel.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
    }



    async componentDidMount() {



        var customer_data = await localStorage.getItem('@customer_data')
        console.log("customer_data444444", customer_data);
        // var customer = await customer_model.getCustomerByEmail({"customer_email":customer_data.customer_email})
        this.setState({
            customer_data: JSON.parse(customer_data)

        })

        var show_customer = await customer_model.getCustomerByCusId({ 'customer_id': this.state.customer_data.customer_id })


        this.setState({
            show_customer: show_customer.data

        })
        console.log("show_customer", show_customer);


    }

    signOut(e) {
        e.preventDefault()
        localStorage.clear();
        // this.props.setUser([])
        saveStateLogout()

        this.props.history.push('/login_customer')
        //   this.componentDidMount()
    }

    async  _changeName() {
        var customer_name = document.getElementById('customer_name').value

        var data = {
            customer_name: customer_name,
            customer_id: this.state.customer_data.customer_id,

        }


        var update_name = await customer_model.ChangName(data)


    }
    async  _changeEmail() {


        var customer_email = document.getElementById('customer_email').value
        console.log(customer_email);
        var data = {
            customer_email: customer_email,
            customer_id: this.state.customer_data.customer_id,

        }


        var update_email = await customer_model.ChangeEmail(data)


    }

    async  _changeTel() {

        var customer_tel = document.getElementById('customer_tel').value
        console.log(customer_tel);
        var data = {
            customer_tel: customer_tel,
            customer_id: this.state.customer_data.customer_id,

        }


        var update_tel = await customer_model.ChangeTel(data)


    }

    renderProfile() {
        if (this.state.show_customer != undefined && this.state.show_customer != null) {
            var profile = []
            profile.push(
                <Col lg="12">
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Row >
                            <Col lg="12" md="12" sm="12" xs="12">
                                <label style={{ fontSize: '12pt' }}>ชื่อ</label>
                            </Col>
                        </Row>
                        <Row >
                            <Col lg="10" md="10" sm="10" xs="10">
                                <Input style={{ fontSize: '14pt', borderWidth: 0 }} type="text" name="customer_name" id="customer_name" defaultValue={this.state.show_customer.customer_name} />
                                {/* <label ></label> */}
                            </Col>
                            <Col lg="2" md="2" sm="2" xs="2">
                                <label style={{ fontSize: '14pt' }}><i style={{ color: '#28B463', fontSize: '25px' }} class="fa fa-pencil-square-o" aria-hidden="true" onClick={this._changeName.bind(this)} /></label>
                            </Col>

                        </Row>
                        <hr />
                    </Col>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Row >
                            <Col lg="12" md="12" sm="12" xs="12">
                                <label style={{ fontSize: '12pt' }}>อีเมล</label>
                            </Col>
                        </Row>
                        <Row >
                            <Col lg="10" md="10" sm="10" xs="10">
                                <Input style={{ fontSize: '14pt', borderWidth: 0 }} type="text" name="customer_email" id="customer_email" defaultValue={this.state.show_customer.customer_email} />
                            </Col>
                            <Col lg="2" md="2" sm="2" xs="2">
                                <label style={{ fontSize: '14pt' }}><i style={{ color: '#28B463', fontSize: '25px' }} class="fa fa-pencil-square-o" aria-hidden="true" onClick={this._changeEmail.bind(this)} /></label>
                            </Col>
                        </Row>
                        <hr />
                    </Col>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Row >
                            <Col lg="12" md="12" sm="12" xs="12">
                                <label style={{ fontSize: '12pt' }}>เบอร์</label>
                            </Col>
                        </Row>
                        <Row >
                            <Col lg="10" md="10" sm="10" xs="10">
                                <Input style={{ fontSize: '14pt', borderWidth: 0 }} type="text" name="customer_tel" id="customer_tel" defaultValue={this.state.show_customer.customer_tel} />
                            </Col>
                            <Col lg="2" md="2" sm="2" xs="2">
                                <label style={{ fontSize: '14pt' }}><i style={{ color: '#28B463', fontSize: '25px' }} class="fa fa-pencil-square-o" aria-hidden="true" onClick={this._changeTel.bind(this)} /></label>
                            </Col>
                        </Row>
                        <hr />
                    </Col>
                </Col>
            )
            return profile
        }
    }

    render() {

        return (

            <div>
                <Row>
                    <Col lg="4">


                    </Col>
                    <Col lg="4">
                        <Row style={{ textAlign: 'center', fontSize: '35pt', color: '#9A7B4F', paddingTop: '30px', paddingBottom: '30px', }}>
                            <Col lg="12">
                                <label>ข้อมูลส่วนตัว</label>
                            </Col>
                            {/* <Col lg="12" style={{paddingBottom:'30px',paddingTop:'30px'}}>
                                <img style={{width:'150px',height:'150px'}} src={this.state.customer_data.customer_image != "" && this.state.customer_data.customer_image != null ?  this.state.customer_data.customer_image : ImgDefault} className="img"></img>
                            </Col> */}
                        </Row>
                        <Row >
                            {this.renderProfile()}
                            <Col lg="12">
                                <Row >
                                    <Col lg="12" style={{ textAlign: 'center',paddingTop:'20px' }}>
                                        <Button size="lg" block color="success" onClick={e => this.signOut(e)}>ออกจากระบบ</Button>
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