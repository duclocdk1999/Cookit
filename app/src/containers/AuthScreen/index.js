import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';
import styles from './styles';
import images from '../../Themes/Images';
import AuthButton from '../../components/AuthButton'
import SplashScreen from '../SplashScreen'
import * as navigation from '../../utils/navigation'

export default class AuthScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container} > 
                <Image source={images.logo2} resizeMode='contain' style={styles.image}/>
                <AuthButton  buttonStyles={styles.login} 
                            contentStyles={styles.contentLogin} contentTxt='LOG IN' authPress={() => {navigation.navigate('LoginScreen')}}/>
                <AuthButton  buttonStyles={styles.socialLogin} 
                            contentStyles={styles.contentSocialLogin} contentTxt='LOG IN WITH FACEBOOK' authPress={() => {}}/>
                <AuthButton  buttonStyles={styles.guestLogin} 
                            contentStyles={styles.contentGuestLogin} contentTxt='LOG IN AS GUEST' authPress={() => {}}/>
                <Text style={styles.txt}>Don't have any accounts?</Text>
                <AuthButton  buttonStyles={styles.guestLogin} 
                            contentStyles={styles.contentGuestLogin} contentTxt='SIGN UP' authPress={() => {navigation.navigate('SignUpScreen')}}/>          
            </View>
        )
    }
}