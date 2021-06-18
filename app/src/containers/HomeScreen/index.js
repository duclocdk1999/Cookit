import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image, 
  TouchableOpacity
} from 'react-native';
import { loadCart, loadRecipe, loadPopularRecipe } from './actions'
import styles from './styles';
import PreviewItem from '../../components/PreviewItem'
import images from '../../Themes/Images'
import PreviewListItem from '../../components/PreviewListItem'
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Button } from "native-base";
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { url } from '../../utils/global-constant'
import request from '../../utils/request'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadRecipe())
        dispatch(loadPopularRecipe())
        dispatch(loadCart())
    }

    render() {
        const { navigation } = this.props;
        const { routeName } = navigation.state;
        const { listHomeScreenRecipe, listPopular } = this.props;
        const imgUrl = url + '/recipe/getRecipeImage/'
        return (
                <Container>
                    <Header style={{backgroundColor: '#fff', borderBottomWidth: 0, marginTop: 10}}>
                    <Left/>
                    <Body>
                        <Image source={images.logo4}/>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("InputRecipeScreen")}>
                            <Icon name="arrow-upward" color='#000' size={32} type="material" />
                        </Button>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("SearchScreen")}>
                            <Icon name="search" color='#000' size={32} type="material" />
                        </Button>
                    </Right>
                    </Header>
                        <View style={styles.container}>
                        <TouchableOpacity onPress={() => this.props.dispatch(loadHomePageRecipe())}>
                            <Text>{this.props.index}</Text>
                        </TouchableOpacity>
                            <Text style={styles.txt}>POPULAR</Text>
                            <FlatList data={listPopular}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => navigation.navigate('RecipeHomeScreen', {route: routeName, recipeId: item.id})} style={styles.flatList}>
                                        <Image source={{uri: imgUrl + item.id}} resizeMode='cover' style={styles.img}/>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index}
                            />
                            <Text style={styles.txt}>LASTEST</Text>
                            <PreviewListItem listItem={listHomeScreenRecipe} navigation={navigation} screen={'RecipeHomeScreen'}/>
                        </View>
                </Container>
        )
    }
}

export default HomeScreen

HomeScreen.propTypes = {
    dispatch: PropTypes.func,
    listHomeScreenRecipe : PropTypes.array,
  };
  
  HomeScreen.defaultProps = {
    dispatch: {},
    listHomeScreenRecipe : [],
  };

