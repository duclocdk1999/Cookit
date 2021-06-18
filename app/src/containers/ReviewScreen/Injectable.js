import { connect } from 'react-redux';
import { compose } from 'redux';
import ShoppingScreen from '.'


const mapStateToProps = (state) => {
    return {
        cart: state.homescreen.cart,
        cartInfo: state.homescreen.cartInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
)

export default compose(
    withConnect
)(ShoppingScreen)