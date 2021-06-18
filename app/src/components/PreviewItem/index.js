import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native';
import { Icon } from 'react-native-elements'
import styles from './styles';
import { url } from '../../utils/global-constant'

export default class PreviewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { category, title, time, level, amount, navigation, recipeId, screen, numLike }  = this.props; 
        const imgUrl = url + '/recipe/getRecipeImage/' + recipeId
        const { routeName } = navigation.state;
        return (
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(screen, {route: routeName, recipeId: recipeId})}>
                <Image source={{uri: imgUrl}} resizeMode='cover' style={styles.img}/>
                <View style={styles.content}>
                    <Text style={styles.category}>{category}</Text>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.row}>
                        <View style={styles.block}>
                            <Icon name={'query-builder'} color='#BDBDBD' type="material" size={15} />
                            <Text style={styles.blockTxt}>{time}</Text>
                        </View>
                        <View style={styles.block}>
                            <Icon name={'align-left'} color='#BDBDBD' type="font-awesome" size={15}/>
                            <Text style={styles.blockTxt}>{level}</Text>
                        </View>
                        <View style={styles.block}>
                            <Icon name={'users'} color='#BDBDBD' type="font-awesome" size={15}/>
                            <Text style={styles.blockTxt}>{amount}</Text>
                        </View>
                        <View style={styles.block}>
                            <Icon name={'heart'} color='#BDBDBD' type="font-awesome" size={15}/>
                            <Text style={styles.blockTxt}>{numLike}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}