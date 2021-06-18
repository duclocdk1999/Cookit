import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 100,
    },
    title: {
        marginVertical: 10,
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        fontFamily: 'AvenirNext-UltraLight'
    },
    flatList: {
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: '100%',
        marginBottom: 8,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 35,
        resizeMode: 'cover'
    },
    category: {
        width: '50%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight'
    }
})

export default styles