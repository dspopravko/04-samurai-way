import React from "react";
import {Field, Form, Formik} from "formik";

export interface FormDataType {
    email: string
    password: string
    rememberMe: boolean
}

interface SendMessageFormInterface {
    onSubmit: (data: FormDataType, setSubmitting: (isSubmitting: boolean) => void ) => void
}

export const LoginForm = (props: SendMessageFormInterface) => {

    return (
        <>
            <Formik
                initialValues={{email: "", password: "", rememberMe: false}}
                onSubmit={(values: FormDataType, {resetForm, setSubmitting, setErrors}) => {
                    props.onSubmit(values, setSubmitting)
                    resetForm()
                    setSubmitting(true)
                }}
            >
                {({handleSubmit, handleChange, values, touched, errors, isSubmitting}) => (
                    <Form name={'loginForm'}>
                            <span>Login:</span>
                        <div>
                            <Field type="email" name="email" placeholder="smith@gmail.com"/>
                            {touched.email && errors.email && <div>{errors.email}</div>}
                        </div>
                            <span>Password:</span>
                        <div>
                            <Field type="password" name="password" placeholder="secret!password"/>
                            {touched.password && errors.password && <div>{errors.password}</div>}
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>
                    </Form>)}
            </Formik>


        </>
    )
}
