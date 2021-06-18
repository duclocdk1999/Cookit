import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { Container, Header, Left, Body, Title, Right, Button } from "native-base";
import { Icon } from 'react-native-elements'
import * as navigation from '../../utils/navigation'
import { recipeCategory } from '../../utils/global-constant'

export default class CategoriesScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const { listCategory } = this.props 
        return (
                <Container style={{backgroundColor: '#E3E0E0'}}>
                    <Header style={{ borderBottomWidth: 0, marginTop: 10, backgroundColor: '#F4F4F4'}}>
                    <Left/>
                    <Body>
                       <Title style={styles.title}>CATEGORIES</Title>
                    </Body>
                    <Right/>
                    </Header>
                        <View style={styles.container}>
                            <FlatList data={recipeCategory}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen', {category: item.name, img: item.image})} style={styles.flatList}>
                                        <Image source={item.image} style={styles.img}/>
                                        <Text style={styles.category}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                </Container>
        )
    }
}
