import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Background from './back2.jpg';
// import EntrepreneurModel from '../../models/EntrepreneurModel'
import { verify } from 'crypto';

// const entrepreneur_model = new EntrepreneurModel

// var md5 = require("md5");
class SpecificationsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verify: [],
            data: [],
            fireRedirect: false
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        // const email = this.props.match.params.email
        // const verify = await entrepreneur_model.ForgotPasswordEntrepreneurBy(email)
        // console.log("verify:", verify);

        // this.setState({
        //     verify: verify.data
        // })
    }

    // async handleSubmit(event) {
    //     event.preventDefault();
    //     const form = event.target;
    //     const data = new FormData(form);

    //     var arr = {};

    //     for (let name of data.keys()) {
    //         arr[name] = form.elements[name.toString()].value;
    //     }
    //     arr['entrepreneur_code'] = this.state.verify.entrepreneur_code

    //     if (this.check(arr)) {
    //         var res = await entrepreneur_model.updateForPasswordBy(arr);
    //         console.log(res)
    //         if (res.data) {
    //             swal({
    //                 title: "Good job!",
    //                 text: "update password complete",
    //                 icon: "success",
    //                 button: "Close",
    //             });
    //             this.props.history.push('/verify/')
    //         }
    //     }
    // }

    //     check(form) {
    // console.log(form);

    //         if (form.entrepreneur_password !== form.Confirm_Password) {
    //             swal({
    //                 title: "Confirm Password",
    //                 text: "ยืนยันรหัสผ่านไม่ถูกต้อง กรุณายืนยันรหัสผ่านใหม่อีกครั้ง",
    //                 icon: "warning",
    //                 button: "close",
    //             });
    //             return false
    //         } else if (form.entrepreneur_password == '') {
    //             swal({
    //                 title: "Confirm Password",
    //                 text: "กรุณากรอก รหัสผ่าน",
    //                 icon: "warning",
    //                 button: "close",
    //             });
    //             return false
    //         } else if (form.Confirm_Password == '') {
    //             swal({
    //                 title: "Confirm Password",
    //                 text: "กรุณากรอก ยืนยันรหัสผ่าน",
    //                 icon: "warning",
    //                 button: "close",
    //             });
    //             return false

    //         } else {
    //             return true
    //         }

    //     }


    render() {


        return (

            // <Form onSubmit={this.handleSubmit} id="myForm">
            // <div className="app flex-row align-items-center background-login" style={{ backgroundImage: `url(${Background})` }}>
            <Container>
                {/* <div className="b-head">
                    <h1 >IOT WASHING MACHINE</h1>
                </div> */}
                <Row className="justify-content-center">
                    <Col md="6">
                        <CardGroup>
                            <Card className="p-4 card_login">
                                <CardBody>
                                    <a>ข้อกำหนดในการใช้บริการ</a>
                                    <h3>ราไม่เก็บค่าบริการเมื่อคุณใช้ Facebook หรือผลิตภัณฑ์และบริการอื่นๆ ที่อยู่ภายใต้ข้อกำหนดเหล่านี้ แต่ธุรกิจและองค์กรต่างๆ </h3>
                                    <h3>จะจ่ายเงินให้เราเพื่อแสดงโฆษณาสำหรับสินค้าและบริการของตนให้กับคุณแทน การใช้ผลิตภัณฑ์ของเราหมายความว่าคุณยินยอมให้เรา </h3>
                                    <h3>แสดงโฆษณาที่เราคิดว่าจะเกี่ยวข้องกับคุณและความสนใจของคุณ เราใช้ข้อมูลส่วนตัวของคุณเพื่อช่วยพิจารณาว่าจะแสดงโฆษณาใดให้คุณเห็น</h3>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
            // </div>
            // </Form>
        );
    }
}

export default (SpecificationsView);

