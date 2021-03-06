import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Background from './back2.jpg';
// import EntrepreneurModel from '../../models/EntrepreneurModel'
import { verify } from 'crypto';

// const entrepreneur_model = new EntrepreneurModel

// var md5 = require("md5");
class VerifyView extends Component {
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
                                    <a>นโยบายความเป็นส่วนตัว</a>
                                    <h3>การใช้งานของคุณ เราเก็บรวบรวมข้อมูลเกี่ยวกับวิธีที่คุณใช้ผลิตภัณฑ์ของเรา เช่น ประเภทเนื้อหาที่คุณดูหรือโต้ตอบด้วย ฟีเจอร์ที่คุณใช้ การดำเนินการที่คุณทำ </h3>
                                    <h3>ผู้คนหรือบัญชีผู้ใช้ที่คุณโต้ตอบด้วย รวมทั้งเวลา ความถี่ และระยะเวลาที่คุณทำกิจกรรม ตัวอย่างเช่น เราจะบันทึกเมื่อคุณกำลังใช้ผลิตภัณฑ์ของเราและเมื่อคุณใช้ผลิตภัณฑ์ของเราครั้งล่าสุด</h3>
                                    <h3>และบันทึกว่าคุณดูโพสต์ วิดีโอ และเนื้อหาอื่นๆ ใดบ้างในผลิตภัณฑ์ของเรา นอกจากนี้ เรายังเก็บรวบรวมข้อมูลเกี่ยวกับวิธีที่คุณใช้ฟีเจอร์ต่างๆ เช่น กล้องของเรา</h3>
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

export default (VerifyView);

