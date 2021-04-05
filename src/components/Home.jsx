import React, {Component} from 'react';
import {Formik, Field, Form} from 'formik';
import LoansService from '../services/LoansService.js'
import './Home.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableContent: [],
            updatedSuccessfully:false,
            updatedMessage:'',
            messageType:'successMsg'
        }
      }

    updateState = (response, action) => {
        let newContent = [];
        let updatedMessage = "";
        let responseType = "successMsg";

        if (action === "create"){
            newContent.push(response.data);
            updatedMessage="Loan created successfully";
        }
        else if (action === "get"){
            if (response.data.length){
                response.data.forEach(loan =>{
                    newContent.push(loan);
                });
            }
            else{
                newContent.push(response.data);
            }
            updatedMessage="Loans"
        }
        else if (action==="update"){
            updatedMessage="Loan updated successfully"
        }
        else{
            if (response.message === "Network Error"){
                updatedMessage = "Network Error - Cannot connect to server";
            }else{
                updatedMessage = "Error: " +response.response.status + " - " +
                    response.response.data==="" ? "Not Found" : JSON.stringify(response.response.data);
            }

            responseType="errorMsg"
        }

        this.setState({tableContent:newContent, updatedSuccessfully:true, updatedMessage: updatedMessage, messageType: responseType});
    }

    handleSubmit = (values) => {
        let action = window.event.submitter.id;

        if (action === "create"){
            LoansService.createLoan(values, this.updateState);
        }
        else if (action === "update"){
            LoansService.updateLoan(values, this.updateState);
        }
        else{
            LoansService.getLoans(values["id"], this.updateState);
        }
      }

    updatedMessageDiv = () => {return };

    render(){
        let fields={id:'', amount:'', interestRate:'', lengthOfLoan:'', monthlyPaymentAmount:''};

        let section = <section>
                          <table id="itemTable" className="loans-table">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Amount</th>
                                <th>Interest Rate</th>
                                <th>Length of Loan</th>
                                <th>Monthly Payment Amount</th>
                                <th>Created Date</th>
                                <th>Last Update Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.tableContent.map((item) =>
                                <tr key={item.id}>
                                  <td>{item.id}</td>
                                  <td>{item.amount}</td>
                                  <td>{item.interestRate}</td>
                                  <td>{item.lengthOfLoan}</td>
                                  <td>{item.monthlyPaymentAmount}</td>
                                  <td>{item.createdDate}</td>
                                  <td>{item.lastUpdateDate}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </section>;

    return(
        <div>
            <Formik onSubmit={this.handleSubmit} enableReinitialize initialValues={fields} >
                {
                    (props) => (
                        <Form>
                            <fieldset className="form-group">
                                <Field className="form-control" name="id" placeholder='ID' autoComplete="off"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <Field className="form-control"  name="amount" placeholder='Amount' autoComplete="off"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <Field className="form-control"  name="interestRate" placeholder='Interest Rate' autoComplete="off"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <Field className="form-control"  name="lengthOfLoan" placeholder='Length of Loan' autoComplete="off"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <Field className="form-control"  name="monthlyPaymentAmount" placeholder='Monthly Payment Amount' autoComplete="off"/>
                            </fieldset>

                            <br/>
                            <button id="create" className="btn" type="submit"> Create Loan </button>
                            <button id="update" className="btn" type="submit"> Update Loan </button>
                            <button id="get" className="btn" type="submit"> Show Loan Details</button>
                        </Form>
                    )
                }
            </Formik>

            <br/>
            {this.state.updatedSuccessfully && <h1 className={this.state.messageType}>{this.state.updatedMessage}</h1>}
            {this.state.updatedSuccessfully && section}


        </div>)
    }
}
