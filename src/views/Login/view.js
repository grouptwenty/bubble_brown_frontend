import React, { Component } from 'react';
import { Button, Table, Card, Pagination, PaginationLink, Label, FormGroup, Form, Input, CardFooter, PaginationItem, CardHeader, Col, Row, CardImg, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import FacebookLogin from 'react-facebook-login';
import CustomerModel from '../../models/CustomerModel'
import useLiff, { LiffData, Liff, LineProfile } from 'react-liff-hooks';
import { OAuth } from "oauthio-web";
import { R } from 'pdfmake/build/pdfmake';
const customer_model = new CustomerModel


class loginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user_img_old: "",
            refresh: false
        };
        this.renderPage = this.renderPage.bind(this);
        this.renderLineButtonPage = this.renderLineButtonPage.bind(this);
    }



    async componentDidMount() {

        

        var customer_data = localStorage.getItem('@customer_data')
        this.setState({
            customer_data: customer_data
        })
        OAuth.initialize("HBPP7MOsssNFYnKdbu9qyPT0Fyo");
    }

    Auth = () => {
        OAuth.initialize("HBPP7MOsssNFYnKdbu9qyPT0Fyo");
        OAuth.popup("line")
            .done(async res => {
                var info = await customer_model.getLineInformation(res.access_token)
                console.log("infooooooooooooooooo", info);

                const max_code = await customer_model.getCustomerMaxCode()
                var customer_code = 'CM' + max_code.data.customer_code_max
                // console.log("customer_code------------>", customer_code);
                var customer_data = {
                    customer_code: customer_code,
                    customer_name: info.displayName,
                    customer_id: info.userId,
                    customer_email: '',
                    customer_tel: '',
                    customer_image: info.pictureUrl

                }

                var check_Id = await customer_model.getCustomerById(info)
                console.log("check_Id------------>", check_Id);
                if (check_Id.data != undefined && check_Id.data != null) {

                    var customer_data = {
                        customer_code: check_Id.data.customer_code,
                        customer_name: info.displayName,
                        customer_id: info.userId,
                        customer_email: '',
                        customer_tel: '',
                        customer_image: info.pictureUrl

                    }

                    localStorage.setItem('@customer_data', JSON.stringify(check_Id.data))
                    var update_customer = await customer_model.updateCustomerByCode(customer_data)
                   
                    this.props.history.push('/profile/')
                    window.location.reload();
                 
                } else {
                    var insert_customer = await customer_model.insertCustomer(customer_data)
                    localStorage.setItem('@customer_data', JSON.stringify(customer_data))
               
                    this.props.history.push('/profile/')
                    window.location.reload();
                   
                }
            })
            .fail(err => {
            });


    };
    Authfacebook = () => {
        OAuth.initialize("HBPP7MOsssNFYnKdbu9qyPT0Fyo");
        OAuth.popup("facebook")
            .done(async res => {
                var info
              await res.me().then(( data) => {
                info = data;
                  });
            
                console.log("infooooooooooooooooo", info);

                const max_code = await customer_model.getCustomerMaxCode()
                var customer_code = 'CM' + max_code.data.customer_code_max
                // console.log("customer_code------------>", customer_code);
                var customer_data = {
                    customer_code: customer_code,
                    customer_name: info.name,
                    customer_id: info.id,
                    customer_email:info.email,
                    customer_tel: '',
                    customer_image: info.avatar

                }

                var check_Id = await customer_model.getCustomerById(info)
                console.log("check_Id------------>", check_Id);
                if (check_Id.data != undefined && check_Id.data != null) {

                    var customer_data = {
                        customer_code: check_Id.data.customer_code,
                        customer_name: info.name,
                        customer_id: info.id,
                        customer_email: info.email,
                        customer_tel: '',
                        customer_image: info.avatar

                    }

                    localStorage.setItem('@customer_data', JSON.stringify(check_Id.data))
                    var update_customer = await customer_model.updateCustomerByCode(customer_data)
                   
                    this.props.history.push('/profile/')
                    window.location.reload();
                 
                } else {
                    var insert_customer = await customer_model.insertCustomer(customer_data)
                    localStorage.setItem('@customer_data', JSON.stringify(customer_data))
               
                    this.props.history.push('/profile/')
                    window.location.reload();
                   
                }
            })
            .fail(err => {
            });


    };
    renderLineButtonPage() {
        var login_or_profile = []
        if (this.state.customer_data != undefined) {
            login_or_profile.push(
                this.props.history.push('/profile/')
               
            )
 this.componentDidMount()
        } else {
            login_or_profile.push(
                <div>
                    <Button style={{ backgroundColor: '#00B900', color: '#fff' ,height:'60px'}} onClick={this.Auth}
                        className="btn btn-tw btn-block">
                        เข้าสู่ระบบด้วย Line
                    </Button>
                </div>
            )
            
        } return login_or_profile;
    }


    renderPage() {
        var login_or_profile = []
        if (this.state.customer_data != undefined) {
            login_or_profile.push(
                this.props.history.push('/profile/')
            )

        } else {
            login_or_profile.push(
                <div>
                <Button style={{ backgroundColor: '#4267b2', color: '#fff' ,height:'60px'}} onClick={this.Authfacebook}
                    className="btn btn-tw btn-block">
                    เข้าสู่ระบบด้วย FACEBOOK
                </Button>
            </div>
            )
        } return login_or_profile;
    }

    responseFacebook = async (response) => {
        console.log(response);

        const max_code = await customer_model.getCustomerMaxCode()
        var customer_code = 'CM' + max_code.data.customer_code_max

        var customer_data = {
            customer_code: customer_code,
            customer_name: response.name,
            customer_id: response.userID,
            customer_email: response.email,
            customer_tel: '',
            customer_image: response.picture.data.url

        }

        var check_email = await customer_model.getCustomerByEmail(response)

        if (check_email.data != undefined && check_email.data != null) {

            var customer_data = {
                customer_code: check_email.data.customer_code,
                customer_name: response.name,
                customer_id: response.userID,
                customer_email: response.email,
                customer_tel: '',
                customer_image: response.picture.data.url

            }

            localStorage.setItem('@customer_data', JSON.stringify(check_email.data))
            var update_customer = await customer_model.updateCustomerByCode(customer_data)
            this.props.history.push('/profile/')
        } else {
            var insert_customer = await customer_model.insertCustomer(customer_data)
            localStorage.setItem('@customer_data', JSON.stringify(customer_data))
            this.props.history.push('/profile/')
        }
        console.log("check_email ===> ", check_email);
    }


    render() {


        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg="4">

                    </Col>
                    <Col lg="4" style={{ paddingTop: '50px' }}>
                        <Card body >
                            <CardBody>
                                <Row>
                                    <Col lg="12" style={{ textAlign: 'center', fontSize: '35pt', color: '#9A7B4F', paddingBottom: '30px' }}>
                                        <label>เข้าสู่ระบบ</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12" style={{ textAlign: 'center', }}>
                                        {this.renderPage()}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12" style={{ textAlign: 'center', }}>
                                        <hr /> <label> หรือเข้าสู่ระบบผ่านบัญชี Line</label><hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12" style={{ textAlign: 'center', }}>
                                        {this.renderLineButtonPage()}
                                    </Col>
                                </Row>
                            </CardBody>

                        </Card>
                    </Col>
                    <Col lg="4">

                    </Col>
                </Row>



            </div >
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStatetoProps)(loginView);