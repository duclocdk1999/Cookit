import React from 'react'
import { View, TouchableOpacity, Text, Image, SafeAreaView, SrollView, ScrollView } from 'react-native'
import images from '../../Themes/Images'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { Button } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import { getAccessToken, setAccessToken } from '../../utils/request'
import { apiUrl } from '../../utils/global-constant'

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, name, onPress} = this.props;
        return (
            <View style={styles.list}>
                <Icon type='material' name={name} size={20} color='#E0DCDC' />
                <TouchableOpacity style={styles.row} onPress={() => onPress()}>
                    <Text style={styles.title}>{title}</Text>
                    <Icon type='material' name='navigate-next' size={25} color='#FEADB9'/>  
                </TouchableOpacity>
            </View>
        )
    }
}



export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: null
        }
        this.handleChoosePhoto = this.handleChoosePhoto.bind(this)
        this.createFormData = this.createFormData.bind(this)
        this.logout = this.logout.bind(this)
    }

    createFormData(photo) {
        const data = new FormData();
      
        data.append("avatar", {
          name: photo.fileName,
          type: photo.type,
          uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });

        return data;
    };

    handleChoosePhoto() {
        const options = {
            noData: true,
          }
          ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                var photo = response
                fetch(apiUrl + "/user/editAvatar", {
                    method: "POST",
                    body: this.createFormData(response),
                    headers: {
                        'Authorization': getAccessToken()
                      }
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log("upload succes", response);
                        alert("Upload success!");
                        this.setState({ photo: photo })
                    })
                    .catch(error => {
                        console.log("upload error", error);
                        alert("Upload failed!");
                    });
            }
          })
    }

    logout() {
        setAccessToken(null);
        this.props.navigation.navigate("AuthenScreen");
    }
    
    render() {
        const { photo } = this.state;
        const imgUrl = apiUrl + '/avatar/' + getAccessToken() + '?time=' + new Date();

        return (
            <SafeAreaView style={{width: '100%', paddingBottom: 50}}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <Text style={styles.header}>
                            YOURS
                        </Text>
                        <TouchableOpacity style={styles.imgContain} onPress={() => this.handleChoosePhoto()}>
                            <Image source={photo ? {uri: photo.uri} : {uri: imgUrl}} resizeMode='cover' style={styles.img}/>
                        </TouchableOpacity>
                        <Text style={styles.name}>Ngan Vo</Text>
                        <TouchableOpacity style={styles.logoutBtn} onPress={() => this.logout()}>
                            <Text style={styles.logoutTxt}>LOG OUT</Text>
                        </TouchableOpacity>
                        <Row name='book' title='Your recipes' onPress={() => this.props.navigation.navigate('MyRecipeScreen')}/>
                        <Row name='assignment' title='Shopping list' onPress={() => this.props.navigation.navigate('Shopping')}/>
                        <View style={{width: '100%'}}>
                            <Text style={styles.more}>MORE</Text>
                        </View>
                        <Row name='info' title='About Us' />
                        <Row name='comment' title='Feedback' />
                        <Row name='grade' title='Rate the App' />
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}