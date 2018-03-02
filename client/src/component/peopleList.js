import React, {Component} from 'react';
import { Card, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import ModalComponent from './modal';
import { getPeopleByCompany, deletePerson } from '../utils/serverAPI'

import '../style/component.css';

class PeopleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            peopleList: [],
            isEdit: false,
            selectedPerson: {}
        }
        this.addCardEvent = this.addCardEvent.bind(this)
        this.getPeopleList = this.getPeopleList.bind(this)
    }

    componentDidMount() {
       this.getPeopleList()
    }

    getPeopleList() {
        getPeopleByCompany(this.props.companyId)
            .then(response => {
                this.setState({
                    peopleList: response
                })
        })
    }

    addCardEvent(e) {
        this.setState({
            modal: !this.state.modal,
            isEdit: false
        })
    }

    getCompanyName() {
        const {companyList, companyId} = this.props
        let companyName = companyList.filter(company => {
            if(company._id === companyId) {
                return company.name
            }
        })
        return companyName
    }

    editPerson(ev) {
        let selPerson = ev.target.getAttribute('data-attr')
        this.setState({
            modal: !this.state.modal,
            isEdit: true,
            selectedPerson: selPerson ? JSON.parse(selPerson) : {}
        })
    }

    deletePerson(ev) {
        let personId = ev.target.getAttribute('data-attr')
        deletePerson(personId)
    }

    addCard() {
        return (
            <div key="add-card" className="Person-card">
                <Card>
                    <CardBody className="Card-addIcon-Person">
                        <i className="fa fa-plus" onClick={(e) => this.addCardEvent(e)}></i>
                    </CardBody>
                </Card>
            </div>
        )
    }

    renderPeopleCard() {
        let cardArr = []
        let addCard = this.addCard()
        const {peopleList} = this.state
        cardArr = (peopleList && peopleList.length) ? peopleList.map((person) => (
            <div key={person._id} className="Person-card">
                <Card>
                    <CardBody className="Card-body">
                        <CardTitle>{person.name}</CardTitle>
                        <div className="Card-utility">
                            <div className="Card-edit">
                                <i key={person._id} className="fa fa-edit" data-attr={JSON.stringify(person)} onClick={(e)=>this.editPerson(e)}></i>
                            </div>
                            <div className="Card-delete">
                                <i key={person._id} className="fa fa-trash" data-attr={person._id} onClick={(e)=>this.deletePerson(e)}></i>
                            </div>
                        </div>
                        <CardSubtitle className="Card-subtitle">Email: <span className="font-weight-light">{person.email}</span></CardSubtitle>
                    </CardBody>
                </Card>
            </div>
            )
        ) : []
        cardArr.unshift(addCard)
        return cardArr
    }

    render() {
        return(
            <div className="col-md-8 mx-auto">
                <h3 className="Company-title">People List By Company</h3>
                {this.renderPeopleCard()}
                <ModalComponent renderApp={this.getPeopleList} companyNames={this.props.companyList} companyId={this.props.companyId} modal={this.state.modal} toggle={this.addCardEvent} isCompany={false} isEdit={this.state.isEdit} selectedValue={this.state.selectedPerson}/>
            </div>
        )
    }
}

export default PeopleList;