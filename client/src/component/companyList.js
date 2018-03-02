import React, {Component} from 'react';
import { Card, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import {Link} from 'react-router-dom';
import ModalComponent from './modal';

import '../style/component.css';

class CompanyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyList: [],
            modal: false,
            isEdit: false,
            isCompany: true,
            selectedCompany: {}
        }
        this.addCardEvent = this.addCardEvent.bind(this)
        this.editCompany = this.editCompany.bind(this)
    }

    addCardEvent(e) {
        this.setState({
            modal: !this.state.modal,
            isEdit: false,
            isCompany: true
        })
    }

    addPeopleEvent(e) {
        this.setState({
            modal: !this.state.modal,
            isEdit: false,
            isCompany: false
        })
    }

    addCard() {
        return (
            <div key="add-card" className="Company-card">
                <Card>
                    <CardBody className="Card-addIcon">
                        <i className="fa fa-plus" onClick={(e) => this.addCardEvent(e)}></i>
                    </CardBody>
                </Card>
            </div>
        )
    }

    addPeople() {
        return (
            <div key="add-person-card" className="Company-card">
                <Card>
                    <CardBody className="Card-addPersonIcon">
                        <i className="fa fa-user-plus" onClick={(e) => this.addPeopleEvent(e)}></i>
                    </CardBody>
                </Card>
            </div>
        )
    }

    editCompany(ev) {
        let selCompany = ev.target.getAttribute('data-attr')
        this.setState({
            modal: !this.state.modal,
            isEdit: true,
            selectedCompany: selCompany ? JSON.parse(selCompany) : {}
        })
    }

    renderCard() {
        let cardArr = []
        let addCard = this.addCard()
        let addPersonCard = this.addPeople()
        const {companyList} = this.props
        cardArr = companyList.length ? companyList.map((company) => (
            <div key={company._id} className="Company-card">
                <Card>
                    <CardBody className="Card-body">
                        <CardTitle>{company.name}</CardTitle>
                        <div className="Card-utility">
                            <div className="Card-edit">
                                <i key={company._id} data-attr={JSON.stringify(company)} className="fa fa-edit" onClick={(e)=>this.editCompany(e)}></i>
                            </div>
                        </div>
                        <CardSubtitle className="Card-subtitle">Address: <span className="font-weight-light">{company.address}</span></CardSubtitle>
                        <CardSubtitle className="Card-subtitle">Phone: <span className="font-weight-light">{company.phone}</span></CardSubtitle>
                        <CardSubtitle className={`Card-subtitle Button-spacing`}>Revenue: <span className="font-weight-light">{company.revenue}</span></CardSubtitle>
                        <Link to={`/companies/${company._id}/people`} color="primary" className="People-btn" data-attr={company._id}>People who work here</Link>
                    </CardBody>
                </Card>
            </div>
            )
        ) : []
        cardArr.unshift(addPersonCard)
        cardArr.unshift(addCard)
        return cardArr
    }

    render() {
        return (
            <div className="col-md-8 mx-auto">
                <h3 className="Company-title">Company List</h3>
                {this.renderCard()}
                {(this.state.isCompany) ?
                    <ModalComponent renderApp={this.props.getCompanyList} modal={this.state.modal} toggle={this.addCardEvent} isCompany={this.state.isCompany} isEdit={this.state.isEdit} selectedValue={this.state.selectedCompany}/>
                    : <ModalComponent renderApp={this.props.getCompanyList} companyNames={this.props.companyList} modal={this.state.modal} toggle={this.addCardEvent} isCompany={this.state.isCompany} fromPage={'Company'} isEdit={this.state.isEdit} selectedValue={this.state.selectedCompany}/>
                }
            </div>
        )
    }
}

export default CompanyList;