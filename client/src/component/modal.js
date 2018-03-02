import React, {Component} from 'react';
import { 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
    Col,
    Form,
    FormGroup,
    Label,
    Input } from 'reactstrap';
import {addCompany, updateCompany, addPerson, updatePerson} from '../utils/serverAPI';

class ModalComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            revenue: '',
            phone: 0,
            email: '',
            companySelect: ''
        }

        this.handleNameUpdate = this.handleNameUpdate.bind(this)
        this.handleAddressUpdate = this.handleAddressUpdate.bind(this)
        this.handleRevenueUpdate = this.handleRevenueUpdate.bind(this)
        this.handlePhoneUpdate = this.handlePhoneUpdate.bind(this)
        this.handleEmailUpdate = this.handleEmailUpdate.bind(this)
        this.handleCompanyUpdate = this.handleCompanyUpdate.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    submitForm(e) {
        e.preventDefault()
        const {name, address, revenue, phone, email, companySelect} = this.state
        const {isEdit, selectedValue, isCompany, companyId} = this.props
        if(isCompany){
            const companyObj = {}
            //Updates updated value from two objects. So Object.assign doesn't work
            companyObj['name'] = name || selectedValue.name
            companyObj['address'] = address || selectedValue.address
            companyObj['revenue'] = revenue || selectedValue.revenue
            companyObj['phone'] = phone || selectedValue.phone
            companyObj['email'] = email || selectedValue.email
            if(!isEdit) {
                addCompany(companyObj)
            } else {
                updateCompany(selectedValue._id, companyObj)
            }
        } else {
            const personObj = {}
            //Updates updated value from two objects. So Object.assign doesn't work
            personObj['name'] = name || selectedValue.name
            personObj['companyId'] = companyId || selectedValue.companyId
            personObj['email'] = email || selectedValue.email
            if(!isEdit) {
                personObj['companyId'] = companySelect ? companySelect : personObj['companyId']
                addPerson(personObj)
            } else {
                updatePerson(selectedValue._id, personObj)
            }

        }
        this.props.toggle()
        this.props.renderApp()
    }

    companyListOptions() {
        const {companyNames} = this.props
        let companyListEle = []
        companyListEle = (companyNames && companyNames.length) ? companyNames.map(company => (
            <option key={company._id} data-attr={company._id}>{company.name}</option>
        )) : []
        return companyListEle
    }

    handleNameUpdate = (ev) => {
        ev.preventDefault()
        this.setState({name: ev.target.value})
    }

    handleAddressUpdate = (ev) => {
        ev.preventDefault()
        this.setState({address: ev.target.value})
    }

    handleRevenueUpdate = (ev) => {
        ev.preventDefault()
        this.setState({revenue: parseInt(ev.target.value)})
    }

    handlePhoneUpdate = (ev) => {
        ev.preventDefault()
        this.setState({phone: ev.target.value})
    }

    handleEmailUpdate = (ev) => {
        ev.preventDefault()
        this.setState({email: ev.target.value})
    }

    handleCompanyUpdate = (ev) => {
        ev.preventDefault()
        this.setState({companySelect: ev.target.selectedOptions[0].getAttribute('data-attr')})
    }


    formGroup() {
        const {isCompany, selectedValue, isEdit, fromPage} = this.props
        let formEle = (isCompany) ? 
            (
                <Form>
                    <FormGroup row>
                        <Label for="name" sm={2}>Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="name" id="companyName" defaultValue={isEdit ? selectedValue.name : ''} onChange={(ev)=>this.handleNameUpdate(ev)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="address" sm={2}>Address</Label>
                        <Col sm={10}>
                            <Input type="text" name="address" id="companyAddress" defaultValue={isEdit ? selectedValue.address : ''} onChange={(ev)=>this.handleAddressUpdate(ev)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="revenue" sm={2}>Revenue</Label>
                        <Col sm={10}>
                            <Input type="number" name="revenue" id="companyRevenue" defaultValue={isEdit ? selectedValue.revenue : ''} onChange={(ev)=>this.handleRevenueUpdate(ev)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="phone" sm={2}>Phone</Label>
                        <Col sm={10}>
                            <Input type="tel" name="phone" id="companyPhone" defaultValue={isEdit ? selectedValue.phone : ''} onChange={(ev)=>this.handlePhoneUpdate(ev)}/>
                        </Col>
                    </FormGroup>
                </Form>
            ) :
            (
                <Form>
                    <FormGroup row>
                        <Label for="name" sm={2}>Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="name" id="companyName" defaultValue={isEdit ? selectedValue.name : ''} onChange={(ev)=>this.handleNameUpdate(ev)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="text" name="email" id="companyEmail" defaultValue={isEdit ? selectedValue.email : ''} onChange={(ev)=>this.handleEmailUpdate(ev)}/>
                        </Col>
                    </FormGroup>
                   {(fromPage) ? 
                    <FormGroup row>
                        <Label for="companyList" sm={2}>Company List</Label>
                        <Col sm={10}>
                            <Input type="select" name="companyList" id="companyList" onChange={(ev)=>this.handleCompanyUpdate(ev)}>
                                {this.companyListOptions()}
                            </Input>
                        </Col>
                    </FormGroup> : null}
                </Form>
            )
        return formEle
    }

    render() {
        const {isCompany} = this.props
        return (
            <div>
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader>{(isCompany) ? 'Add Company' : 'Add Person'}</ModalHeader>
                <ModalBody>
                    {this.formGroup()}
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.submitForm}>Submit</Button>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </div>
        )
    }
}

export default ModalComponent;