import React, { Component } from 'react';
// import { Button, Table, Card, Pagination, PaginationLink, PaginationItem, CardHeader, Col, Row, Container } from 'reactstrap';
// import { Col, Row, Container, Card, CardImg, CardText, CardBody, CardTitle, Button, Label } from 'reactstrap';
import { Col, Row, CardHeader, Card, CardImg, CardText, CardBody, FormGroup, CardTitle, Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import ImgDefault from '../../assets/img/default-user.png'
import QrReader from 'react-qr-scanner'

import MenuModel from '../../models/MenuModel'
import MenuTypeModel from '../../models/MenuTypeModel'
import OrderModel from '../../models/OrderModel'
import OrderListModel from '../../models/OrderListModel'
import TableModel from '../../models/TableModel'
import GPSCalculateModel from '../../models/GPSCalculateModel'
import PromotionModel from '../../models/PromotionModel'
import PromotionUseModel from '../../models/PromotionUseModel'
import { geolocated } from "react-geolocated";
import AboutModel from '../../models/AboutModel'


var about_model = new AboutModel;
const menu_model = new MenuModel
const menutype_model = new MenuTypeModel
const order_model = new OrderModel
const order_list_model = new OrderListModel
const table_model = new TableModel
const gps_model = new GPSCalculateModel
const promotion_model = new PromotionModel
const promotion_use_model = new PromotionUseModel
var cart = [];
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            menutype_list: [],
            bill_order: [],
            order_list: [],
            refresh: false,
            delay: 400,
            result: 'No result',
        };
        this.renderMenuby = this.renderMenuby.bind(this);
        this.renderMenuType = this.renderMenuType.bind(this);
        this.rendercart = this.rendercart.bind(this);
        this.addItemTocart = this.addItemTocart.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.rendertotal = this.rendertotal.bind(this);
        this.sumtotal = this.sumtotal.bind(this);
        this.onBillDetail = this.onBillDetail.bind(this);
        this.renderOrderList = this.renderOrderList.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.handleScan = this.handleScan.bind(this)
        this.insertOrder = this.insertOrder.bind(this)
        this.close = this.close.bind(this)
        // this.getMyLocation = this.getMyLocation.bind(this)
        this.showQR = this.showQR.bind(this)
        this.renderBranch = this.renderBranch.bind(this)
    }

    async componentDidMount() {
        var menutype_list = await menutype_model.getMenuTypeBy()
        this.setState({
            menutype_list: menutype_list.data,
        })

        var menulist = await menu_model.getMenuBy()
        this.setState({
            menulist: menulist.data
        })

        var menu_list = await menu_model.getMenuByCode('1')
        this.setState({
            menu_list: menu_list.data
        })

        var bill_order = await order_model.getOrderBy()
        this.setState({
            bill_order: bill_order.data,
        })

        var promotion_list = await promotion_model.getPromotionBy()
        this.setState({
            promotion_list: promotion_list.data,
        })

        var branch_list = await about_model.getAboutBy()
        // console.log("branch_list", branch_list);
    
        this.setState({
          branch_list: branch_list.data,
        })

    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggle1() {
        this.setState(prevState => ({
            modal1: !prevState.modal
        }));
    }

    close() {
        this.setState({
            modal1: false
        })
    }

    handleError(err) {
        console.error(err)
    }

    async handleScan(data) {
        this.setState({
            result: data,
        })
        console.log(data);
        if (data != null) {
            var table_code = { table_code: data }
            var table_list = await table_model.getTableByCode(table_code)
            var insert = false
            var table_list_data = table_list.data
            // console.log("table_list_data", table_list_data.length);
            if (table_list_data != "" && !insert) {
                this.close();
                // console.log("table_list.data.length.zone_id", table_list.zone_id);

                this.insertOrder()
                insert = true
            }
        }
    }

    async getMenuByCode(code) {
        var menu_list = await menu_model.getMenuByCode(code)
        // console.log("menulistbycode", menu_list);
        this.setState({
            menu_list: menu_list.data
        })
    }

    renderMenuType() {
        if (this.state.menutype_list != undefined) {

            var type_list = []
            for (let i = 0; i < this.state.menutype_list.length; i++) {
                type_list.push(
                    <Col style={{ borderWidth: 1, borderStyle: 'solid', height: 50, textAlign: 'center' }}>
                        <div>
                            <label style={{ margin: '15px' }} onClick={this.getMenuByCode.bind(this, this.state.menutype_list[i].menu_type_id)}>
                                {this.state.menutype_list[i].menu_type_name}
                            </label>
                        </div>
                    </Col>

                )
            }
            return type_list;
        }
    }

    renderOrderList() {
        var Bill_order_list = []
        for (let i = 0; i < this.state.order_list.length; i++) {
            Bill_order_list.push(
                <Row>
                    <Col lg="4">
                        <Label className="text_head" > {this.state.order_list[i].order_list_name} </Label>
                    </Col>
                    <Col lg="4" style={{ textAlign: 'center' }}>
                        <Label className="text_head" > {this.state.order_list[i].order_list_qty} </Label>

                    </Col>
                    <Col lg="4" style={{ textAlign: 'center' }}>
                        <Label className="text_head" > {this.state.order_list[i].order_list_price_sum_qty} </Label>

                    </Col>

                </Row>
            )
        }
        return Bill_order_list;
    }

    addItem(data) {
        var name = data.menu_name;
        var price = data.menu_price;
        var code = data.menu_code;
        var type = data.menu_type_id;
        this.addItemTocart(name, price, code, 1, type)
    }

    addItemButton(data) {
        var name = data.name;
        var price = data.price;
        var code = data.code;
        var type = data.menu_type_id;
        console.log('data', data)
        this.addItemTocart(name, price, code, 1, type)
    }

    deleteItemButton(data) {
        var name = data.name;
        var price = data.price;
        var code = data.code;
        var type = data.menu_type_id;
        this.deleteItem(name, price, code, 1, type)
    }

    addItemTocart(name, price, code, count, type) {
        for (var item in cart) {
            if (cart[item].code === code) {
                cart[item].count++;
                this.setState({
                    cart: cart
                })
                return;
            }
        }
        cart.push({
            name: name,
            price: price,
            code: code,
            count: count,
            type: type
        });
        console.log("cart", cart);
        this.setState({
            cart: cart
        })
    }

    deleteItem(name, price, code, count, type) {
        for (var item in cart) {
            if (cart[item].code === code) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                this.setState({
                    cart: cart
                })
                break;
            }
        }
    }

    rendercart() {
        if (this.state.cart != undefined) {
            var cart_list = []
            for (let i = 0; i < this.state.cart.length; i++) {
                cart_list.push(
                    <div>
                        <Row >
                            <Col lg="4" style={{ paddingTop: '5px' }}><div>{this.state.cart[i].name}</div></Col>
                            <Col lg="4" style={{ paddingTop: '5px', textAlign: 'center' }}><div>{this.state.cart[i].price}</div></Col>

                            <Col lg="4" style={{ paddingTop: '5px', textAlign: 'center' }}><Button onClick={this.deleteItemButton.bind(this, this.state.cart[i])}> - </Button>{this.state.cart[i].count}<Button onClick={this.addItemButton.bind(this, this.state.cart[i])}> + </Button></Col>
                        </Row>
                        <hr />
                    </div>
                )
            }
            return cart_list;
        }
    }

    renderMenuby() {
        if (this.state.menu_list != undefined) {
            // console.log("5555", this.state.menu_list);
            var menulist = []
            for (let i = 0; i < this.state.menu_list.length; i++) {
                menulist.push(
                    <Col lg="4">
                        <Card onClick={this.addItem.bind(this, this.state.menu_list[i])}>
                            <CardBody>
                                <CardTitle><label >{this.state.menu_list[i].menu_name}</label> </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                )
            }
            return menulist;
        }
    }

    async showQR(my_location) {
        var coord = {
            lat_start: 14.999548299999999,
            lon_start: 102.10612169999999,
            // lat_start: my_location.latitude,
            // lon_start: my_location.longitude,
            lat_end: 14.999548299999999,
            lon_end: 102.10612169999999
        }
        var gps = await gps_model.getGPS(coord)
        console.log(gps);
        if (gps.distance <= 200) {
            swal({
                title: "คุณต้องการสั่งอาหารใช่หรือไม่ ?",
                // text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        this.toggle1()
                    }
                });
        } else {
            swal({
                title: "คุณไม่ได้อยู่ในพื้นที่ที่กำหนด",
                // text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                button: "Close",
            })
        }
    }

    async showScanQR() {
        const location = window.navigator && window.navigator.geolocation

        if (location) {
            location.getCurrentPosition((position) => {
                var my_location = position.coords
                this.showQR(position.coords)

            }, (error) => {
                swal({
                    title: "อุปกรณ์ไม่รองรับ GPS",
                    // text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
            })
        }
    }

    async insertOrder() {
        var order = []
        const max_code = await order_model.getOrderMaxCode()//province data
        var order_code = 'OD' + max_code.data.order_code_max
        // console.log(max_code);
        const date_now = new Date();
        var toDay = date_now.getFullYear() + "" + (date_now.getMonth() + 1) + "" + date_now.getDate() + "" + date_now.getTime();
        const data = new FormData();
        var order_service = document.getElementById('order_service').value
        var total_sum = this.sumtotal()
        var order
        if (this.state.promotion != undefined) {
            order = {
                'table_code': this.state.result,
                'order_service': order_service,
                'customer_code': 'CM001',
                'order_date': toDay,
                'order_code': order_code,
                'promotion_code': this.state.promotion.promotion_code,
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price
            }
        } else {
            order = {
                'table_code': this.state.result,
                'order_service': order_service,
                'customer_code': 'CM001',
                'order_date': toDay,
                'order_code': order_code,
                'promotion_code': '',
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price
            }
        }
        // console.log("order", order);

        const res = await order_model.insertOrder(order)
        if (this.state.promotion != undefined) {
            var promotion_use = {
                'customer_code': "CUS0001",
                'promotion_code': this.state.promotion.promotion_code,
                'discount_code': this.state.promotion.discount_code,
                'order_code': order_code,
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price
            }
            const res2 = await promotion_use_model.insertPromotionUse(promotion_use)
        }
        // console.log("222222222", res);

        for (var key in this.state.cart) {
            var order_list = {
                order_code: order_code,
                menu_code: this.state.cart[key].code,
                order_list_qty: this.state.cart[key].count,
                order_list_name: this.state.cart[key].name,
                order_list_price_qty: this.state.cart[key].price,
                order_list_price_sum_qty: this.state.cart[key].count * this.state.cart[key].price,
                order_list_price_sum: total_sum.sum_price
            }
            const arr = await order_list_model.insertOrderList(order_list)
            if (order_list != undefined) {
                this.close();
                swal({
                    title: "สั่งอาหารเรียบร้อย",
                    text: "โปรดรออาหารสักครู่...",
                    icon: "success",
                    button: "Close",
                });

            }
        }
        this.setState({
            order_code: order_code,
            sum_price: total_sum.sum_price
        })

    }

    async updateOrder(order_code) {
        var order = []
        const date_now = new Date();
        var toDay = date_now.getFullYear() + "" + (date_now.getMonth() + 1) + "" + date_now.getDate() + "" + date_now.getTime();
        const data = new FormData();
        var order_service = document.getElementById('order_service').value
        // console.log("order_service", order_service);
        var total_sum = this.sumtotal();
        var order
        console.log("this.state.promotion :", this.state.promotion);
        if (this.state.promotion != undefined) {
            order = {
                'order_service': order_service,
                'customer_code': 'CM001',
                'order_date': toDay,
                'order_code': this.state.order_code,
                'promotion_code': this.state.promotion.promotion_code,
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price
            }
        } else {
            order = {
                'order_service': order_service,
                'customer_code': 'CM001',
                'order_date': toDay,
                'order_code': this.state.order_code,
                'promotion_code': '',
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price
            }
        }

        const result1 = await order_model.updateOrderByCode(order)
        if (this.state.promotion != undefined) {
            var promotion_use = {
                'customer_code': "CUS0001",
                'promotion_code': this.state.promotion.promotion_code,
                'discount_code': this.state.promotion.discount_code,
                'order_code': order_code,
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price
            }
            const res = await promotion_use_model.updatePromotionUseByCode(promotion_use)
        }
        const res2 = await promotion_use_model.insertPromotionUse(promotion_use)
        const result2 = await order_list_model.deleteOrderListByCode({ 'order_code': this.state.order_code })
        console.log("result2", result2);

        for (var key in this.state.cart) {
            var order_list = {
                order_code: this.state.order_code,
                menu_code: this.state.cart[key].code,
                order_list_qty: this.state.cart[key].count,
                order_list_name: this.state.cart[key].name,
                order_list_price_qty: this.state.cart[key].price,
                order_list_price_sum_qty: this.state.cart[key].count * this.state.cart[key].price,
                order_list_price_sum: total_sum.sum_price
            }
            const arr = await order_list_model.insertOrderList(order_list)
            if (order_list != undefined) {
                swal({
                    title: "Good job!",
                    text: "Add user Ok",
                    icon: "success",
                    button: "Close",
                });
            }
        }
    }

    async getPromotion() {
        var discount_code = document.getElementById("discount_code").value
        const promotion = await promotion_model.getPromotionByDiscountCode({ "discount_code": discount_code })
        console.log(promotion.data);

        this.setState({
            promotion: promotion.data
        })
        this.sumtotal()
    }

    renderpromotion() {
        if (this.state.promotion != undefined) {
            var promotion_list = []
            promotion_list.push(
                <Col>
                    <div>
                        <label style={{ margin: '15px' }}>
                            {this.state.promotion.promotion_detail}
                        </label>
                    </div>
                </Col>
            )

        }
        return promotion_list;
    }

    rendertotal() {
        if (this.state.cart != undefined) {
            var order_total = []
            var sumtotal = this.sumtotal()
            order_total.push(
                <Row>
                    <Col lg="8" style={{ paddingTop: '30px' }}>
                        <label>ราคารวม</label>
                    </Col>
                    <Col lg="4" style={{ textAlign: 'center', paddingTop: '30px' }}>
                        <label>{sumtotal.sum_price}</label>
                    </Col>
                </Row>
            )
            // console.log("3333333333", sum);
            // this.setState({
            //     sum_price: sum
            // })
            return order_total;
        }

    }

    sumtotal() {
        if (this.state.cart != undefined) {
            var sum = 0;
            var total = 0;
            var sum1 = 0;
            var sum2 = 0;
            var sum3 = 0;
            var sum1_count = 0;
            var sum2_count = 0;
            var sum3_count = 0;
            var price1 = []
            var price2 = []
            var price3 = []

            for (let i = 0; i < this.state.cart.length; i++) {
                sum += parseFloat(this.state.cart[i].count) * parseFloat(this.state.cart[i].price)
                total += parseFloat(this.state.cart[i].count) * parseFloat(this.state.cart[i].price)
            }
            for (let i = 0; i < this.state.cart.length; i++) {
                if (this.state.cart[i].type == 1) {
                    for (var j = 0; j < this.state.cart[i].count; j++) {
                        price1.push(this.state.cart[i].price)
                    }

                    sum1_count += parseFloat(this.state.cart[i].count)
                    sum1 += parseFloat(this.state.cart[i].count) * parseFloat(this.state.cart[i].price)

                }
                if (this.state.cart[i].type == 2) {
                    for (var j = 0; j < this.state.cart[i].count; j++) {
                        price2.push(this.state.cart[i].price)
                    }
                    sum2_count += parseFloat(this.state.cart[i].count)
                    sum2 += parseFloat(this.state.cart[i].count) * parseFloat(this.state.cart[i].price)
                }
                if (this.state.cart[i].type == 3) {
                    for (var j = 0; j < this.state.cart[i].count; j++) {
                        price3.push(this.state.cart[i].price)
                    }
                    sum3_count += parseFloat(this.state.cart[i].count)
                    sum3 += parseFloat(this.state.cart[i].count) * parseFloat(this.state.cart[i].price)
                }

            }
            if (this.state.promotion != undefined) {
                if (this.state.promotion.discount_percent != "") {
                    var discount_price = (sum * this.state.promotion.discount_percent) / 100
                    sum = sum - discount_price
                    // console.log("sum_discount_percent", sum);
                }
                if (this.state.promotion.discount_price != "") {
                    var discount_price = sum - this.state.promotion.discount_price
                    sum = discount_price
                    // console.log("sum_discount_price", sum);
                }
                if (this.state.promotion.promotion_type == "แถม") {
                    if (this.state.promotion.menu_type_id == 1 && this.state.promotion.discount_giveaway_buy <= sum1_count) {
                        var sum1_discount = sum1;
                        for (let i = 0; i < this.state.promotion.discount_giveaway; i++) {
                            var min = Math.min.apply(Math, price1);
                            sum1_discount = sum1_discount - min

                            for (var key in price1) {
                                if (price1[key] == min) {
                                    price1.splice(key, 1);
                                    break;
                                }
                            }
                            console.log('sum1_discount', sum1_discount);

                        }
                        total = sum1 + sum2 + sum3
                        sum = sum1_discount + sum2 + sum3


                    }
                    if (this.state.promotion.menu_type_id == 2 && this.state.promotion.discount_giveaway_buy <= sum2_count) {
                        var sum2_discount = sum2;
                        for (let i = 0; i < this.state.promotion.discount_giveaway; i++) {
                            var min = Math.min.apply(Math, price1);
                            sum2_discount = sum2_discount - min

                            for (var key in price2) {
                                if (price2[key] == min) {
                                    price2.splice(key, 1);
                                    break;
                                }
                            }
                        }
                        total = sum1 + sum2 + sum3
                        sum = sum2_discount + sum1 + sum3
                    }
                    if (this.state.promotion.menu_type_id == 3 && this.state.promotion.discount_giveaway_buy <= sum3_count) {
                        var sum3_discount = sum3
                        for (let i = 0; i < this.state.promotion.discount_giveaway; i++) {
                            var min = Math.min.apply(Math, price1);
                            sum3_discount = sum3_discount - min

                            for (var key in price3) {
                                if (price3[key] == min) {
                                    price3.splice(key, 1);
                                    break;
                                }
                            }
                        }

                        total = sum1 + sum2 + sum3
                        sum = sum3_discount + sum2 + sum1
                    }
                }
            }
            var total_sum = {
                sum_price: sum,
                total: total
            }
            console.log("5555555555", total_sum);
            return total_sum;
        }
    }

    async onBillDetail(order_code) {
        var order_list = await order_list_model.getOrderListBy(order_code)
        this.setState({
            order_list: order_list.data,
            order_code_list: order_code
        })
        this.toggle()
    }

    renderBranch() {

        if (this.state.branch_list != undefined) {
          var branch = []
          for (var key in this.state.branch_list) {
            branch.push(
                <option value={this.state.branch_list[key].about_code}>{this.state.branch_list[key].about_name_th}</option>
            )
          }
          return branch;
        }
      }
    

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        const previewStyle = {
            height: '100%',
            width: '100%',
        }

        return (
            <div>
                <Row style={{ minWidth: '100%', height: '100%', minHeight: '80vh' }}>
                    <Col lg="6" style={{ borderStyle: 'solid', borderWidth: 1 }}>
                        <Row style={{ minWidth: '100%' }}>
                            {this.renderMenuType()}
                        </Row>
                        <Row style={{ overflowY: 'scroll', paddingTop: '20px' }}>
                            {this.renderMenuby()}
                        </Row>
                    </Col>
                    <Col lg="6" style={{ borderStyle: 'solid', borderWidth: 1 }}>
                        <Row style={{ padding: '2%' }}>
                            <Col lg="6">
                                <FormGroup>
                                    <Input type="select" id="order_service" name="order_service" class="form-control" >
                                        <option value="ทานที่ร้าน">ทานที่ร้าน</option>
                                        <option value="สั่งกลับบ้าน">สั่งกลับบ้าน</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="3">
                                <FormGroup>
                                    <Input type="select" id="order_service" name="order_service" class="form-control" >
                                        <option value="สาขา">สาขา</option>
                                      {this.renderBranch()}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row >
                            <div style={{ paddingTop: '10px', paddingLeft: '10px', paddingBottom: '30px' }}> รายการอาหาร</div>
                        </Row>

                        {this.rendercart()}

                        <Row>
                            <Col lg="2">
                                <div style={{ paddingTop: '10px', paddingLeft: '10px', paddingBottom: '30px' }}>CODE </div>
                            </Col>
                            <Col lg="4">
                                <Input type="text" id={"discount_code"} name={"discount_code"} onChange={this.getPromotion.bind(this)} />
                            </Col>
                        </Row>

                        {this.renderpromotion()}

                        <Row style={{ textAlign: 'right', justifyContent: 'end' }}>
                            <Col>

                                {this.rendertotal()}

                                {this.state.cart != undefined && this.state.cart != "" ?
                                    <Row style={{ textAlign: 'right' }}>
                                        <Col lg='12'>
                                            <div>
                                                {this.state.order_code != undefined ?
                                                    <div>
                                                        <Button onClick={this.updateOrder.bind(this, this.state.order_code)}><label>สั่งอาหาร</label></Button>
                                                        <Button onClick={this.onBillDetail.bind(this, this.state.order_code)}><label>ดูบิล</label></Button>
                                                    </div>
                                                    : <Button onClick={this.showScanQR.bind(this)}><label>สั่งอาหาร</label></Button>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                    : ''}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>Order : {this.state.order_code_list}</ModalHeader>
                    <ModalBody >
                        <Row>
                            <Col>
                                <Row>
                                    <Col lg="4">
                                        <Label> รายการ </Label>
                                    </Col>
                                    <Col lg="4" style={{ textAlign: 'center' }}>
                                        <Label> จำนวน </Label>
                                    </Col>
                                    <Col lg="4" style={{ textAlign: 'center' }}>
                                        <Label> ราคา </Label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {this.renderOrderList()}

                        <Row>
                            <Col lg="4"></Col>
                            <Col lg="4" style={{ textAlign: 'center' }}>
                                <Label>ราคารวมมม</Label>
                            </Col>
                            <Col lg="4" style={{ textAlign: 'center' }}>
                                <Label className="text_head"> {this.state.sum_price} </Label>
                            </Col>
                        </Row >
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle} style={{ width: 100, height: 40 }}>OK</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modal1} toggle={this.toggle1} size="lg">
                    <ModalBody >
                        <div>
                            <QrReader
                                delay={this.state.delay}
                                style={previewStyle}
                                onError={this.handleError}
                                onScan={this.handleScan}
                            />
                            <p>{this.state.result}</p>
                        </div>
                    </ModalBody >
                    <ModalFooter>
                        <Button color="cancel" onClick={this.close} style={{ width: 100, height: 40 }}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default (HomeView);