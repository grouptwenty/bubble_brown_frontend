import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const BranchView = React.lazy(() => import('./view'));
// const OrderInsert = React.lazy(() => import('./insert'));
// const OrderEdit = React.lazy(() => import('./update'));

class Branch extends Component {
  async componentDidMount() {
    console.log("hhhh");
    

  }
  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/branch" render={props => <BranchView {...props} />} />
            {/* <Route exact path="/user/insert" render={props => <OrderInsert {...props} />} />
            <Route exact path="/user/update/:code" render={props => <OrderEdit {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (Branch);
