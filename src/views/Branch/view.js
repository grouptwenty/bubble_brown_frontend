import React, { Component } from 'react';
import { Col, Row, CardHeader, Card, CardImg, CardText, CardBody, FormGroup, CardTitle, Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, CardFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';
import GOBALS from '../../GOBALS'
import ImgDefault from '../../assets/img/font.png'
import BackGroung from './3061714.jpg';
// import { Search } from 'semantic-ui-react';
import ReactSearchBox from 'react-search-box'
import AboutModel from '../../models/AboutModel'

var about_model = new AboutModel;

var cart = [];

class Branch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],

            refresh: false,
            delay: 400,
            result: 'No result',
        };

        this.renderBranch = this.renderBranch.bind(this)

    }


    async componentDidMount() {


        var about = await about_model.getAboutBy()

        console.log('about', about);

        this.setState({
            about: about.data,
        })


    }
    Order(about_code) {
        // console.log(about_code);

        this.props.history.push('/order/' + about_code)
    }

    renderBranch() {

        if (this.state.about != undefined) {
            var about_data = []
            for (var key in this.state.about) {
                about_data.push(
                    <Col lg="6" className="row-branch">
                        <Card className="shadow p main" style={{ borderWidth: 0 }}
                            onClick={this.Order.bind(this, this.state.about[key].about_code)}
                        >
                            <CardImg top width="50px" height="100%" src={GOBALS.URL_IMG + "about/" + this.state.about[key].about_img} alt="Card image cap" />
                            {/* <CardTitle >{this.state.about[key].about_name_th}</CardTitle> */}
                        </Card>
                    </Col>

                )
            }
            return about_data;
        }
    }

    async getAboutByKey(value) {
        // console.log("value",value);


        // var keyword = document.getElementById("keyword").value

        var keyword = await about_model.getAboutByKey({ value: value })
        console.log("keyword", keyword);



        this.setState({
            about: keyword.data,
        })
    }

    render() {
        var about = this.state.about
        console.log('about', about);

        var graph = []
        for (var i in about) {

            graph.push({ key: about[i].about_name_th, value: about[i].about_name_th })
        }
        return (
            <div className="vc" ref="iScroll" style={{ height: "100%", verflow: "auto", }}>

                <section class="cd-section cd-section--bg-fixed" style={{ backgroundImage: `url(${BackGroung})`, }}>
                    <Row style={{ paddingTop: '5%', paddingLeft: '5%' }}>
                        <Col lg="12">
                        <img src={ImgDefault} className="img-avatar"  />
                        </Col>

                    </Row>
                    <Row style={{ paddingTop: '2%', paddingLeft: '5%' }}>
                        <Col lg="12">
                            <label style={{ fontSize: '17px' }}>เลือกสาขา แล้วสั่งอาหารเลย</label>
                        </Col>

                    </Row>
                    <Row style={{ paddingTop: '1%', paddingLeft: '5%', }}>
                        <Col lg="8" >
                            <ReactSearchBox
                                className="shadow p"
                                inputBoxHeight={'50px'}
                                data={graph}
                                inputBoxFontSize={'16px'}
                                placeholder="ค้นหาสาขา"
                                // callback={record => console.log('record', record)}
                                // onChange={value => console.log('value', value)}

                                onChange={(value) => { this.getAboutByKey(value) }}
                            // onChange={this.getProductByKey.bind(this)}
                            />
                        </Col>

                    </Row>
                    <Row style={{ paddingTop: '5%', paddingLeft: '5%' }}>
                        <Col lg="12">
                            <label style={{ fontSize: '25px' }}>สาขาของเรา</label>
                        </Col>

                    </Row>
                    <Row style={{ background: 'transparent', paddingTop: '10px', paddingLeft: '5%', paddingRight: '5%' }} className="row-branch">

                        {this.renderBranch()}

                    </Row>
                </section>



            </div>


        )
    }
}
export default (Branch);