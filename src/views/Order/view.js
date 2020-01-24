import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from "mdbreact";
import { Col, Row, CardHeader, Card, CardImg, CardText, CardBody, FormGroup, CardTitle, Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, CardFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import ImgDefault from '../../assets/img/default-user.png'
import QrReader from 'react-qr-scanner'
import moment from 'moment'
import axios from 'axios';
import Pusher from 'pusher-js';

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
            activeItem: "1",
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
        this.renderBranchImg = this.renderBranchImg.bind(this)
    }

    handleTextChange(e) {
        var about_code = this.props.match.params.code
        const payload = {
            about_code: about_code,
            message: 'new order',
        };
        axios.post('http://localhost:5002/message', payload);


    }
    async componentDidMount() {
        const code = this.props.match.params.code
        console.log("codecodecode", code);

        const pusher = new Pusher('def17c9634c093c2935d', {
            cluster: 'ap1',
            encrypted: true
        });
        const channel = pusher.subscribe('chat');
        channel.bind('message', data => {
            //   this.setState({ chats: [...this.state.chats, data], test: '' });
            //   this.componentDidMount()
            console.log("data>>>", data);

        });
        this.handleTextChange = this.handleTextChange.bind(this);

        if (code != null && code != undefined) {

            var about_data = await about_model.getAboutByCode(code)
            this.setState({
                about_data: about_data.data,
                about_menu_data: about_data.data.about_menu_data
            })
            console.log("about_data : ", about_data);
            var arr = {}
            arr['about_code'] = code
            arr['about_menu_data'] = this.state.about_data.about_menu_data
            arr['about_main_branch'] = this.state.about_data.about_main_branch

            var menutype_list = await menutype_model.getMenuTypeBy(arr)
            this.setState({
                menutype_list: menutype_list.data,
            })
            console.log("menutypeeeee : ", menutype_list);


            var menulist = await menu_model.getMenuBy(arr)
            this.setState({
                menulist: menulist.data
            })
            console.log("menulist : ", menulist);


            var promotion_list = await promotion_model.getPromotionBy({ "about_code": code })
            this.setState({
                promotion_list: promotion_list.data,
            })

            var menu_list = await menu_model.getMenuByCode(arr)
            this.setState({
                menu_list: menu_list.data
            })
            console.log("menu_list : ", menu_list);

            var about = await about_model.getAboutByCol(arr)
            this.setState({
                about: about.data
            })
            console.log("about : ", about);

        }

        var bill_order = await order_model.getOrderBy()
        this.setState({
            bill_order: bill_order.data,
        })

        var branch_list = await about_model.getAboutBy()
        // console.log("branch_list", branch_list);

        this.setState({
            branch_list: branch_list.data,
        })
        console.log("this.state.menutype_list", this.state.menutype_list);

        if (this.state.menutype_list.length > 0) {
            this.getMenuByCode(this.state.menutype_list[0].menu_type_id)
        }
    }




    toggletabs = tab => () => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
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


        // var about_code = document.getElementById('about_code').value
        var arr = {}
        arr['about_code'] = this.props.match.params.code
        arr['menu_type_id'] = code
        arr['about_menu_data'] = this.state.about_data.about_menu_data
        arr['about_main_branch'] = this.state.about_data.about_main_branch
        console.log("arrarrarrarr", arr);
        var menu_list = await menu_model.getMenuByCode(arr)
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
                    // <Col style={{ borderWidth: 1, borderStyle: 'solid', height: 50, textAlign: 'center' }}>
                    //     <div>
                    //         <label style={{ margin: '15px' }} onClick={this.getMenuByCode.bind(this, this.state.menutype_list[i].menu_type_id)}>
                    //             {this.state.menutype_list[i].menu_type_name}
                    //         </label>
                    //     </div>
                    // </Col>
                    <a onClick={this.getMenuByCode.bind(this, this.state.menutype_list[i].menu_type_id)} class="nav-item nav-link active" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
                       <label className="text-menu">{this.state.menutype_list[i].menu_type_name}</label>
                    </a>

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
        var name = data.menu_name;
        var price = data.menu_price;
        var code = data.menu_code;
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

                    console.log("item", item);
                }

                this.setState({
                    cart: cart
                })
                break;
            }
        }
    }

    rendercart(menu) {
        var cart_list = []
        if (this.state.cart != undefined) {

            for (let i = 0; i < this.state.cart.length; i++) {
                if (menu.menu_code == this.state.cart[i].code) {
                    cart_list.push(

                        <Col lg="4" md="4" sm="4" xs="4" style={{ paddingTop: '5px' }}><div>{this.state.cart[i].count}</div></Col>


                    )
                    break;
                }
            }
            console.log('cart_list', cart_list);

            if (cart_list.length == 0) {
                cart_list.push(
                    <Col lg="4" md="4" sm="4" xs="4" style={{ paddingTop: '5px' }}><div>0</div></Col>
                )
            }
            return cart_list;
        } else {
            cart_list.push(
                <Col lg="4" md="4" sm="4" xs="4" style={{ paddingTop: '5px' }}><div>0</div></Col>
            )
            return cart_list;
        }
    }

    renderMenuby() {

        if (this.state.menu_list != undefined) {
            // console.log("5555", this.state.menu_list);
            var menulist = []
            for (let i = 0; i < this.state.menu_list.length; i++) {
                menulist.push(
                    // <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <Col lg="3" md="4" sm="6" xs="12" style={{ paddingTop: '20px' }}>
                        <Card style={{ backgroundColor: this.hightlightMenu(this.state.menu_list[i]) }}>
                            {/* <CardHeader>
                                <Button onClick={this.deleteItemMenu.bind(this, this.state.menu_list[i])}>ลบรายการ</Button>
                            </CardHeader> */}
                            <CardImg top width="40px" height="280px" className="img-manu" src={GOBALS.URL_IMG + "menu/" + this.state.menu_list[i].menu_image} alt="Card image cap" />

                            <CardBody>
                                <CardTitle>
                                    <Row style={{ paddingTop: '10px' }}>
                                        <Col lg="6" md="6" sm="6" xs="6" >
                                            <label >{this.state.menu_list[i].menu_name}</label>
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6" style={{ textAlign: 'center' }}>
                                            <label >{this.state.menu_list[i].menu_price + ' ' + ' ' + ' ' + 'บาท'}</label>
                                        </Col>
                                    </Row>
                                </CardTitle>
                            </CardBody>
                            <CardFooter style={{ backgroundColor: this.hightlightMenu(this.state.menu_list[i]), textAlign: 'center' }}>
                                <Row >
                                    <Col lg="3" md="3" sm="3" xs="3" >

                                    </Col>
                                    <Col lg="9" md="9" sm="9" xs="9" >
                                        <Row style={{ paddingTop: '5px', }}>
                                            <Button style={{ backgroundColor: this.hightlightbuttonMenu(this.state.menu_list[i]), borderWidth: 0, textAlign: 'center' }} onClick={this.deleteItemButton.bind(this, this.state.menu_list[i])}> - </Button>{this.rendercart(this.state.menu_list[i])}<Button style={{ backgroundColor: this.hightlightbuttonMenu(this.state.menu_list[i]), borderWidth: 0, textAlign: 'center' }} onClick={this.addItem.bind(this, this.state.menu_list[i])} > + </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                    // </div>
                )
            }
            return menulist;
        }
    }

    async showQR(my_location) {
        var coord = {
            // lat_start: 14.999548299999999,
            // lon_start: 102.10612169999999,
            lat_start: my_location.latitude,
            lon_start: my_location.longitude,
            lat_end: this.state.about.latitude,
            lon_end: this.state.about.longitude
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
        var order_date = moment(new Date()).format('YYYY-MM-DD');
        var order_time = moment(new Date()).format('HH:mm:ss');
        // var about_code = document.getElementById('about_code').value
        const date_now = new Date();
        var toDay = date_now.getFullYear() + "" + (date_now.getMonth() + 1) + "" + date_now.getDate() + "" + date_now.getTime();
        const data = new FormData();
        // var order_service = document.getElementById('order_service').value
        var total_sum = this.sumtotal()
        var order
        if (this.state.promotion != undefined) {
            order = {
                'table_code': this.state.result,
                // 'order_service': order_service,
                'customer_code': 'CM001',
                'order_date': toDay,
                'order_code': order_code,
                'promotion_code': this.state.promotion.promotion_code,
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price,
                'order_date': order_date,
                'order_time': order_time,
                'about_code': this.props.match.params.code
            }
        } else {
            order = {
                'table_code': this.state.result,
                // 'order_service': order_service,
                'customer_code': 'CM001',
                'order_date': toDay,
                'order_code': order_code,
                'promotion_code': '',
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price,
                'order_date': order_date,
                'order_time': order_time,
                'about_code': this.props.match.params.code
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
        this.handleTextChange()

    }

    async updateOrder(order_code) {
        var order = []
        const date_now = new Date();
        var toDay = date_now.getFullYear() + "" + (date_now.getMonth() + 1) + "" + date_now.getDate() + "" + date_now.getTime();
        const data = new FormData();
        // var order_service = document.getElementById('order_service').value
        var order_date = moment(new Date()).format('YYYY-MM-DD');
        var order_time = moment(new Date()).format('HH:mm:ss');
        var total_sum = this.sumtotal();
        const revised_num = await order_model.getOrderRevisedNum(this.state.order_code)
        var order
        // var about_code = document.getElementById('about_code').value

        if (this.state.promotion != undefined) {
            order = {
                // 'order_service': order_service,
                'customer_code': 'CM001',
                'order_date': toDay,
                'order_code': this.state.order_code,
                'promotion_code': this.state.promotion.promotion_code,
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price,
                'order_date': order_date,
                'order_time': order_time,
                'revised_num': revised_num.data.revised_num_max,
                'about_code': this.props.match.params.code

            }
        } else {
            order = {
                // 'order_service': order_service,
                'customer_code': 'CM001',
                'order_date': toDay,
                'order_code': this.state.order_code,
                'promotion_code': '',
                'order_total_price': total_sum.total,
                'amount': total_sum.sum_price,
                'order_date': order_date,
                'order_time': order_time,
                'revised_num': revised_num.data.revised_num_max,
                'about_code': this.props.match.params.code
            }
        }

        const update_revised = await order_model.updateRevisedByCode(order)
        const insert = await order_model.insertOrder(order)
        const update_revised_list = await order_list_model.updateRevisedListByCode(order)

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



        for (var key in this.state.cart) {
            var order_list = {
                order_code: this.state.order_code,
                menu_code: this.state.cart[key].code,
                order_list_qty: this.state.cart[key].count,
                order_list_name: this.state.cart[key].name,
                order_list_price_qty: this.state.cart[key].price,
                order_list_price_sum_qty: this.state.cart[key].count * this.state.cart[key].price,
                order_list_price_sum: total_sum.sum_price,
                revised_num: revised_num.data.revised_num_max
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
        this.handleTextChange()
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

                    <label style={{ color: '#EA2525', marginTop: '20px' }}>
                        {this.state.promotion.promotion_detail}
                    </label>

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
                <Row >
                    <Col lg="4" sm="6" xs="6">
                        <label style={{ fontWeight: 'bold', fontSize: '12pt' }}>ราคารวม</label>
                    </Col>
                    <Col lg="8" sm="6" xs="6">
                        <label style={{ fontWeight: 'bold', fontSize: '12pt' }}>{sumtotal.sum_price + ' ' + ' ' + 'บาท'}</label>
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

    // renderBranch() {

    //     if (this.state.branch_list != undefined) {
    //         var branch = []
    //         for (var key in this.state.branch_list) {
    //             branch.push(
    //                 <option value={this.state.branch_list[key].about_code} >{this.state.branch_list[key].about_name_th}</option>
    //             )
    //         }
    //         return branch;
    //     }
    // }
    hightlightMenu(menu) {
        for (var key in this.state.cart) {
            if (this.state.cart[key].code == menu.menu_code) {
                return 'rgb(222,184,135)'
            }
        }
        return 'transparent'
    }

    hightlightbuttonMenu(menu) {
        for (var key in this.state.cart) {
            if (this.state.cart[key].code == menu.menu_code) {
                return '#FFF8DC'
            }
        }
        return ''
    }

    renderBranchImg() {
        if (this.state.about_data != undefined) {
            var BranchImg = []
            BranchImg.push(
                <img style={{ width: '100%', height: '50%', display: 'block' }} src={GOBALS.URL_IMG + "about/" + this.state.about_data.about_img} />

            )
        } return BranchImg

    }


    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        const previewStyle = {
            height: '100%',
            width: '100%',
        }



        return (
            <div>
                {this.renderBranchImg()}

                <Row style={{ minWidth: '100%', height: '100%', minHeight: '80vh' }}>
                    <Col lg="12" style={{ padding: 0 }}>

                        {this.state.cart != null && this.state.cart != undefined ?



                            <Row className="shadow p" style={{ minWidth: '100%', }}>
                                <Col md="12" sm="12" xs="12" lg="12">
                                    <div class="card" style={{ height: '100%', borderWidth: 0, paddingTop: '5%' }}>
                                        <div class="container">
                                            <Row style={{ height: '100%', borderTop: '20px' }}>
                                                <Col md="12" sm="12" xs="12" lg="12">
                                                    <Row style={{ borderTop: '10px' }}>
                                                        <Col md="5" sm="4" xs="4" lg="5">
                                                            <div className="promition-input" >โปรโมชั่น </div>

                                                        </Col>
                                                        <Col md="7" sm="8" xs="8" lg="7" >
                                                            <Input type="text" id={"discount_code"} name={"discount_code"} onChange={this.getPromotion.bind(this)} />
                                                        </Col>
                                                    </Row>
                                                    <Row >

                                                        <Col md="12" sm="12" xs="12" lg="12" className="promition-text">
                                                            {this.renderpromotion()}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md="6" sm="12" xs="12" lg="6" style={{ paddingTop: '5%' }}>
                                                    {this.rendertotal()}
                                                </Col>
                                                <Col md="6" sm="12" xs="12" lg="6" style={{ paddingTop: '4%' }}>
                                                    {this.state.cart != undefined && this.state.cart != "" ?
                                                        <Row >
                                                            <Col lg='12' md="12" sm="12" xs="12">
                                                                <div>
                                                                    {this.state.order_code != undefined ?
                                                                        <div>
                                                                            <Row>
                                                                                <Col lg="8">
                                                                                <Button color="success" style={{ width: '100%', fontSize: '12pt' }} onClick={this.updateOrder.bind(this, this.state.order_code)}><label>สั่งอาหาร</label></Button>

                                                                                </Col>
                                                                                <Col lg="4">
                                                                                <Button color="info" style={{ fontSize: '12pt',color:'#fff' }} onClick={this.onBillDetail.bind(this, this.state.order_code)}><label>ดูบิล</label></Button>

                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                        : <Button color="success" style={{ width: '100%', fontSize: '12pt' }} onClick={this.showScanQR.bind(this)}><label>สั่งอาหาร</label></Button>
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        : ''}
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>


                                </Col>

                            </Row>

                            : ''}


                        <div class="col-lg-12 " style={{ paddingLeft: 0, paddingRight: 0, padding: 0 }}>
                            <nav>
                                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    {this.renderMenuType()}
                                </div>
                            </nav>
                            <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                    <Row>
                                        {this.renderMenuby()}
                                    </Row>

                                </div>
                            </div>
                        </div>



                    </Col>

                </Row >



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

            </div >
        )
    }
}
export default (HomeView);