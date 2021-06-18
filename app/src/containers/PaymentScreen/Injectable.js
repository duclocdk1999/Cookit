import { connect } from 'react-redux';
import { compose } from 'redux';
import PaymentScreen from '.'


const mapStateToProps = (state) => {
    return {
        index: state.homescreen.cart
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
)(PaymentScreen)