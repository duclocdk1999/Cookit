import React from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';
import styles from './styles';

export default class AuthButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { buttonStyles, authPress, contentTxt, contentStyles }  = this.props; 
        return (
            <TouchableOpacity style={[styles.button, buttonStyles]} onPress={() => authPress()}>
                <Text style={[styles.contentTxt, contentStyles]}>{contentTxt}</Text>
            </TouchableOpacity>
        )
    }
}