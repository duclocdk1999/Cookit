import React from 'react';
import {
  ScrollView
} from 'react-native';
import styles from './styles';
import { Container, Header, Left, Body, Title, Right, Button } from "native-base";
import images from '../../Themes/Images';
import { Icon } from 'react-native-elements'
import * as navigation from '../../utils/navigation'
import PreviewListItem from '../../components/PreviewListItem'
import { url } from '../../utils/global-constant'
import { getAccessToken} from '../../utils/request'
import { loadFavoriteRecipe } from '../HomeScreen/actions'


export default class FavoriteScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listHomeScreenRecipe : []
        }
    }

    componentDidMount() {
        this.props.dispatch(loadFavoriteRecipe())
        // requestUrl = url + '/recipe/yourFavoriteRecipes'
        //     fetch(requestUrl, {
        //             method: 'GET',
        //             headers: {
        //                 'Authorization': getAccessToken()
        //             }})
        //         .then(response => response.json())
        //         .then(response => {
        //             if (response.error) {
        //                 alert('Loading unsucessfully')
        //             }
        //             else {
        //                 this.setState({listHomeScreenRecipe: response.recipes})
        //             }
        //         })
        //         .catch(error => {
        //             alert('Loading unsucessfully')
        //         })
    }

    render() {
        const { navigation } = this.props;
        const { listHomeScreenRecipe } = this.props;

        return (
                <Container style={{backgroundColor: '#F4F4F4'}}>
                    <Header style={{ borderBottomWidth: 0, marginTop: 10, backgroundColor: '#F4F4F4'}}>
                    <Left/>
                    <Body>
                       <Title style={styles.title}>FAVORITES</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => {}}>
                            <Icon name="search" color='#000' size={32} type="material" />
                        </Button>
                    </Right>
                    </Header>
                    <ScrollView contentContainerStyle={styles.body}
                                showsVerticalScrollIndicator={false}>
                        <PreviewListItem listItem={listHomeScreenRecipe} navigation={navigation} screen={'RecipeFavoriteScreen'}/>
                    </ScrollView>
                </Container>
        )
    }
}
