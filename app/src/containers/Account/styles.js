import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    scroll: {
        width: '100%',
        paddingHorizontal: 16, 
        alignItems: 'center',
        paddingTop: 35,
    },
    imgContain: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 1,
        borderColor: '#FEADB9',
        marginBottom: 20,
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    name: {
        fontSize: 18,
        color: '#615F5F',
        marginBottom: 20,
    },
    header: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        fontFamily: 'AvenirNext-UltraLight',
        marginBottom: 20
    },
    logoutBtn: {
        width: 100,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#FEADB9',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#D83371',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        marginBottom: 60
    },
    logoutTxt: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
    },
    more: {
        fontSize: 13,
        color: '#E0DCDC',
        fontWeight: '400',
        fontFamily: 'AvenirNext-UltraLight',
        marginBottom: 30,
        marginTop: 40,
    },
    list: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'space-between',
        marginBottom: 8
    },
    row: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0DCDC',
        marginLeft: 10
    },
    title: {
        fontSize: 15,
        color: '#615F5F'
    }
})

export default styles