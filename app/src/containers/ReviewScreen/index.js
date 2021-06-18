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
    }

    render() {
        const { name } = this.props.recipe.recipe;
        return (
            <View style={styles.recipeItem}>
                <Text style={styles.recipeName}>{name}</Text>
                <Text style={styles.recipeQty}>{this.props.recipe.portion}</Text>
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
export default class ReviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.buyNow = this.buyNow.bind(this)
    }

    buyNow() {
        const { navigation } = this.props
        const requestUrl = url + '/cart/finishCart'
        fetch(requestUrl, {
            method: 'POST', 
            headers: {
                'Authorization': getAccessToken()
            }})
                .then(response => {
                    this.props.dispatch(loadCart())
                    navigation.navigate("ThankYouScreen")
                })
                .catch(error => {
                    console.log(error)
                    alert('Unsucessfully')
                })
    }

    render() {
        const recipes = this.props.cart.rations ? this.props.cart.rations : []
        const information = this.props.cartInfo ? this.props.cartInfo.carts[0] : null
        console.log(recipes[0])
        const ingredients = findIngredients(recipes)

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
                            <Title style={styles.title}>REVIEW CART</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <ScrollView style={styles.container}>
                        <View style={styles.recipe}>
                            <Text style={styles.listTxt}>USER'S INFORMATION</Text>
                            {
                                information ? (
                                    <View>
                                        <Text style={styles.childTxt}>{`Phone : ${information.phone}`}</Text>
                                        <Text style={styles.childTxt}>{`Address : ${information.address}`}</Text>
                                        <Text style={styles.childTxt}>{`Date : ${information.date}`}</Text>
                                        <Text style={styles.childTxt}>{`Payment Method : ${information.paymentMethod}`}</Text>
                                    </View>
                                ) : null
                            }
                        </View>
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
                        <TouchableOpacity style={styles.shoppingBtn} onPress={() => this.buyNow()}>
                            <Text style={styles.shoppingTxt}>BUY NOW</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Container>
        )
    }
}

