import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    contentTxt: {
        textAlign: 'center',
        fontSize: 18,
    }
})

export default styles