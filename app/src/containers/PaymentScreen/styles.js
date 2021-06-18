import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    title: {
        marginVertical: 10,
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        fontFamily: 'AvenirNext-UltraLight'
    },
    container: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderColor: '#707070',
        backgroundColor: '#fff',
        marginBottom: 40
    },
    rowflex1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, 
        marginRight: 10
    }, 
    phoneTxt: {
        width: '30%',
        fontSize: 17,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
    },
    addressTxt: {
        width: '30%',
        fontSize: 17,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
    },
    dateTxt: {
        width: '30%',
        fontSize: 17,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
    },
    paymentTxt: {
        width: '30%',
        fontSize: 17,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
    },
    creditTxt: {
        width: '30%',
        fontSize: 17,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
    },
    input: {
        width: '65%',
        fontSize: 17,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        fontFamily: 'AvenirNext-UltraLight', 
        fontWeight: '300',
        color: '#FEADB9'
    },
    shoppingBtn: {
        marginLeft: '25%',
        width: '50%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#FEADB9'
    },
    shoppingTxt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff'
    }
})

export default styles