import { connect } from 'react-redux';
import { compose } from 'redux';
import FavoriteScreen from '.'


const mapStateToProps = (state) => {
    return {
        listHomeScreenRecipe: state.homescreen.listFavorite,
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
)(FavoriteScreen)