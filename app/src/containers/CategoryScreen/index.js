import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import styles from './styles';
import { Container, Header, Left, Body, Title, Right, Button } from "native-base";
import { Icon } from 'react-native-elements'
import images from '../../Themes/Images'
import PreviewList from '../../components/PreviewListItem'
import { url } from '../../utils/global-constant'
import { getAccessToken} from '../../utils/request'



export default class CategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listHomeScreenRecipe : []
        }
    }

    componentDidMount() {
        const category = this.props.navigation.getParam('category')
        requestUrl = url + '/recipe/allRecipesByCategory/' + category;
            fetch(requestUrl, {
                    method: 'GET',
                    })
                .then(response => response.json())
                .then(response => {
                    if (response.error) {
                        alert('Loading unsucessfully')
                    }
                    else {
                        this.setState({listHomeScreenRecipe: response.recipes})
                        console.log(response.recipes)
                    }
                })
                .catch(error => {
                    alert('Loading unsucessfully')
                })
    }

    render() {
        // const { listCategory } = this.props 
        const category = this.props.navigation.getParam('category')
        const img = this.props.navigation.getParam('img')
        const { navigation } = this.props;
        const { listHomeScreenRecipe } = this.state;

        return (
                <View style={styles.container}>
                    <ImageBackground source={img} style={{width: '100%', height: 180}}>
                        <View style={styles.darker}>
                            <View style={styles.header}>
                                <View style={styles.left}>
                                    <Button
                                            transparent
                                            onPress={() => this.props.navigation.goBack()}>
                                        <Icon name="arrow-back" color='#fff' size={32} type="material" />
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <ScrollView contentContainerStyle={styles.body}
                                showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>CATEGORY</Text>
                        <Text style={styles.category}>{category}</Text>
                        <Text style={styles.amount}>{`${listHomeScreenRecipe.length} Recipres`}</Text>
                        <View style={{width: '100%', height: '100%'}}>
                            <PreviewList listItem={listHomeScreenRecipe} navigation={navigation} screen={'RecipeCategoryScreen'}/>
                        </View>
                    </ScrollView>
                </View>
        )
    }
}
