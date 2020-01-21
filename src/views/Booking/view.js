import React, { Component } from 'react';
import { Button, Table, Card, CardHeader, Col, Row, InputGroup, InputGroupAddon, InputGroupText, Label, FormGroup, Input, Form, CardBody, imagePreview, CardFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import { formatDate, parseDate, } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
import BackGroung from './3061714.jpg';



import BookingModel from '../../models/BookingModel'
const booking_model = new BookingModel
var today = new Date();
class BookingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            menutype_list: [],
            change_date: today,
            refresh: false

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.search = this.search.bind(this);
    }


    async componentDidMount() {

    }

    handleDayChange(date) {
        this.setState({
            change_date: date
        });

    }

    search(table_code, myArray) {
        var check = false;
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].table_code === table_code) {
                check = true;
            }
        }
        return check;
    }
    async handleSubmit(event) {

        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        var amount = document.getElementById('booking_amount').value
        var book = {
            table_amount: amount,
            booking_date: this.state.change_date
        }
        var checkbook = await booking_model.checkBook(book)
        var checktable = await booking_model.checkTable(book)
        console.log("checkbook", checkbook);
        console.log("checktable", checktable);
        var table_code = ''
        if (checktable.data.length > checkbook.data.length) {
            for (let i in checktable.data) {
                var res = this.search(checktable.data[i].table_code, checkbook.data)
                console.log("res", res);

                if (res == false) {
                    table_code = checktable.data[i].table_code
                    break;
                }
            }




            var arr = {};

            for (let name of data.keys()) {
                arr[name] = form.elements[name.toString()].value;
            }

            var datestart = moment(this.state.change_date).format("MMM Do YY");
            var datenow = moment().fromNow();

            var now = moment(new Date()); //todays date
            var end = moment(this.state.change_date); // another date
            var duration = moment.duration(now.diff(end));
            var days = Math.floor(duration.asDays());

            // console.log("datestart", datestart);
            // console.log("datenow", datenow);

            if (days <= 0) {
                arr['booking_date'] = this.state.change_date
            } else {
                swal({
                    title: "กรุณาใส่วันที่ให้ถูกต้อง",
                    icon: "warning",
                    button: "Close",
                });
            }


            const max_code = await booking_model.getBookingMaxCode()//province data
            var booking_code = 'BK' + max_code.data.booking_max

            arr['booking_code'] = booking_code
            arr['table_code'] = table_code
            console.log(this.check(arr))
            if (this.check(arr)) {
                var res = await booking_model.insertBooking(arr);
                //   console.log(res)
                if (res.data) {
                    swal({
                        title: "Booking Complete!",
                        text: "Good job",
                        icon: "success",
                        button: "Close",
                    });
                    this.props.history.push('/booking/')
                }
            }
        } else {
            swal({
                title: "วันที่ท่านจองไม่มีโต๊ะว่าง !!",
                icon: "warning",
                button: "Close",
            });
        }
    }

    check(form) {
        console.log("form", form);

        if (form.booking_date == '') {
            swal({
                text: "กรุณาเลือก วันที่จอง",
                icon: "warning",
                button: "close",
            });
            return false
        } else if (form.booking_amount == '') {
            swal({
                text: "กรุณากรอก จำนวน",
                icon: "warning",
                button: "close",
            });
            return false
        } else if (form.booking_firstname == '') {
            swal({
                text: "กรุณากรอก ชื่อ",
                icon: "warning",
                button: "close",
            });
            return false
        } else if (form.booking_lastname == '') {
            swal({
                text: "กรุณากรอก นามสกุล",
                icon: "warning",
                button: "close",
            });
            return false
        } else if (form.booking_tel == '') {
            swal({
                text: "กรุณากรอก เบอร์โทรศัพท์",
                icon: "warning",
                button: "close",
            });
            return false

        } else if (form.booking_email == '') {
            swal({
                text: "กรุณากรอก อีเมล",
                icon: "warning",
                button: "close",
            });
            return false
        } else {
            return true
        }

    }

    render() {


        return (

            <div className="vc" ref="iScroll" style={{ height: "100%", verflow: "auto", }}>

                <section class="cd-section cd-section--bg-fixed" style={{ backgroundImage: `url(${BackGroung})`, }}>


                    <br />
                    <br />
                    <br />
                    <Row className="book-col">
                        <Col lg="12" sm="12" xs="12" style={{ borderWidth: 0, paddingLeft: '20px', paddingRight: '20px' }}>
                            <Card style={{ borderWidth: 0, }}>
                                <Form onSubmit={this.handleSubmit} id="myForm">
                                    <CardBody>
                                        <br />
                                        <Row style={{ minWidth: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <label style={{ textAlign: 'center', fontSize: '30px' }}>จองโต๊ะ</label>
                                        </Row>
                                        <hr />
                                        <br />
                                        <br />
                                        <Row>
                                            <Col lg="6" sm="12" xs="12">
                                                <FormGroup>
                                                    <Label className="text_head"> วันที่จอง<font color='red'><b> * </b></font></Label>
                                                    <DayPickerInput
                                                        format="YYYY-MM-DD"
                                                        formatDate={formatDate}
                                                        onDayChange={this.handleDayChange.bind(this)}
                                                        value={this.state.change_date}
                                                    // inputProps = {{readOnly}}
                                                    />
                                                </FormGroup>
                                            </Col>
                                           
                                            <Col lg="6"  sm="12" xs="12">
                                                <FormGroup>
                                                    <Label className="text_head"> จำนวนคน <font color='red'><b> * </b></font></Label>
                                                    <Input type="number" step='2' id="booking_amount" name="booking_amount" class="form-control" min='0' max='10' >

                                                    </Input>
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <br />
                                        <Row lg="12" style={{ marginBottom: "30px", paddingTop: '10px', alignItems: 'center' }}>
                                            <Col lg="6"  sm="12" xs="12">
                                                <FormGroup>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText><i class="fa fa-user-circle-o" aria-hidden="true"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" id="booking_firstname" name="booking_firstname" class="form-control" placeholder="firstname" />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6"  sm="12" xs="12">
                                                <FormGroup>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText><i class="fa fa-user-circle-o" aria-hidden="true"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" id="booking_lastname" name="booking_lastname" class="form-control" placeholder="lastname" />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row lg="12" style={{ marginBottom: "30px", paddingTop: '10px' }}>
                                            <Col lg="6"  sm="12" xs="12">
                                                <FormGroup>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText><i class="fa fa-phone" aria-hidden="true"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" id="booking_tel" name="booking_tel" class="form-control" placeholder="phone" />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6" sm="12" xs="12">
                                                <FormGroup>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText><i class="fa fa-envelope" aria-hidden="true"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" id="booking_email" name="booking_email" class="form-control" placeholder="e-mail" />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12" sm="12" xs="12" md="12">
                                                <Button style={{ width: '100%' }} type="submit" color="success" name="button_save">จองโต๊ะ</Button>
                                            </Col>
                                        </Row>
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
export default (BookingView);