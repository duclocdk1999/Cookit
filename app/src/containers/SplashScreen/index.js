import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Modal,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import images from '../../Themes/Images';

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     modalVisible: true,
        // }
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({modalVisible: false})
    //     }, 3000)
    // }

    render() {
        return (
                <ImageBackground source={images.logo3} resizeMode='contain' style={styles.logo3}>
                    <Image source={images.logo5} resizeMode='contain' style={styles.logo1}/>
                    <ActivityIndicator size="large" color="#ffad33" />
                </ImageBackground>
        )
    }
}