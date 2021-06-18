import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import { Icon } from 'react-native-elements'
import { url } from '../../utils/global-constant'
import { getAccessToken} from '../../utils/request'
import { loadCart, loadFavoriteRecipe , onSearchRecipe, onShowLoader } from '../HomeScreen/actions'
import { Container, Header, Left, Body, Title, Right, Button } from "native-base";
import PreviewListItem from '../../components/PreviewListItem'


export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchStr : null
        }
        this.searchRecipe = this.searchRecipe.bind(this)
    }

    searchRecipe() {
        this.props.dispatch(onShowLoader())
        this.props.dispatch(onSearchRecipe(this.state.searchStr))
    }

    render() {
        const { navigation } = this.props;
        const { listHomeScreenRecipe } = this.props;

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
                       <TextInput style={styles.searchInput} value={this.state.searchStr} onChangeText={(text) => this.setState({searchStr: text})} placeholder="Pizza, ..."/>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.searchRecipe()}>
                            <Icon name="search" color='#000' size={32} type="material" />
                        </Button>
                    </Right>
                    </Header>
                    {
                        this.props.isShow ? (<ActivityIndicator size="large" color="#ffad33" />) :
                            (<ScrollView contentContainerStyle={styles.body}
                                    showsVerticalScrollIndicator={false}>
                                <Text style={styles.searchIntro}>{`There are total ${listHomeScreenRecipe.length} recipes`}</Text>
                                <PreviewListItem listItem={listHomeScreenRecipe.reverse()} navigation={navigation} screen={'RecipeHomeScreen'}/>
                            </ScrollView>)
                    }
                </Container>
        )
    }
}