import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    img: {
        width: '100%',
        height: 128,
    },
    content: {
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        marginBottom: 25,
    },
    category: {
        width : '100%',
        fontSize: 10,
        color: '#9E9E9E',
        fontWeight: '300',
        fontFamily: 'AvenirNext-UltraLight',
        marginBottom: 5,
    },
    title: {
        width : '100%',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
        marginBottom: 5,
    },
    row: {
        width: '100%',
        height: 15,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    block: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    blockTxt: {
        fontSize: 13,
        fontWeight: '200',
        fontFamily: 'AvenirNext-UltraLight',
        marginLeft: 12,
    }

})

export default styles