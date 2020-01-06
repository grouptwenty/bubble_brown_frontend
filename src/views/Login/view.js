import React, { Component } from 'react';
import { Button, Table, Card, Pagination, PaginationLink, Label, FormGroup, Form, Input, CardFooter, PaginationItem, CardHeader, Col, Row, CardImg, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import FacebookLogin from 'react-facebook-login';
import CustomerModel from '../../models/CustomerModel'
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
    }



    async componentDidMount() {
        var customer_data = localStorage.getItem('@customer_data')
        this.setState({
            customer_data: customer_data
        })

    }

    renderPage() {
        var login_or_profile = []
        if (this.state.customer_data != undefined) {
            login_or_profile.push(
                <div><a>เป็นสมาชิกกก</a></div>
            )

        } else {
            login_or_profile.push(
                <div>สมัครสมาชิกกก
                <FacebookLogin
                        appId="1021322851547683"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook.bind(this)}
                        cssClass="my-facebook-button-class"
                        icon="fa-facebook"
                    />
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
            customer_tel: '0981013056',
            customer_image: response.picture.data.url

        }

        var check_email = await customer_model.getCustomerByEmail(response)

        if (check_email.data != undefined && check_email.data != null) {

            var customer_data = {
                customer_code: check_email.data.customer_code,
                customer_name: response.name,
                customer_id: response.userID,
                customer_email: response.email,
                customer_tel: '0981013056222',
                customer_image: response.picture.data.url

            }

            localStorage.setItem('@customer_data', check_email.data)
            var update_customer = await customer_model.updateCustomerByCode(customer_data)
        } else {
            var insert_customer = await customer_model.insertCustomer(customer_data)
            localStorage.setItem('@customer_data', check_email.data)
        }
        console.log("check_email ===> ", check_email);
    }


    render() {


        return (
            <div className="animated fadeIn">
                {this.renderPage()}

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