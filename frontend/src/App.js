import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
import Profile from './components/Users/Profile'
import Login from './components/Common/login'
import Dashnavbar from './components/templates/Dashnavbar'
import Dashboard from './components/Common/dashboard_rec'
import Dashboard1 from './components/Common/dashboard_app'
import Sop from './components/Common/sop'
import Dashrecbar from './components/templates/Dashboardrec'
import Edit from './components/Recuiter/edit'
import View from './components/Recuiter/view'
import Applicant from './components/Applicant/view'
import MyApplicant from './components/Applicant/myapplication'
import Recappl from './components/Recuiter/myapplication'

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <div>
//           <Navbar />
//           <br />
//           <Route path="/" exact component={Home} />
//           <Route path="/users" exact component={UsersList} />
//           <Route path="/register" component={Register} />
//           <Route path="/Login" component={Login} />
//         </div>
//         <div>

//           <Route path="/dashboard" component={Dashboard} />
//           <Route path="/dashboard/profile" component={Profile} />
//         </div>
//       </div>
//     </Router>
//   );
// }

class App extends React.Component {
  render() {
    const DefaultRoutes = () => {
      console.log("hellotop\n");
      return (
        <div>
          <Navbar />
          <br />
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={UsersList} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />

        </div>
      );
    };
    const DashboardRoutes = () => {
      console.log("hiksjdhskfi\n")
      return (

        <div>
          <Dashnavbar />
          <Route exact path="/dashboard/profile" component={Profile} />
          <Route exact path="/dashboard/myapplication" component={MyApplicant} />
          <Route eact path="/dashboard/sop" component={Sop} />
          <Route exact path="/dashboard" exact component={Dashboard1} />
        </div>

      );
    };
    const DashboardRec = () => {
      console.log("byebye");
      return (

        <div>
          <Dashrecbar />
          <Route exact path="/recdashboard/edit" component={Edit} />
          <Route exact path="/recdashboard/profile" component={Profile} />
          <Route exact path="/recdashboard/view/applicant" component={Applicant} />
          <Route exact path="/recdashboard/view" component={View} />
          <Route exact path="/recdashboard/myapplication" component={Recappl} />
          <Route exact path="/recdashboard" component={Dashboard} />
          {
            console.log("byebye2")
          }
        </div>
      )

    }
    return (
      <Router>
        <Switch>

          <Route component={DashboardRoutes} path="/dashboard" />
          <Route component={DashboardRec} path="/recdashboard" />
          <Route component={DefaultRoutes} path="/" />

          {/* <Route exact component={Profile} path="/dashboard/profile" /> */}


        </Switch>

      </Router>
    );

  }
}

export default App;
