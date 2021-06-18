import { connect } from 'react-redux';
import { compose } from 'redux';
import RecipeScreen from '.';


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
)(RecipeScreen)