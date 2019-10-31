import React from 'react';
import Login from './component/admin/login'
import Mainboard from './component/admin/mainboard';
import app from 'firebase/app';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams, Redirect
} from "react-router-dom";
export default class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.auth = app.auth();
    this.state = {
      collapsed: false,
      user: null,
      redirect: true
    };
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  componentWillMount() {
    this.auth
      .onAuthStateChanged(demo => {
        if (demo) {
          // User is signed in.
          this.setState({ user: demo.email });
          // localStorage.setItem("user", user.uid)
          console.log(demo)
        } else {
          // this.setState({ redirect: false })
        }
      });
  }
  logout() {
    this.auth
      .signOut()
    // .then(() =>
    //   this.setState({
    //     redirect: false
    //   })
    // )
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" render={() =>
              <Mainboard
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse.bind(this)}
                currentuser={this.state.user}
                logout={this.logout.bind(this)}
              />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
