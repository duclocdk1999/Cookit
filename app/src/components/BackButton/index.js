import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import images from '../../Themes/Images';
import styles from './styles';


export default function BackTopLeft(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()} style={{display: 'flex', position: 'absolute', top: 60, left: 16}}
    >
      <Image source={images.backBtn}/>
    </TouchableOpacity>
  );
}