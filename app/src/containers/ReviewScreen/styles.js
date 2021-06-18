import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        marginVertical: 10,
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        fontFamily: 'AvenirNext-UltraLight'
    },
    recipeItem: {
        marginTop: 5,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6'
    },
    recipeName: {
        textAlign: 'center',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#5A5A5A',
        fontSize: 17,
        fontFamily: 'AvenirNext-UltraLight'
    },
    recipeQty: {
        textAlign: 'center',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#5A5A5A',
        fontSize: 17,
        fontFamily: 'AvenirNext-UltraLight'
    },
    recipeAmount: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    updateBlock: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center', 
        height: 28,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FEADB9',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    amountContain: {
        width: '40%',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#FEADB9',
        borderRightColor: '#FEADB9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountTxt: {
        fontSize: 10,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
        textAlign: 'center'
    },
    recipeRemove: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ingreName: {
        textAlign: 'center',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#5A5A5A',
        fontSize: 17,
        fontFamily: 'AvenirNext-UltraLight'
    },
    ingreAmount: {
        textAlign: 'center',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#5A5A5A',
        fontSize: 17,
        fontFamily: 'AvenirNext-UltraLight'
    },
    ingreUnit: {
        textAlign: 'center',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#5A5A5A',
        fontSize: 17,
        fontFamily: 'AvenirNext-UltraLight'
    },
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    recipe: {
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
    listTxt: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FEADB9',
        fontFamily: 'AvenirNext-UltraLight'
    },
    headerRecipe: {
        marginTop: 5,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6'
    },
    items: {
        textAlign: 'center',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A6A6A6',
        fontSize: 17,
        fontFamily: 'AvenirNext-UltraLight'
    },
    quantity: {
        textAlign: 'center',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A6A6A6',
        fontSize: 17,
        fontFamily: 'AvenirNext-UltraLight'
    },
    unit: {
        textAlign: 'center',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A6A6A6',
        fontSize: 17,
        fontFamily: 'AvenirNext-UltraLight'
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
        backgroundColor: '#FEADB9',
        marginBottom: 20
    },
    shoppingTxt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    childTxt: {
        marginTop: 5,
        width: '100%',
        color: '#5A5A5A',
        fontSize: 17,
        fontFamily: 'AvenirNext-UltraLight'
    }
})

export default styles