import { StyleSheet } from 'react-native';
import images from '../../Themes/Images'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },
    header: {
        paddingHorizontal: 16,
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    darker: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    body: {
        width: '100%',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        color: '#9E9E9E',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
        marginTop: 40
    },
    category: {
        fontSize: 30,
        color: '#000',
        fontWeight: '600',
        fontFamily: 'AvenirNext-UltraLight',
        marginTop: 30
    },
    amount: {
        fontSize: 12,
        color: '#9E9E9E',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
        marginTop: 20,
        marginBottom: 20
    }
    

})

export default styles

