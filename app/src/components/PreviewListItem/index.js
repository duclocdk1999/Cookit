import React from 'react';
import {
  View,
  ScrollView, 
  FlatList
} from 'react-native';
import PreviewItem from '../PreviewItem'
import styles from './styles';

export default class PreviewListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { listItem, navigation, screen } = this.props;
        return (
            <FlatList data={listItem.reverse()}
                            renderItem={({ item, index }) => (
                                <PreviewItem key={index} 
                                    numLike={item.numberOfLikes}
                                    screen={screen}
                                    recipeId={item.id}
                                    category={item.category}
                                    title={item.name}
                                    time={item.totalTime}
                                    level={item.description}
                                    navigation={navigation}
                                    amount={item.portion}/>
                            )}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                        />
        )
    }
}