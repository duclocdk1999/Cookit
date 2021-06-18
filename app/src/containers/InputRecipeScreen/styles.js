import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 60,
    },
    title: {
        marginVertical: 10,
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        fontFamily: 'AvenirNext-UltraLight'
    },
    frame: {
        width: '100%',
        height: 250,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    img: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 2,
        resizeMode: 'cover'
    },
    text: {
        textAlign: 'center',
        width: '100%',
        fontSize: 25,
        fontFamily: 'AvenirNext-UltraLight',
        color: '#E0E0E0',
        fontWeight: '700',
        zIndex: 1,
    },
    rowflex1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, 
        paddingHorizontal: 10,
    },
    rowflex2: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    smallBtn: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: '#FEADB9'
    },
    largeBtn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FEADB9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    index: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '300',
        fontFamily: 'AvenirNext-UltraLight'
    },
    txt: {
        width: '80%',
        fontSize: 17,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight', 
        marginLeft: 10,
    },
    step: {
        width: '100%',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
        fontSize: 18,
        color: '#000',
        fontWeight: '300',
        fontFamily: 'AvenirNext-UltraLight'
    },
    ingredient: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 20,
        paddingBottom: 30,
    },
    steps: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 20,
        paddingBottom: 30,
    },
    inputStep: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    inputIngre: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowIngredient: {
        marginBottom: 15,
        marginTop: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    row: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        fontFamily: 'AvenirNext-UltraLight', 
        fontWeight: '300',
    },
    rowIngre: {
        width: '45%',
    },
    rowAmount: {
        width: '30%'
    },
    rowUnit: {
        width: '20%',
    },
    loginBtn: {
        backgroundColor: '#FEADB9'
    },
    contentLogin: {
        color: '#FFFFFF',
    },
    inputStp: {
        width: '100%',
        padding: 10,
        height: 48,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        fontFamily: 'AvenirNext-UltraLight', 
        fontWeight: '300',
        marginTop: 15,
    },
    addCart: {
        marginTop: 20,
        paddingHorizontal: 20,
        height: 38,
        borderRadius: 44,
        backgroundColor: '#FEADB9',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    addTxt: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'AvenirNext-UltraLight',
    },
    up: {
        marginRight: 5,
        fontSize: 18,
        color: '#FEADB9',
        fontWeight: '600',
        fontFamily: 'AvenirNext-UltraLight',
    },
    intro: {
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 30,
    },
    rowName: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 10
    },
    txtIntro: {
        width: '30%',
        fontSize: 17,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
    },
    inputIntro: {
        width: '65%',
        fontSize: 17,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        fontFamily: 'AvenirNext-UltraLight', 
        fontWeight: '300',
        color: '#FEADB9'
    },
    picker: {
        width: 150,
        borderRadius: 8,
        height: 35,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        justifyContent: 'center',
    },
    removeBtn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEADB9',
    },
    plus: {
        textAlign: 'center',
        fontSize: 12,
        color: '#FFF',
        fontWeight: 'bold'
    },
    removeBtn2: {
        marginLeft: 20,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEADB9',
        right: 0,
    },

})

export default styles