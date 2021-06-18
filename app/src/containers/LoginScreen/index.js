import React, { Fragment } from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import styles from './styles';
import AuthButton from '../../components/AuthButton'
import BackButton from '../../components/BackButton'
import * as navigation from '../../utils/navigation'
import { setAccessToken } from '../../utils/request'
import { Formik } from 'formik'
import * as yup from 'yup'
import { url } from '../../utils/global-constant'

export default class Logincreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container} >
                <BackButton onPress={() => navigation.goBack()} />
                <Text style={styles.login}>LOG IN</Text>
                <Text style={styles.message}>Good to see you again</Text>
                <Formik initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            // navigation.navigate('MainTab');
                            var info = {
                                email: values.email,
                                password: values.password,
                            }

                            fetch( url + "/login", {
                                method: "POST",
                                body: JSON.stringify(info),
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                }
                            })
                                .then(response => response.json())
                                .then(response => {
                                    if (response.error) {
                                        console.log("Login Unsuccesfully", response);
                                        alert(response.error);
                                    }
                                    else {
                                        console.log("Login Succesfully", response);
                                        alert("Login Succesfully");
                                        setAccessToken(response.token);
                                        navigation.navigate('MainTab');
                                    }
                                })
                                .catch(error => {
                                    console.log("Login Unsuccesfully", error);
                                    alert("Login Unsuccesfully");
                                });
                        }}
                        validationSchema={
                            yup.object().shape({
                             email: yup
                               .string()
                               .email("Not a valid e-mail")
                               .required("E-mail is required"),
                            password: yup
                                .string()
                                .min(6)
                                .required("Password is required"),
                           })}>
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => 
                        (
                            <Fragment>
                                <TextInput style={styles.email} 
                                            placeholder='Your email' 
                                            value={values.email}
                                            onBlur={() => setFieldTouched('email')}
                                            onChangeText={handleChange('email')}/>
                                {touched.email && errors.email &&
                                    <Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.email}</Text>
                                }
                                <TextInput style={styles.password} 
                                            placeholder='Password'
                                            secureTextEntry={true}
                                            value={values.password}
                                            onBlur={() => setFieldTouched('password')}
                                            onChangeText={handleChange('password')}/>
                                {touched.password && errors.password &&
                                    <Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.password}</Text>
                                }
                                <AuthButton  buttonStyles={styles.loginBtn} 
                                            contentStyles={styles.contentLogin} contentTxt='LOG IN' authPress={handleSubmit}/>  
                                <Text style={styles.message} onPress={() => {}}>Forgot your password?</Text>
                            </Fragment>
                        )
                    }  
                </Formik>   
            </View>
        )
    }
}