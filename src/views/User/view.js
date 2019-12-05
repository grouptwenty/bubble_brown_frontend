import React, { Component } from 'react';
// import { Button, Table, Card, Pagination, PaginationLink, PaginationItem, CardHeader, Col, Row, Container } from 'reactstrap';
import { Col, Row, Container, Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import ImgDefault from '../../assets/img/default-user.png'

import MenuModel from '../../models/MenuModel'
import MenuTypeModel from '../../models/MenuTypeModel'
import OrderModel from '../../models/OrderModel'
import OrderListModel from '../../models/OrderListModel'

const menu_model = new MenuModel
const menutype_model = new MenuTypeModel
const order_model = new OrderModel
const order_list_model = new OrderListModel
var cart = [];
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            menutype_list: [],
            refresh: false

        };
        this.renderMenuby = this.renderMenuby.bind(this);
        this.renderMenuType = this.renderMenuType.bind(this);
        this.rendercart = this.rendercart.bind(this);
        this.addItemTocart = this.addItemTocart.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.rendertotal = this.rendertotal.bind(this);
        this.sumtotal = this.sumtotal.bind(this);
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

        var menu_list = await menu_model.getMenuByCode('MNT01')
        this.setState({
            menu_list: menu_list.data
        })

        // var menutype_list = await menutype_model.getMenuTypeBy()
        // console.log("menutype_list", menutype_list);
        // this.setState({
        //     menutype_list: menutype_list.data
        // })
        // var menulist = await menumodel.getMenuBy()
        // console.log("menulist", menulist);
        // this.setState({
        //     menulist: menulist.data
        // })
        // var menu_list = await menumodel.getMenuByCode('MNT01')
        // console.log("menulistbycode", menu_list);
        // this.setState({
        //     menu_list: menu_list.data
        // })
    }

    async getMenuByCode(code) {
        var menu_list = await menu_model.getMenuByCode(code)
        console.log("menulistbycode", menu_list);
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
                            <label style={{ margin: '15px' }} onClick={this.getMenuByCode.bind(this, this.state.menutype_list[i].menu_type_code)}>
                                {this.state.menutype_list[i].menu_type_name}
                            </label>
                        </div>
                    </Col>

                )
            }
            return type_list;
        }
    }

    // renderMenuType() {
    //     console.log("5555", this.state.menutype_list);
    //     if (this.state.menutype_list != undefined) {
    //         console.log("5555", this.state.menutype_list);

    //         var menu_list = []
    //         for (let i = 0; i < this.state.menutype_list.length; i++) {
    //             menu_list.push(
    //                 <Col style={{ borderWidth: 1, borderStyle: 'solid', height: 50, textAlign: 'center' }}>
    //                     <div>
    //                         <label onClick={this.getMenuByCode.bind(this, this.state.menutype_list[i].menu_type_code)}>
    //                             {this.state.menutype_list[i].menu_type_name}
    //                         </label>
    //                     </div>
    //                 </Col>

    //             )
    //         }
    //         return menu_list;
    //     }
    // }

    // renderMenu() {
    //     console.log("5555", this.state.menulist);
    //     if (this.state.menulist != undefined) {
    //         console.log("5555", this.state.menulist);

    //         var menulist = []
    //         for (let i = 0; i < this.state.menulist.length; i++) {
    //             menulist.push(
    //                 <Col>
    //                     <div> {this.state.menulist[i].menu_name} </div>
    //                 </Col>

    //             )
    //         }

    //     }
    // }

    addItem(data) {

        var name = data.menu_name;
        var price = data.menu_price;
        var code = data.menu_code;
        this.addItemTocart(name, price, code, 1)
    }

    addItemButton(data) {

        var name = data.name;
        var price = data.price;
        var code = data.code;
        this.addItemTocart(name, price, code, 1)
    }
    deleteItemButton(data) {

        var name = data.name;
        var price = data.price;
        var code = data.code;
        this.deleteItem(name, price, code, 1)
    }
    addItemTocart(name, price, code, count) {
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
            count: count
        });

        console.log("cart", cart);
        this.setState({
            cart: cart
        })
    }
    deleteItem(name, price, code, count) {
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
                    <Row >
                        <Col lg="4" style={{ paddingTop: '5px' }}><div>{this.state.cart[i].name}</div></Col>
                        <Col lg="4" style={{ paddingTop: '5px', textAlign: 'center' }}><div>{this.state.cart[i].price}</div></Col>

                        <Col lg="4" style={{ paddingTop: '5px', textAlign: 'center' }}><Button onClick={this.deleteItemButton.bind(this, this.state.cart[i])}> - </Button>{this.state.cart[i].count}<Button onClick={this.addItemButton.bind(this, this.state.cart[i])}> + </Button></Col>
                    </Row>
                )
            }
            return cart_list;
        }
    }

    renderMenuby() {
        if (this.state.menu_list != undefined) {
            console.log("5555", this.state.menu_list);
            var menulist = []
            for (let i = 0; i < this.state.menu_list.length; i++) {
                menulist.push(
                    <Col lg="4">
                        {/* <ClickNHold
                            time={0.5}
                            onStart={this.start}
                            onClickNHold={this.clickNHold}
                            onEnd={this.end} > */}
                        <Card onClick={this.addItem.bind(this, this.state.menu_list[i])}>
                            {/* <CardImg top width="100%" src="/logo_bubblebrown.png" alt="Card image cap" /> */}
                            <CardBody>
                                <CardTitle><label >{this.state.menu_list[i].menu_name}</label> </CardTitle>
                            </CardBody>
                        </Card>

                        {/* </ClickNHold> */}
                    </Col>
                )
            }
            return menulist;
        }
    }

    // renderMenuby() {
    //     console.log("5555", this.state.menu_list);
    //     if (this.state.menu_list != undefined) {
    //         console.log("5555", this.state.menu_list);
    //         var menulist = []
    //         for (let i = 0; i < this.state.menu_list.length; i++) {
    //             menulist.push(
    //                 <Col>
    //                     <div> {this.state.menu_list[i].menu_name} </div>
    //                 </Col>
    //             )
    //         }
    //         return menulist;
    //     }
    // }

    async insertOrder() {

        var order = []


        const max_code = await order_model.getOrderMaxCode()//province data
        var order_code = 'OD' + max_code.data.order_code_max
        console.log(max_code);

        const date_now = new Date();
        var toDay = date_now.getFullYear() + "" + (date_now.getMonth() + 1) + "" + date_now.getDate() + "" + date_now.getTime();
        const data = new FormData();
        order.push({
            'table_id': '01',
            'customer_code': 'CM001',
            'order_date': toDay,
            'order_code': order_code,
            'order_total_price': this.sumtotal()


        })
        console.log(order);

        const res = await order_model.insertOrder(order)
        for (var key in this.state.cart) {
            // this.state.cart[key].code
            // this.state.cart[key].count
            // this.state.cart[key].name
            // this.state.cart[key].price
            var order_list = {
                order_code: order_code,
                menu_code: this.state.cart[key].code,
                order_list_qty: this.state.cart[key].count,
                order_list_name: this.state.cart[key].name,
                order_list_price_qty: this.state.cart[key].price,
                order_list_price_sum_qty: this.state.cart[key].count * this.state.cart[key].price,
                order_list_price_sum: this.sumtotal()
            }
            const arr = await order_list_model.insertOrderList(order_list)
            // if (order_list != undefined) {
            //     swal({
            //         title: "Good job!",
            //         text: "Add user Ok",
            //         icon: "success",
            //         button: "Close",
            //     });
            //     this.props.history.push('/menu/')
            // }
        }

    }
    rendertotal() {
        if (this.state.cart != undefined) {
            var order_total = []
            var sum = 0;
            for (let i = 0; i < this.state.cart.length; i++) {
                sum += parseFloat(this.state.cart[i].count) * parseFloat(this.state.cart[i].price)
                console.log("..........", this.state.cart[i].count);
                console.log("..1........", this.state.cart[i].price);
            }
            order_total.push(
                <Row>
                    <Col lg="8" style={{ paddingTop: '30px' }}>
                        <label>ราคารวม</label>
                    </Col>
                    <Col lg="4" style={{ textAlign: 'center', paddingTop: '30px' }}>
                        <label>{sum}</label>
                    </Col>
                </Row>
            )
            console.log("3333333333", sum);
            // this.setState({
            //     sum_price: sum
            // })
            return order_total;
        }

    }
    sumtotal() {
        if (this.state.cart != undefined) {
            var sum = 0;
            for (let i = 0; i < this.state.cart.length; i++) {
                sum += parseFloat(this.state.cart[i].count) * parseFloat(this.state.cart[i].price)
            }
            console.log("3333333333", sum);
            this.setState({
                sum_price: sum
            })
            return sum;
        }

    }

    render() {
        // const renderMenuType = this.renderMenuType
        // if (this.state.menutype_list != undefined) {
        //     console.log("5555", this.state.menutype_list);

        //     var menu_list = []
        //     for (let i = 0; i < this.state.menutype_list.length; i++) {
        //         menu_list.push(
        //             <Col style={{ borderWidth: 1, borderStyle: 'solid', height: 50, textAlign: 'center' }}>
        //                 <label onClick={() => { this.renderMenuby(this.state.menutype_list.menu_type_code); }}>
        //                     <div style={{ marginTop: '2.5%' }}> {this.state.menutype_list[i].menu_type_name} </div>
        //                 </label>
        //             </Col>
        //         )
        //     }
        // }

        // if (this.state.menu_list != undefined) {
        //     console.log("5555", this.state.menu_list);

        //     var menulist = []
        //     for (let i = 0; i < this.state.menu_list.length; i++) {
        //         menulist.push(
        //             <Col style={{ borderWidth: 1, borderStyle: 'solid', height: 50, textAlign: 'center' }}>
        //                 <NavLink exact to={'dashboard'} style={{ width: '100%' }}>
        //                     <div style={{ marginTop: '2.5%' }}> {this.state.menu_list[i].menu_name} </div>
        //                 </NavLink>
        //                 {/* <div style={{ marginTop: '2.5%' }}> {this.state.menulist[i].menu_name} </div> */}
        //             </Col>
        //         )
        //     }
        // }
        return (

            // <div>

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

                        <Row >
                            <div style={{ paddingTop: '10px', paddingLeft: '10px', paddingBottom: '30px' }}> รายการอาหาร</div>

                        </Row>

                        {this.rendercart()}
                        {this.rendertotal()}
                        {this.state.cart != undefined && this.state.cart != "" ? <Row ><div style={{ paddingTop: '30px', textAlign: 'end' }}><Button onClick={this.insertOrder.bind(this)}><label>สั่งอาหาร</label></Button></div></Row> : ''}


                    </Col>
                </Row>

            </div>

            /* <Row style={{ minWidth: '100%', paddingTop: '2%', paddingBottom: '2%', marginLeft: '2%' }}>
                <Col lg="8">

                </Col>
                <Col lg="2" style={{ textAlign: 'right', marginTop: 5 }}>
                    <div> โซน A - โต๊ะ 1 </div>
                </Col>
                <Col lg="2" style={{ borderLeftWidth: 1, borderLeftStyle: 'solid', paddingLeft: '2%', paddingRight: '2%' }}>
                    <NavLink exact to={'dashboard'} style={{ width: '100%' }}>
                        <button class="btn btn-primary">เรียกพนักงาน</button>
                    </NavLink>
                </Col>


            </Row>
            <Row style={{ minWidth: '100%' }}>
                {this.renderMenuType()}
            </Row>

            <Row style={{ minWidth: '100%', height: '100%', minHeight: '68vh' }}>
                <Col lg="6" style={{ borderStyle: 'solid', borderWidth: 1 }}>
                    <Row style={{ minWidth: '100%' }}>
                        {this.renderMenuby()}
                    </Row>
                </Col>
                <Col lg="6" style={{ borderStyle: 'solid', borderWidth: 1 }}>
                    <Row>
                        <div style={{}}> รายการอาหาร</div>
                    </Row>
                    <Row >
                        <div style={{ position: 'relative' }}>
                            <div>
                                <NavLink exact to={'dashboard'} style={{ width: '100%' }}>
                                    <button class="btn btn-primary">สั่งอาหาร</button>
                                </NavLink>
                            </div>

                        </div>
                    </Row>


                </Col>
            </Row>
        </div > */

        )
    }
}
export default (HomeView);