import React, { Component } from 'react';
import { Button, Table, Card, CardHeader, Col, Row, InputGroup, InputGroupAddon, InputGroupText, Label, FormGroup, Input, Form, CardBody, imagePreview, CardFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import { formatDate, parseDate, } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


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
    }


    async componentDidMount() {
        const max_code = await booking_model.getBookingMaxCode()//province data
        var booking_code = 'BK' + max_code.data.booking_max
        this.setState({
            booking_code: booking_code
        })
    }

    handleDayChange(date) {
        this.setState({
            change_date: date
        });

    }

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        var arr = {};

        for (let name of data.keys()) {
            arr[name] = form.elements[name.toString()].value;
        }
        arr['booking_date'] = this.state.change_date
        arr['booking_code'] = this.state.booking_code
        // console.log("booking_code65465465465",this.state.booking_code);



        // console.log(this.check(arr))
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

            <div>

                <Row style={{ minWidth: '100%', backgroundColor: '#5a5a5a', height: '120px', justifyContent: 'center', alignItems: 'center' }}>
                    <label style={{ textAlign: 'center', color: 'white', fontSize: '30px' }}>จองโต๊ะ</label>
                </Row>
                <br />
                <br />
                <br />
                <Row>
                    <Col>
                        <Card>
                            <Form onSubmit={this.handleSubmit} id="myForm">
                                <CardBody>
                                    <Row>

                                        <Col lg="4">
                                            <FormGroup>
                                                <Label className="text_head"> วันที่จอง<font color='red'><b> * </b></font></Label>
                                                <DayPickerInput
                                                    format="DD/MM/YYYY"
                                                    formatDate={formatDate}
                                                    onDayChange={this.handleDayChange.bind(this)}
                                                    value={this.state.change_date}
                                                // inputProps = {{readOnly}}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col lg="4">
                                            <FormGroup>
                                                <Label className="text_head"> จำนวน <font color='red'><b> * </b></font></Label>
                                                <Input type="select" id="booking_amount" name="booking_amount" class="form-control" >
                                                    <option value="">Select</option>
                                                    <option value="1">1 ท่าน</option>
                                                    <option value="2">2 ท่าน</option>
                                                    <option value="3">3 ท่าน</option>
                                                    <option value="4">4 ท่าน</option>
                                                    <option value="5">5 ท่าน</option>
                                                    <option value="6">6 ท่าน</option>
                                                    <option value="7">7 ท่าน</option>
                                                    <option value="8">8 ท่าน</option>
                                                    <option value="9">9 ท่าน</option>
                                                    <option value="10">10 ท่าน</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row lg="12" style={{ marginBottom: "30px", paddingTop: '10px', alignItems: 'center' }}>
                                        <Col lg="4">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i class="fa fa-user-circle-o" aria-hidden="true"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" id="booking_firstname" name="booking_firstname" class="form-control" placeholder="firstname" />
                                            </InputGroup>
                                        </Col>
                                        <Col lg="4">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i class="fa fa-user-circle-o" aria-hidden="true"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" id="booking_lastname" name="booking_lastname" class="form-control" placeholder="lastname" />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row lg="12" style={{ marginBottom: "30px", paddingTop: '10px' }}>
                                        <Col lg="4">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i class="fa fa-phone" aria-hidden="true"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" id="booking_tel" name="booking_tel" class="form-control" placeholder="phone" />
                                            </InputGroup>
                                        </Col>
                                        <Col lg="4">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i class="fa fa-envelope" aria-hidden="true"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" id="booking_email" name="booking_email" class="form-control" placeholder="e-mail" />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                </CardBody>
                                <CardFooter>
                                    <Button type="submit" size="lg" color="success" name="button_save">Booking</Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row >
            </div >

        )
    }
}
export default (BookingView);