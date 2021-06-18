import React, { Fragment } from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

export default class ThankYouScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('ShoppingScreen')
        }, 10000)
    }

    render() {
        return (
            <View style={styles.container} >
                <LinearGradient colors={['#fff', '#FCE6F7', '#FEAFBB']} style={styles.gradient}> 
                    <View style={styles.round}>
                        <Text style={styles.thank}>THANK</Text>
                        <Text style={styles.thank}>YOU</Text>   
                    </View>  
                    <Icon name={'shopping-cart'}  color={'#fff'}  size={64} type="font-awesome" />
                    <Text style={styles.thank2}>Cooking and Shopping for food bring rhythm and meaning to our lives.</Text>
                </LinearGradient>
            </View>
        )
    }
}