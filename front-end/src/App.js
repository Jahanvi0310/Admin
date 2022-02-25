import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './containers/index'
import BasicTableComponent from './components/basic.table';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Category = React.lazy(() => import('./views/pages/Category/Category'));
const SubCategory = React.lazy(() => import('./views/pages/SubCategory/SubCategory'));
const Product = React.lazy(() => import('./views/pages/Product/Product'));
const ChangePassword = React.lazy(() => import('./views/pages/ChangePassword/ChangePassword'));
const Table = React.lazy(() => import('./components/basic.table'));


class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} /> */}
              {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
      <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
         <Route exact path="/" name="Home" render={props => <Category {...props}/>} />
         <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="registration" render={props => <Register {...props}/>} />

          <Route exact path="/SubCategory" name="SubCategory" render={props => <SubCategory {...props}/>} />
          <Route exact path="/Product" name="Product" render={props => <Product {...props}/>} />
          <Route exact path="/ChangePassword" name="ChangePassword" render={props => <ChangePassword {...props}/>} />
          <Route exact path="/Table" name="Table" render={props => <Table {...props}/>} />
          
        </div>
        <TheFooter/>
      </div>
    </div>
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
