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
        color: '#000000',
        fontWeight: '600',
        fontFamily: 'AvenirNext-UltraLight'
    },
    message: {
        fontSize: 14,
        marginTop: 14,
        fontFamily: 'AvenirNext-UltraLight',
        color: '#000000',
        fontWeight: '300'
    },
    email: {
        width: '100%',
        marginTop: 120,
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