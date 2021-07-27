import React, { Component } from 'react';
import { Formik } from 'formik';

class Auth extends Component {
    state = {
        disableConfirmPassword: true,
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
                            console.log(values);
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
                            } else if (values.password.length < 4) {
                                errors.password = 'Must be atleast 4 characters!';
                                return errors;
                            } else this.setState({
                                disableConfirmPassword: false
                            })

                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                                return errors;
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = 'Password field does not match!';
                                return errors;
                            }
                            //console.log(errors);

                        }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div style={{ border: '1px gray solid', padding: '15px', borderRadius: '7px' }}>
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
                                <button type="submit" className="btn btn-success">Sign Up</button>
                            </form>
                        </div>)}
                </Formik>
            </div>
        )
    }
}

export default Auth;