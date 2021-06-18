import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity, 
  View, 
  TextInput,
} from 'react-native';
import styles from './styles';
import { Icon } from 'react-native-elements'
import * as navigation from '../../utils/navigation'
import { url } from '../../utils/global-constant'
import { getAccessToken} from '../../utils/request'
import DatePicker from 'react-native-datepicker'
import { CheckBox } from 'react-native-elements'
import { Container, Header, Left, Body, Title, Right, Button } from "native-base";
import { loadCartInfo } from '../HomeScreen/actions'

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
} 
if (mm < 10) {
  mm = '0' + mm;
} 
today = dd + '-' + mm + '-' + yyyy;

export default class PaymentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: null,
            phone: null,
            date: today,
            payment: false,
            visa: null,
        }
        this.choosePayment = this.choosePayment.bind(this)
        this.sendInformation = this.sendInformation.bind(this)
    }

    choosePayment(value) {
        if (value) {
            if (this.state.payment) {
                this.setState(state => ({payment: !state.payment}))
            }
        } else {
            if (!this.state.payment) {
                this.setState(state => ({payment: !state.payment}))
            }
        }
    }

    sendInformation() {
        const data = new FormData();

		data.append("phone", this.state.phone);
		data.append("address", this.state.address);
		data.append("date", this.state.date);
        data.append("paymentMethod", this.state.paymentMethod ? this.state.visa : "cash");
        
        if (this.state.address != null && this.state.phone != null) {
            if (this.state.payment) {
                if (this.state.visa != null) {
                    requestUrl = url + '/cart/updateCartInformation'
                    fetch(requestUrl, {
                            method: 'POST',
                            body: data,
                            headers: {
                                'Authorization': getAccessToken()
                            }})
                        .then(response => response.json())
                        .then(response => {
                            if (response.error) {
                                alert(response.error)
                            }
                            else {
                                this.props.dispatch(loadCartInfo())
                                this.props.navigation.navigate('ReviewScreen')
                            }
                        })
                        .catch(error => {
                            alert(error)
                        }) 
                }
                else
                    alert('Please fill out form')
            }
            else {
                requestUrl = url + '/cart/updateCartInformation'
                fetch(requestUrl, {
                        method: 'POST',
                        body: data,
                        headers: {
                            'Authorization': getAccessToken()
                        }})
                    .then(response => response.json())
                    .then(response => {
                        if (response.error) {
                            alert('Loading unsucessfully')
                        }
                        else {
                            this.props.dispatch(loadCartInfo())
                            this.props.navigation.navigate('ReviewScreen')
                        }
                    })
                    .catch(error => {
                        alert(error)
                    }) 
            } 
        }
        else
            alert('Please fill out form')
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container style={{backgroundColor: '#F4F4F4'}}>
                    <Header style={{ borderBottomWidth: 0, marginTop: 10, backgroundColor: '#F4F4F4'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}>
                          <Icon name="arrow-back" color='#000' size={32} type="material" />   
                        </Button>
                    </Left>
                    <Body>
                       <Title style={styles.title}>INFORMATION</Title>
                    </Body>
                    <Right/>
                    </Header>
                    <ScrollView contentContainerStyle={styles.body}
                                showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <View style={styles.rowflex1}>
                                <Text style={styles.phoneTxt}>Phone: </Text>
                                <TextInput value={this.state.phone} placeholder={'01900000'} onChangeText={(text) => {this.setState({phone: text})}} style={styles.input}></TextInput>
                            </View>
                            <View style={styles.rowflex1}>
                                <Text style={styles.addressTxt}>Address: </Text>
                                <TextInput value={this.state.address} placeholder={'123 Trần Hưng Đạo Str.'} onChangeText={(text) => {this.setState({address: text})}} style={styles.input}></TextInput>
                            </View>
                            <View style={styles.rowflex1}>
                                <Text style={styles.dateTxt}>Date: </Text>
                                <DatePicker
                                    style={{width: 200}}
                                    date={this.state.date} //initial date from state
                                    mode="date" //The enum of date, datetime and time
                                    placeholder="select date"
                                    format="DD-MM-YYYY"
                                    minDate={today}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                        },
                                        dateInput: {
                                        marginLeft: 36
                                        }
                                    }}
                                    onDateChange={(date) => {this.setState({date: date})}}
                                    />
                            </View>
                            <View style={styles.rowflex1}>
                                <Text style={styles.paymentTxt}>Payment: </Text>
                                <CheckBox
                                    center
                                    title='Cash'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor='#FEADB9'
                                    checked={!this.state.payment}
                                    wrapperStyle={{backgroundColor: '#fff'}}
                                    textStyle={{fontFamily: 'AvenirNext-UltraLight', fontSize: 17, fontWeight: '100'}}
                                    containerStyle={{backgroundColor: '#fff', borderWidth: 0, width: '30%'}}
                                    onPress={() => this.choosePayment(true)}
                                />
                                <CheckBox
                                    center
                                    textStyle={{fontFamily: 'AvenirNext-UltraLight', fontSize: 17, fontWeight: '100'}}
                                    title='Credit Card'
                                    checkedIcon='dot-circle-o'
                                    checkedColor='#FEADB9'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.payment}
                                    wrapperStyle={{backgroundColor: '#fff'}}
                                    containerStyle={{backgroundColor: '#fff', borderWidth: 0, width: '40%'}}
                                    onPress={() => this.choosePayment(false)}
                                />
                            </View>
                            {
                                this.state.payment ? (
                                    <View style={styles.rowflex1}>
                                        <Text style={styles.creditTxt}>Visa No :</Text>
                                        <TextInput value={this.state.visa} placeholder={'1AHJU900'} onChangeText={(text) => {this.setState({visa: text})}} style={styles.input}></TextInput>
                                    </View>
                                ) : null
                            }
                        </View>
                        <TouchableOpacity style={styles.shoppingBtn} onPress={() => this.sendInformation()}>
                            <Text style={styles.shoppingTxt}>CONTINUE</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Container>
        )
    }
}
