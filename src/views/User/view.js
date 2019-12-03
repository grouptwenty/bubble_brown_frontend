import React, { Component } from 'react';
import { Button, Table, Card, Pagination, PaginationLink, PaginationItem, CardHeader, Col, Row, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import ImgDefault from '../../assets/img/default-user.png'

import MenuTypeModel from '../../models/MenuTypeModel'
import MenuModel from '../../models/MenuModel'

const menutype_model = new MenuTypeModel
const menumodel = new MenuModel
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            menutype_list: [],
            refresh: false

        };
        this.renderMenuType = this.renderMenuType.bind(this);
        this.renderMenuby = this.renderMenuby.bind(this);
    }


    async componentDidMount() {
        var menutype_list = await menutype_model.getMenuTypeBy()
        console.log("menutype_list", menutype_list);
        this.setState({
            menutype_list: menutype_list.data
        })
        var menulist = await menumodel.getMenuBy()
        console.log("menulist", menulist);
        this.setState({
            menulist: menulist.data
        })
        var menu_list = await menumodel.getMenuByCode('MNT01')
        console.log("menulistbycode", menu_list);
        this.setState({
            menu_list: menu_list.data
        })
    }
    async getMenuByCode(code) {
        var menu_list = await menumodel.getMenuByCode(code)
        console.log("menulistbycode", menu_list);
        this.setState({
            menu_list: menu_list.data
        })
    }

    renderMenuType() {
        console.log("5555", this.state.menutype_list);
        if (this.state.menutype_list != undefined) {
            console.log("5555", this.state.menutype_list);

            var menu_list = []
            for (let i = 0; i < this.state.menutype_list.length; i++) {
                menu_list.push(
                    <Col style={{ borderWidth: 1, borderStyle: 'solid', height: 50, textAlign: 'center' }}>
                        <div>
                            <label onClick={this.getMenuByCode.bind(this, this.state.menutype_list[i].menu_type_code)}>
                                {this.state.menutype_list[i].menu_type_name}
                            </label>
                        </div>
                    </Col>

                )
            }
            return menu_list;
        }
    }
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
    renderMenuby() {
        console.log("5555", this.state.menu_list);
        if (this.state.menu_list != undefined) {
            console.log("5555", this.state.menu_list);
            var menulist = []
            for (let i = 0; i < this.state.menu_list.length; i++) {
                menulist.push(
                    <Col>
                        <div> {this.state.menu_list[i].menu_name} </div>
                    </Col>
                )
            }
            return menulist;
        }
    }

    render() {
        const renderMenuType = this.renderMenuType
        if (this.state.menutype_list != undefined) {
            console.log("5555", this.state.menutype_list);

            var menu_list = []
            for (let i = 0; i < this.state.menutype_list.length; i++) {
                menu_list.push(
                    <Col style={{ borderWidth: 1, borderStyle: 'solid', height: 50, textAlign: 'center' }}>
                        <label onClick={() => { this.renderMenuby(this.state.menutype_list.menu_type_code); }}>
                            <div style={{ marginTop: '2.5%' }}> {this.state.menutype_list[i].menu_type_name} </div>
                        </label>
                    </Col>
                )
            }
        }

        if (this.state.menu_list != undefined) {
            console.log("5555", this.state.menu_list);

            var menulist = []
            for (let i = 0; i < this.state.menu_list.length; i++) {
                menulist.push(
                    <Col style={{ borderWidth: 1, borderStyle: 'solid', height: 50, textAlign: 'center' }}>
                        <NavLink exact to={'dashboard'} style={{ width: '100%' }}>
                            <div style={{ marginTop: '2.5%' }}> {this.state.menu_list[i].menu_name} </div>
                        </NavLink>
                        {/* <div style={{ marginTop: '2.5%' }}> {this.state.menulist[i].menu_name} </div> */}
                    </Col>
                )
            }
        }
        return (

            <div>

                <Row style={{ minWidth: '100%', paddingTop: '2%', paddingBottom: '2%', marginLeft: '2%' }}>
                    <Col lg="8">

                    </Col>
                    <Col lg="2" style={{ textAlign: 'right', marginTop: 5 }}>
                        <div> โซน A - โต๊ะ 1 </div>
                    </Col>
                    <Col lg="2" style={{ borderLeftWidth: 1, borderLeftStyle: 'solid', paddingLeft: '2%', paddingRight: '2%' }}>
                        <NavLink exact to={'dashboard'} style={{ width: '100%' }}>
                            <button class="btn btn-primary">เรียกพนักงาน</button>
                        </NavLink>
                        {/* <div> เรียกพนักงาน</div> */}
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
            </div >

        )
    }
}
export default (HomeView);