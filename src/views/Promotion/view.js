import React, { Component } from 'react';
import { Button, Card, CardImg, Col, Row, InputGroup, InputGroupAddon, InputGroupText, Label, FormGroup, Input, Form, CardBody, imagePreview, CardFooter, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import { formatDate, parseDate, } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import BackGroung from './3061714.jpg';
import ImgDefault from '../../assets/img/default-user.png'
import Carousel from 'react-bootstrap/Carousel'
import PromotionModel from '../../models/PromotionModel'
import MenuTypeModel from '../../models/MenuTypeModel'

const promotion_model = new PromotionModel
const menutype_model = new MenuTypeModel

var today = new Date();
class PromotionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            promotion_list: [],
            change_date: today,
            refresh: false

        };
        this.renderPromotion = this.renderPromotion.bind(this);
    }



    async componentDidMount() {

        var promotion_list = await promotion_model.getProductByFont()
        this.setState({
            promotion_list: promotion_list.data,

        })

        console.log("promotion_listgdgf", promotion_list);





    }




    renderPromotion() {

        console.log("this.state.promotion_list[i].promotion_header", this.state.promotion_list);


        var promotion = []
        for (let i = 0; i < this.state.promotion_list.length; i++) {
            promotion.push(
                <Col lg="4" md="4" sm="6" xs="12">
                    <Card body style={{ color: '#000', borderWidth: 0 }}>
                        <CardImg top height="200px" src={this.state.promotion_list[i].promotion_image != "" && this.state.promotion_list[i].promotion_image != null ? GOBALS.URL_IMG + "promotion/" + this.state.promotion_list[i].promotion_image : ImgDefault} alt="Card image cap" />

                        <CardTitle style={{ fontWeight: 'bold' }}>{this.state.promotion_list[i].promotion_header}</CardTitle>
                        {/* <CardText>รายละเอียด: {this.state.promotion_list[i].promotion_detail}</CardText> */}
                        <CardText>
                            <Row>
                                <Col lg="6" md="6" sm="12" xs="12" >
                                    <labal style={{ fontWeight: 'bold' }}>  เริ่ม: </labal>{this.state.promotion_list[i].startdate}
                                </Col>
                                <Col lg="6" md="6" sm="12" xs="12">
                                    <labal style={{ fontWeight: 'bold' }}> หมดเขต: </labal>{this.state.promotion_list[i].enddate}
                                </Col>
                            </Row>
                        </CardText>
                        {/* <CardText>หมดเขต: {this.state.promotion_list[i].enddate}</CardText> */}
                        <CardText><labal style={{ fontWeight: 'bold' }}> รหัสโปรโมชั่น: </labal>{this.state.promotion_list[i].discount_code}</CardText>
                        <CardText><labal style={{ fontWeight: 'bold' }}> เงื่อนไข:</labal> {this.state.promotion_list[i].promotion_detail}</CardText>

                    </Card>
                </Col>
            )
        }

        return promotion;
    }

    render() {

        return (

            <div className="vc" ref="iScroll" style={{ height: "100%", verflow: "auto", }}>

                <section class="cd-section cd-section--bg-fixed" style={{ backgroundImage: `url(${BackGroung})`, }}>
                    <Row style={{ minWidth: '100%', backgroundColor: 'rgb(199,165,101, 0.45)', height: '120px', justifyContent: 'center', alignItems: 'center' }}>
                        <label style={{ textAlign: 'center', color: 'white', fontSize: '30px' }}>โปรโมชั่น</label>
                    </Row>

                    <Row style={{ paddingTop: '5%', paddingRight: '5%', paddingLeft: '5%' }}>
                        {this.renderPromotion()}
                    </Row>
                   

                </section>
            </div >

        )
    }
}
export default (PromotionView);