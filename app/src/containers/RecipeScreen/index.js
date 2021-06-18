import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import styles from './styles';
import { Button } from "native-base";
import { Icon } from 'react-native-elements'
import { url } from '../../utils/global-constant'
import { getAccessToken} from '../../utils/request'
import { loadCart, loadFavoriteRecipe } from '../HomeScreen/actions'



export default class RecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            like: false,
            recipe: null,
        }
        this.updateAmount = this.updateAmount.bind(this)
        this.like = this.like.bind(this)
        this.addCart = this.addCart.bind(this)

    }

    updateAmount(index) {
        const { amount } = this.state;
        const newAmount = amount + index
        if (newAmount >= 0) 
            this.setState(state => ({amount: state.amount + index}))
                
    }

    addCart() {
        const { amount } = this.state;
        const recipeId = this.props.navigation.getParam('recipeId')
            const requestUrl = url + '/cart/addItem/' + recipeId + '/' + + amount.toString()
            fetch(requestUrl, {
                method: 'POST', 
                headers: {
                    'Authorization': getAccessToken()
                }})
                    .then(response => {
                        console.log(response)
                        this.props.dispatch(loadCart())
                    })
                    .catch(error => {
                        console.log(error)
                        alert('Unsucessfully')
                    })
        }

    like() {
        const recipeId = this.props.navigation.getParam('recipeId')
        var like = this.state.like ? 'unlike' : 'like'
        const requestUrl = url + '/user/' + like + '/' +  recipeId
        console.log(requestUrl)
        console.log(getAccessToken())
        fetch(requestUrl, {
            method: 'POST', 
            headers: {
                'Authorization': getAccessToken()
            }})
                .then(response => {
                        this.setState({like: !this.state.like})
                        this.props.dispatch(loadFavoriteRecipe())
                })
                .catch(error => {
                    console.log(error)
                    alert('Unsucessfully')
                })
    }

    componentDidMount() {
        const recipeId = this.props.navigation.getParam('recipeId')
        const requestUrl = url + '/recipe/getInformation/' + recipeId
        console.log(requestUrl)
            fetch(requestUrl, {
                method: 'GET', 
                headers: {
                'Authorization': getAccessToken()
            }})
                .then(response => response.json())
                .then(response => {
                    if (response.error) {
                        alert('Loading unsucessfully')
                    }
                    else {
                        console.log(response)
                        this.setState({recipe: response.recipes[0]})
                        this.setState({like: response.like})
                        this.setState({amount: response.amount ? response.amount : 0})
                    }
                })
                .catch(error => {
                    console.log(error)
                })
    }


    render() {
        const recipeId = this.props.navigation.getParam('recipeId');
        const imgUrl = url + '/recipe/getRecipeImage/' + recipeId
        const { recipe } = this.state
        // this.setState({ like: recipe ? this.recipe.fanIds : false })

        return (
                <View style={styles.container}>
                    <ImageBackground source={{uri: imgUrl}} style={{width: '100%', height: 180}}>
                        <View style={styles.darker}>
                            <View style={styles.header}>
                                <View style={styles.left}>
                                    <Button
                                            transparent
                                            onPress={() => this.props.navigation.goBack()}>
                                        <Icon name="arrow-back" color='#fff' size={32} type="material" />
                                    </Button>
                                </View>
                                <View style={styles.right}>
                                    <Button
                                        transparent
                                        onPress={() => this.like()}>
                                        <Icon name="heart" color={this.state.like ? '#FEADB9' : '#fff'} size={32} type="font-awesome" />
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <ScrollView contentContainerStyle={styles.body}
                                showsVerticalScrollIndicator={false}>
                        <Text style={styles.category}>{recipe ? recipe.category : null}</Text>
                        <Text style={styles.name}>{recipe ? recipe.name : null}</Text>
                        <View style={styles.row}>
                            <View style={styles.block}>
                                <Icon name={'query-builder'} color='#BDBDBD' type="material" size={16} />
                                <Text style={styles.blockTxt}>{recipe ? recipe.totalTime : null}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name={'align-left'} color='#BDBDBD' type="font-awesome" size={16}/>
                                <Text style={styles.blockTxt}>{recipe ? recipe.description : null}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name={'users'} color='#BDBDBD' type="font-awesome" size={16}/>
                                <Text style={styles.blockTxt}>{recipe ? recipe.portion : null}</Text>
                            </View>
                        </View>
                        <Text style={styles.step}>INGREDIENTS</Text>
                        <View style={styles.stepContent}>
                            {
                                (recipe ? recipe.ingredients : []).map((ingredient, index) => (
                                    <View style={styles.rowflex1} key={index}>
                                        <View style={styles.smallBtn}/>
                                        <Text style={styles.txt}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</Text>
                                    </View>
                                ))
                            }
                        </View>
                        <Text style={styles.step}>INSTRUCTIONS</Text>
                        <View style={styles.stepContent}>
                            {
                                (recipe ? recipe.steps : []).map((step, index) => (
                                    <View style={styles.rowflex2} key={index}>
                                        <View style={styles.largeBtn}>
                                            <Text style={styles.index}>{index}</Text>
                                        </View>
                                        <Text style={styles.txt}>{step.instruction}</Text>
                                    </View>
                                ))
                            }
                        </View>
                        <Text style={styles.step}>SHOPPING</Text>
                        <View style={styles.update}>
                            <Text style={styles.quantity}>
                                Quantity:
                            </Text>
                            <View style={styles.updateBlock}>
                                <TouchableOpacity onPress={() => this.updateAmount(-1)} >
                                    <Icon type='font-awesome' name='chevron-down' size={13} color='#FEADB9' />
                                </TouchableOpacity>
                                <View style={styles.amountContain}>
                                    <Text style={styles.amountTxt}>{this.state.amount}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.updateAmount(1)} >
                                    <Icon type='font-awesome' name='chevron-up' size={13} color='#FEADB9' />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.addCart} onPress={()=> this.addCart()}>
                            <Text style={styles.addTxt}>Add to cart</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
        )
    }
}
