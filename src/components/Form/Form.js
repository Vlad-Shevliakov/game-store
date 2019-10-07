import React, { useState } from "react"
import { Link } from "react-router-dom"
import classes from "./Form.module.scss"
import { Formik } from "formik"
import { Button, Form } from "react-bootstrap"
import * as Yup from "yup"


const requiredSchema = Yup.object().shape({
    email: Yup.string()
        .email("invalid email")
        .required("This field cannot be empty"),
    password: Yup.string()
        .min(8)
        .matches(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])"), "password should contain at least one number, symbol and letter")
        .required("This field cannot be empty"),

})


const FormComponent = props => {

    const [isLoading, setLoading] = useState(false)

    const { loginMode } = props

    const logInHandler = values => {
        console.log("values:", values)
        saveDataLocal(values)
        setLoading(true)
        // просто пока для теста
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    const saveDataLocal = data => {
        localStorage.authorizationData = JSON.stringify({...data})
    }

    return (
        <section className={classes.form}>
            <div>
                <Formik
                    onSubmit={logInHandler}
                    validationSchema={requiredSchema}
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                >
                    {
                        ({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            touched,
                            isValid,
                            errors,
                        }) => (
                            // noValidate это для html5
                            <Form noValidate onSubmit={handleSubmit}>
                                <div className={classes.form_title}>
                                    <h3>{ loginMode ? "Log in" : "Sign up" }</h3>
                                    {
                                        loginMode ? 
                                            <p>or <Link to="/signup">sign up</Link> here</p>
                                            :
                                            <p>or <Link to="/login">log in</Link> to your account</p>
                                    }
                                </div>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>
                                        <i className="far fa-envelope" />
                                        Email address
                                    </Form.Label>
                                    <Form.Control 
                                        onChange={handleChange} // чтобы не использовать Field
                                        onBlur={handleBlur}
                                        name="email" 
                                        type="email" 
                                        placeholder="Enter your email"
                                        isInvalid={touched.email && errors.email}
                                        isValid={touched.email && !errors.email}
                                    />
                                    {/* Фидбек только для ошибок */}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>
                                        <i className="fas fa-lock" />
                                        Password
                                    </Form.Label>
                                    <Form.Control 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="password" 
                                        type="password" 
                                        placeholder="Password"
                                        isInvalid={touched.password && errors.password}
                                        isValid={touched.password && !errors.password}
                                    />
                                    {/* Фидбек только для ошибок */}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>

                                    { !loginMode ?  
                                        <Form.Text as="div">
                                            <p className={classes.sub_info}>
                                                Your password must be at least 8 characters long
                                            </p>
                                        </Form.Text> : null
                                    }
                                </Form.Group>
                                <Form.Group>
                                    <Button 
                                        className={classes.subm_btn}
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading ?  "Loading…" : loginMode ? "Log in" : "Sign up"
                                        }
                                    </Button>
                                </Form.Group>   
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </section>
    )
}


export default FormComponent