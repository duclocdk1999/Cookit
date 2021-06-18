import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },
    header: {
        paddingHorizontal: 16,
        marginTop: 50,
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
        alignItems: 'center',
    },
    name: {
        fontSize: 30,
        color: '#000',
        fontWeight: '600',
        fontFamily: 'AvenirNext-UltraLight'
    },
    category: {
        marginTop: 20,
        fontSize: 13,
        color: '#9E9E9E',
        fontWeight: '300',
        fontFamily: 'AvenirNext-UltraLight'
    },
    row: {
        width: '100%',
        height: 18,
        marginTop: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    block: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    blockTxt: {
        fontSize: 16,
        fontWeight: '200',
        fontFamily: 'AvenirNext-UltraLight',
        marginLeft: 12,
    },
    step: {
        marginTop: 30,
        fontSize: 18,
        color: '#000',
        fontWeight: '300',
        fontFamily: 'AvenirNext-UltraLight'
    },
    stepContent: {
        marginTop: 20,
        width: '100%',
        paddingVertical: 20,
        backgroundColor: '#fff'
    },
    rowflex1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, 
        marginHorizontal: 20,
    },
    rowflex2: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
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
        width: '90%',
        fontSize: 17,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight', 
        marginLeft: 20,
    },
    addCart: {
        width: 166,
        height: 38,
        borderRadius: 44,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginBottom: 100,
        borderWidth: 1,
        borderColor: '#FEADB9'
    },
    addTxt: {
        fontSize: 18,
        color: '#E88493',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
    }, 
    update: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    quantity: {
        fontSize: 20,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
    },
    updateBlock: {
        backgroundColor: '#fff',
        width: 120,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center', 
        height: 56,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FEADB9',
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    amountTxt: {
        fontSize: 20,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
        textAlign: 'center'
    },
    amountContain: {
        width: '60%',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#FEADB9',
        borderRightColor: '#FEADB9',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default styles

