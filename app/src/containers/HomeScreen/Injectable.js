import { connect } from 'react-redux';
import { compose } from 'redux';
import HomeScreen from '.'


const mapStateToProps = (state) => {
    return {
        listHomeScreenRecipe: state.homescreen.listRecipe,
        listPopular: state.homescreen.listPopular,
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
)(HomeScreen)