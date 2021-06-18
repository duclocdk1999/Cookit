import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import styles from './styles';
import { Container, Header, Left, Body, Title, Right, Button } from "native-base";
import { Icon } from 'react-native-elements'
// import * as navigation from '../../utils/navigation'
import { url } from '../../utils/global-constant'
import { getAccessToken} from '../../utils/request'
import { loadCart } from '../HomeScreen/actions'


class RecipeItem extends React.Component {
    constructor(props) {
        super(props);
        this.updateAmount = this.updateAmount.bind(this)
        this.removeRecipe = this.removeRecipe.bind(this)
    }

    updateAmount(index) {
        const recipeId = this.props.recipe.recipe.id
        const newAmount = this.props.recipe.portion + index
        alert(newAmount)
        if (newAmount >= 0) {
            const requestUrl = url + '/cart/addItem/' + recipeId + '/' + newAmount.toString()
            alert(requestUrl)
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
    }


    removeRecipe() {
        var newAmount = 0
        const recipeId = this.props.recipe.recipe.id
        const requestUrl = url + '/cart/addItem/' + recipeId + '/' + newAmount.toString()
            alert(requestUrl)
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


    render() {
        const { name } = this.props.recipe.recipe;
        return (
            <View style={styles.recipeItem}>
                <Text style={styles.recipeName}>{name}</Text>
                <View style={styles.recipeAmount}>
                    <View style={styles.updateBlock}>
                        <TouchableOpacity onPress={() => this.updateAmount(-1)} >
                            <Icon type='font-awesome' name='chevron-down' size={13} color='#FEADB9' />
                        </TouchableOpacity>
                        <View style={styles.amountContain}>
                            <Text style={styles.amountTxt}>{this.props.recipe.portion}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.updateAmount(1)} >
                            <Icon type='font-awesome' name='chevron-up' size={13} color='#FEADB9' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.recipeRemove}>
                    <TouchableOpacity onPress={() => this.removeRecipe()}>
                        <Icon type='font-awesome' name='times' size={13} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class IngredientItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, amount, unit } = this.props.ingredient;
        return (
            <View style={styles.recipeItem}>
                <Text style={styles.ingreName}>{name}</Text>
                <Text style={styles.ingreAmount}>{amount}</Text>
                <Text style={styles.ingreUnit}>{unit}</Text>
            </View>
        )
    }
}


function findIngredients(recipes) {
    var listIngr = []
    for (var i = 0; i < recipes.length; i++) {
        var ingre = recipes[i].recipe.ingredients
        for (var j = 0; j < ingre.length; j++) {
            var isCommon = false;
            for (var k = 0 ; k < listIngr.length; k++) {
                if (listIngr[k].name == ingre[j].name && listIngr[k].unit == ingre[j].unit) {
                    isCommon = true;
                    listIngr[k].amount += ingre[j].amount*recipes[i].portion;
                    break;
                }
            }
            if (!isCommon) {
                var newIngr = {
                    name: ingre[j].name,
                    unit: ingre[j].unit,
                    amount: ingre[j].amount*recipes[i].portion
                }
                listIngr.push(newIngr)
            }
        }
    }

    return listIngr;
}
export default class ShoppingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
        const recipes = this.props.cart.rations ? this.props.cart.rations : []
        console.log(recipes[0])
        const ingredients = findIngredients(recipes)
        // const { recipes, ingredients } = this.props;
        return (
                <Container style={{backgroundColor: '#F4F4F4'}}>
                    <Header style={{ borderBottomWidth: 0, marginTop: 10, backgroundColor: '#F4F4F4'}}>
                        <Left/>
                        <Body>
                            <Title style={styles.title}>SHOPPING</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <ScrollView style={styles.container}>
                        <View style={styles.recipe}>
                            <Text style={styles.listTxt}>RECIPE LIST</Text>
                            <View style={styles.headerRecipe}>
                                <Text style={styles.items}>items</Text>
                                <Text style={styles.quantity}>quantity</Text>
                            </View>
                            {
                                recipes.map((recipe, index) => (
                                    <RecipeItem key={index} recipe={recipe} dispatch={this.props.dispatch}/>
                                ))
                            }
                        </View>
                        <View style={styles.recipe}>
                            <Text style={styles.listTxt}>INGREDIENT LIST</Text>
                            <View style={styles.headerRecipe}>
                                <Text style={styles.items}>items</Text>
                                <Text style={styles.quantity}>quantity</Text>
                                <Text style={styles.unit}>unit</Text>
                            </View>
                            {
                                ingredients.map((ingredient, index) => (
                                    <IngredientItem key={index} ingredient={ingredient} />
                                ))
                            }
                        </View>
                        <TouchableOpacity style={styles.shoppingBtn} onPress={() => recipes.length ? navigation.navigate('PaymentScreen') : alert("Please add item to cart")}>
                            <Text style={styles.shoppingTxt}>SHOP NOW</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Container>
        )
    }
}

