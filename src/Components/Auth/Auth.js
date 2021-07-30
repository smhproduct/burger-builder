import React, { Component } from 'react';
import { Formik } from 'formik';
import { auth } from '../../redux/authActionCreators';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

class Auth extends Component {
    state = {
        disableConfirmPassword: true,
        mode: 'Sign Up'
    }

    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"
        })
    }
    render() {
        return (
            <div>
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }
                    }

                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }

                    }

                    validate={
                        (values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                                return errors;
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "Invalid Email Address";
                                return errors;
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                                this.setState({
                                    disableConfirmPassword: true
                                })
                                return errors;
                            } else if (values.password.length < 6) {
                                errors.password = 'Must be atleast 6 characters!';
                                return errors;
                            } else this.setState({
                                disableConfirmPassword: false
                            })

                            if (this.state.mode === "Sign Up") {
                                if (!values.passwordConfirm) {
                                    errors.passwordConfirm = 'Required';
                                    return errors;
                                } else if (values.password !== values.passwordConfirm) {
                                    errors.passwordConfirm = 'Password field does not match!';
                                    return errors;
                                }
                            }


                            //console.log(errors);

                        }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div style={{ border: '1px gray solid', padding: '15px', borderRadius: '7px' }}>
                            <div style={{ color: '#d70f64', fontSize: 'x-large', marginLeft: '10px', fontWeight: '500' }}>{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</div>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: 'red' }}>{errors.email}</span>
                                <br />
                                <input
                                    type='password'
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: 'red' }}>{errors.password}</span>
                                <br />
                                {this.state.mode === "Sign Up" ? <div>
                                    <input
                                        type='password'
                                        name="passwordConfirm"
                                        placeholder="Confirm Password"
                                        className="form-control"
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                        disabled={this.state.disableConfirmPassword}
                                    />
                                    <span style={{ color: 'red' }}>{errors.passwordConfirm}</span>
                                    <br />
                                </div> : null}
                                <span>
                                    <button type="submit" style={{ backgroundColor: '#d70f64', color: "white" }} className="btn">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                                    <button type="button" style={{
                                        marginLeft: '10px',
                                        backgroundColor: '#ededed',
                                        color: '#d70f64'
                                    }} className="btn " onClick={this.switchModeHandler}>Switch to {this.state.mode === 'Sign Up' ? "Login" : "Sign Up"}</button>
                                </span>
                            </form>
                        </div>)}
                </Formik>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Auth);