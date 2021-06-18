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
import { loadMyRecipe } from '../HomeScreen/actions'

export default class MyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listHomeScreenRecipe : []
        }
    }

    componentDidMount() {
        this.props.dispatch(loadMyRecipe());
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
                       <Title style={styles.title}>MY RECIPE</Title>
                    </Body>
                    <Right/>
                    </Header>
                    <ScrollView contentContainerStyle={styles.body}
                                showsVerticalScrollIndicator={false}>
                        <PreviewListItem listItem={listHomeScreenRecipe} navigation={navigation} screen={'RecipeMyScreen'}/>
                    </ScrollView>
                </Container>
        )
    }
}
