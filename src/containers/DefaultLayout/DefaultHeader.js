import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import sygnet from '../../assets/img/brand/sygnet.svg'
import { connect } from 'react-redux';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props)


  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        {/* <NavLink to="/dashboard"  > */}

        {/* <AppNavbarBrand
          full={{ src: logo, width: 65, height: 65, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        /> */}
        {/* </NavLink> */}
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}
        {/* <img src="/icon.png" height={60} width={60}/> */}

        <Row style={{ width: '100%', textAlign: 'center' }}>
          <Col md="4">
            <NavLink to="/User"  >
              <strong class="title-menu">สั่งอาหาร</strong>
            </NavLink>
          </Col>
          <Col md="4">
            <NavLink to="/dashboard" >
              <strong class="title-menu">จองโต๊ะ</strong>
            </NavLink>
          </Col>
          <Col md="4">
            <NavLink to="/dashboard" >
              <strong class="title-menu">โปรโมชั่น</strong>
            </NavLink>
          </Col>


          {/* <input type="hidden" id="sub_id" value={this.props.user.admin_code} /> */}
          <Nav className="ml-auto" navbar>
            {/* <p class="name-project">Suranaree Journal of Science and Techonilogy</p> */}
            {/* <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 01</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 02</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 03</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 04</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 05</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 06</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 07</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 08</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 09</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Notificaation 10</strong></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>See All</strong></DropdownItem>

            </DropdownMenu>
          </AppHeaderDropdown>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <NavLink to="#" className="nav-link"> {this.props.user.admin_name + '  ' + this.props.user.admin_lastname}   <i className="fa fa-user"></i> </NavLink>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown> */}
          </Nav>
        </Row>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;
const mapStatetoProps = (state) => {
  return {
    user: state.user,
  }
}
export default connect(mapStatetoProps)(DefaultHeader);

