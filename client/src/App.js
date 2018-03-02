import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import { getCompanies } from './utils/serverAPI';
import CompanyList from './component/companyList';
import PeopleList from './component/peopleList';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import './App.css';

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
          companyList: []
      }
      this.getCompanyList = this.getCompanyList.bind(this)
  }

  componentDidMount() {
    this.getCompanyList()
  }

  getCompanyList() {
    getCompanies().then(response => {
      this.setState({
          companyList: response
      })
    })
  }

  appHeader() {
    return (
      <div className="App-header">
        <span className="App-title">
          <Link to='/'>SigFig-RT</Link>
        </span>
      </div>
    )
  }

  render() {
    const {companyList} = this.state
    return (
      <div className="App">
        {this.appHeader()}
        <Switch>
          <Route exact path='/' render={() => (
            <CompanyList getCompanyList={this.getCompanyList} companyList={companyList}/>
          )}/>
          <Route name="people" path='/companies/:companyId/people' render={(location) => (
            <PeopleList companyList={companyList} companyId={location.match.params.companyId}/>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
