import { connect } from 'react-redux';
import { compose } from 'redux';
import ThankYouScreen from '.'


const mapStateToProps = (state) => {
    return {
        cart: state.homescreen.cart
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
)(ThankYouScreen)