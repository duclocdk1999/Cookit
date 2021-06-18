import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    login: {
        fontSize: 36,
        fontWeight: '600',
        color: '#000000',
        fontFamily: 'AvenirNext-UltraLight',
        fontWeight: '300'
    },
    message: {
        fontWeight: '400',
        color: '#000',
        fontSize: 14,
        marginTop: 14,
        fontFamily: 'AvenirNext-UltraLight'
    },
    name: {
        width: '100%',
        marginTop: 70,
        padding: 16,
        height: 48,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        fontFamily: 'AvenirNext-UltraLight', 
        fontWeight: '300',
    },
    password: {
        width: '100%',
        marginTop: 14,
        padding: 16,
        height: 48,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        fontFamily: 'AvenirNext-UltraLight',
        fontWeight: '300',
    },
    loginBtn: {
        marginTop: 28,
        backgroundColor: '#FEADB9'
    },
    contentLogin: {
        color: '#FFFFFF',
    },
})

export default styles