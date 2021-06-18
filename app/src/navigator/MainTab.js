import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import LoginScreen from '../containers/LoginScreen';
// import HomeScreen from '../containers/HomeScreen';
import HomeScreen from '../containers/HomeScreen/Injectable';
import CategoriesScreen from '../containers/CategoriesScreen';
import CategoryScreen from '../containers/CategoryScreen';
import FavoriteScreen from '../containers/FavoriteScreen/Injectable';
import ShoppingScreen from '../containers/ShoppingScreen/Injectable';
import InputRecipeScreen from '../containers/InputRecipeScreen/Injectable';
import AccountScreen from '../containers/Account';
import MyRecipe from '../containers/MyRecipe/Injectable';
import { Icon } from 'react-native-elements';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import RecipeScreen from '../containers/RecipeScreen/Injectable';
import PaymentScreen from '../containers/PaymentScreen/Injectable';
import ThankYouScreen from '../containers/ThankYouScreen/Injectable';
import SearchScreen from '../containers/SearchScreen/Injectable';
import ReviewScreen from '../containers/ReviewScreen/Injectable';

const CategoryStack = createStackNavigator({
    CategoriesScreen: CategoriesScreen,
    CategoryScreen: CategoryScreen,
    RecipeCategoryScreen: RecipeScreen,
}, {
    initialRouteName: 'CategoriesScreen',
    headerMode: 'none',
})

const ShoppingStack = createStackNavigator({
    ShoppingScreen: ShoppingScreen,
    PaymentScreen: PaymentScreen,
    ReviewScreen: ReviewScreen,
    ThankYouScreen: ThankYouScreen,
}, {
    initialRouteName: 'ShoppingScreen',
    headerMode: 'none'
})

const AccountStack = createStackNavigator({
    AccountScreen: AccountScreen,
    MyRecipeScreen: MyRecipe,
    RecipeMyScreen: RecipeScreen
}, {
    initialRouteName: 'AccountScreen',
    headerMode: 'none'
})

const HomeStack = createStackNavigator({
    HomeScreen: HomeScreen,
    InputRecipeScreen: InputRecipeScreen,
    RecipeHomeScreen:  RecipeScreen,
    SearchScreen: SearchScreen,
}, {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
})

const FavoriteStack = createStackNavigator({
    FavoriteScreen: FavoriteScreen,
    RecipeFavoriteScreen:  RecipeScreen,
}, {
    initialRouteName: 'FavoriteScreen',
    headerMode: 'none'
})


const Category = createAppContainer(CategoryStack)
const Account = createAppContainer(AccountStack)


const MainTab = createMaterialTopTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: ({ tintColor }) =>
            <Icon name={'home'}  color={tintColor}  size={24} type="font-awesome" />,
        }
    },
    Categories: {
        screen: Category,
        navigationOptions: {
            title: 'Categories',
            tabBarIcon: ({ tintColor }) =>
                <Icon name={'list'}  color={tintColor}  size={24} type="font-awesome" />,
        },
    },
    Shopping: {
        screen: ShoppingStack,
        navigationOptions: {
            title: 'Shopping',
            tabBarIcon: ({ tintColor }) =>
            <Icon name={'shopping-cart'}  color={tintColor}  size={24} type="font-awesome" />,
        },
    },
    Favorites: {
        screen: FavoriteStack,
        navigationOptions: {
            title: 'Favorites',
            tabBarIcon: ({ tintColor }) =>
            <Icon name={'heart'}  color={tintColor}  size={24} type="font-awesome" />,
        },
    },
    Account: {
        screen: Account,
        navigationOptions: {
            title: 'Account',
            tabBarIcon: ({ tintColor }) =>
            <Icon name={'user'}  color={tintColor}  size={24} type="font-awesome" />,
        },
    }
}, {
    lazy: true,
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: '#FEADB9',
        inactiveTintColor: 'gray',
        indicatorStyle: {
            backgroundColor: '#fff',
            height: 2,
            top: 0,
        },
        style: {
            backgroundColor: '#ffffff',
            padding: 0,
        },
        tabStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 65,
        },
        showIcon: true,
        upperCaseLabel: false,
        labelStyle: {
        fontSize: 10,
        margin: 0,
        padding: 0,
        },
    },
})

export default createAppContainer(MainTab);