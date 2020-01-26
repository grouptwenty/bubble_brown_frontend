import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Nav, Card, NavLink, Col, Row, InputGroup, InputGroupAddon, InputGroupText, Label, FormGroup, Input, Form, CardBody, imagePreview, CardFooter } from 'reactstrap';
import { connect } from 'react-redux';
// import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import { formatDate, parseDate, } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
import BackGroung from './3061714.jpg';



import BookingModel from '../../models/BookingModel'
import AboutModel from '../../models/AboutModel'

var about_model = new AboutModel;
const booking_model = new BookingModel

class HistoryBookView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            about_data: [],
            book_customer: [],
            refresh: false

        };

        this.renderBranch = this.renderBranch.bind(this);
        this.renderBookBy = this.renderBookBy.bind(this);
    }


    async componentDidMount() {
        var customer_data = await localStorage.getItem('@customer_data')
        var about_data = await about_model.getAboutBy()


        this.setState({
            about_data: about_data.data,
            customer_data: JSON.parse(customer_data)
        })
        console.log("about_data", about_data);
        if (this.state.customer_data != undefined && this.state.customer_data != null) {
            var book_customer = await booking_model.getBookingByCustomer({ 'customer_code': this.state.customer_data.customer_code, 'about_code': 'EP0001' })
            this.setState({
                book_customer: book_customer.data,
            })
            console.log(book_customer);
        }

    }



    renderBranch() {
        var about = []
        for (var key in this.state.about_data) {
            // console.log(key);     
            about.push(
                <Row>
                    <Col lg="12" md="12" sm="12" xs="12" style={{ paddingRight: '0', paddingLeft: '0', paddingTop: '1px', borderWidth: 0 }} >
                        <ListGroupItem
                            onClick={this.renderBookByAbout.bind(this, this.state.about_data[key].about_code)}
                            style={{ borderWidth: 0, textAlign: 'center' }} action>
                            <label style={{ fontSize: '13pt' }}> {this.state.about_data[key].about_name_th}</label></ListGroupItem>
                    </Col>

                </Row>

            )

        } return about
    }

    renderBookBy() {

        var book = []
        for (var key in this.state.book_customer) {
            book.push(
                <div style={{ padding: '15px' }}>
                    <Col lg="12">
                        <label style={{ fontSize: '15pt' }} >สาขา {this.state.book_customer[key].about_name_th}</label>
                    </Col>
                    <Col lg="12" style={{ paddingTop: '20px' }}>
                        <label style={{ fontSize: '12pt', color: '#E74C3C', fontWeight: 'bold' }}>หมายเลขการจอง : {this.state.book_customer[key].booking_code}</label>
                    </Col>
                    <Col lg="12" style={{ paddingTop: '10px' }}>
                        <label style={{ fontSize: '12pt', color: '#797D7F' }}>คุณ {this.state.book_customer[key].booking_firstname} {this.state.book_customer[key].booking_lastname}</label>
                    </Col>
                    <Col lg="12" style={{ paddingTop: '10px' }}>
                        <label style={{ fontSize: '12pt', color: '#797D7F' }}>วันที่จอง  {this.state.book_customer[key].booking_date}</label>
                    </Col>
                    <Col lg="12" style={{ paddingTop: '10px' }}>
                        <label style={{ fontSize: '12pt', color: '#797D7F' }}>เวลาจอง  {this.state.book_customer[key].booking_time}</label>
                    </Col>
                    <Col lg="12" style={{ paddingTop: '10px' }}>
                        <label style={{ fontSize: '12pt', color: '#797D7F' }}>สำรองที่นั่ง  {this.state.book_customer[key].booking_amount} ท่าน</label>
                    </Col>

                </div>
            )

        } return book
    }

    async renderBookByAbout(code) {
        console.log(code);
    
            var customer_code = this.state.customer_data.customer_code
            console.log(customer_code);
            var book_customer = await booking_model.getBookingByCustomer({ 'about_code': code, 'customer_code': customer_code })
            this.setState({
                book_customer: book_customer.data,
            })
            console.log(book_customer);
        
    }



    render() {


        return (

            <div >

                <section class="cd-section cd-section--bg-fixed" style={{ backgroundImage: `url(${BackGroung})`, }}>
                    <br />
                    <br />
                    <Row className="book-col" >
                        <Col lg="12" sm="12" xs="12" style={{ borderWidth: 0, paddingLeft: '20px', paddingRight: '20px' }}>
                            <Card style={{ borderWidth: 0, }}>
                                <Form onSubmit={this.handleSubmit} id="myForm">
                                    <CardBody>
                                        <br />
                                        <Row style={{ minWidth: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <label style={{ textAlign: 'center', fontSize: '30px', borderBottomColor: 'orange', borderBottomStyle: 'solid' }}>การจองโต๊ะ</label>
                                        </Row>
                                        <hr />

                                        <Row style={{ height: '50vh' }}>
                                            <Col lg="3" md="3" sm="2" xs="2" style={{ borderRightColor: '#F2F3F4', borderRightStyle: 'double', borderRightWidth: '1px' }}>
                                                {this.renderBranch()}
                                            </Col>
                                            <Col lg="9" md="9" sm="10" xs="10" >
                                                <Row >
                                                    {this.renderBookBy()}
                                                </Row>
                                            </Col>
                                        </Row>
                                        <br />

                                    </CardBody>

                                </Form>
                            </Card>
                        </Col>
                    </Row >
                </section>
            </div >

        )
    }
}
export default (HistoryBookView);