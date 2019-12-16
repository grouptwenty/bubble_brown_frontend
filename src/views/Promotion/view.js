import React, { Component } from 'react';
import { Button, Table, Card, CardHeader, Col, Row, InputGroup, InputGroupAddon, InputGroupText, Label, FormGroup, Input, Form, CardBody, imagePreview, CardFooter, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import { formatDate, parseDate, } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';



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
            menutype_list: [],
            change_date: today,
            refresh: false

        };
        this.renderPromotion = this.renderPromotion.bind(this);
        this.renderMenuType = this.renderMenuType.bind(this);
    }



    async componentDidMount() {
        var promotion_list = await promotion_model.getPromotionBy()
        this.setState({
            promotion_list: promotion_list.data,

        })

        var menutype_list = await menutype_model.getMenuTypeBy()
        this.setState({
            menutype_list: menutype_list.data,
        })

    }

    async getPromotionByCode(code) {
        var promotion_list = await promotion_model.getPromotionByCode(code)
        console.log("promotion_list");

        this.setState({
            promotion_list: promotion_list.data
        })
    }

    renderMenuType() {
        if (this.state.menutype_list != undefined) {

            var type_list = []
            for (let i = 0; i < this.state.menutype_list.length; i++) {
                type_list.push(
                    <Col style={{ borderWidth: 1, borderStyle: 'solid', height: 50, textAlign: 'center' }}>
                        <div>
                            <label style={{ margin: '15px' }} onClick={this.getPromotionByCode.bind(this, this.state.menutype_list[i].menu_type_code)}>
                                {this.state.menutype_list[i].menu_type_name}
                            </label>
                        </div>
                    </Col>
                )
            }
            return type_list;
        }
    }

    renderPromotion() {
        var promotion = []
        for (let i = 0; i < this.state.promotion_list.length; i++) {
            promotion.push(
                <Col lg="4">
                    <Card body>
                        <CardTitle>{this.state.promotion_list[i].promotion_header}</CardTitle>
                        {/* <CardText>รายละเอียด: {this.state.promotion_list[i].promotion_detail}</CardText> */}
                        <CardText>เริ่ม: {this.state.promotion_list[i].startdate}</CardText>
                        <CardText>หมดเขต: {this.state.promotion_list[i].enddate}</CardText>
                        <Button>รายละเอียด</Button>
                    </Card>
                </Col>
            )
        }

        return promotion;
    }

    render() {

        return (

            <div>
                <Row style={{ minWidth: '100%', backgroundColor: '#5a5a5a', height: '120px', justifyContent: 'center', alignItems: 'center' }}>
                    <label style={{ textAlign: 'center', color: 'white', fontSize: '30px' }}>โปรโมชั่น</label>
                </Row>
                <Row style={{ minWidth: '100%' }}>
                    {this.renderMenuType()}
                </Row>
                <br />
                <br />
                <Row>
                    {this.renderPromotion()}
                </Row>
            </div >

        )
    }
}
export default (PromotionView);