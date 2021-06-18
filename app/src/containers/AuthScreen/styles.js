import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    image: {
        marginBottom: '25%'
    },
    login: {
        backgroundColor: '#FEADB9'
    },
    contentLogin: {
        color: '#FFFFFF',
    },
    socialLogin: {
        backgroundColor: '#3B5998'
    },
    contentSocialLogin: {
        color: '#FFFFFF',
    },
    guestLogin: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FEADB9',
        borderWidth: 2,
    },
    contentGuestLogin: {
        color: '#AA606B'
    },
    txt: {
        marginTop: 14,
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
        fontFamily: 'AvenirNext-UltraLight', 
        fontWeight: '300'
    }
})

export default styles