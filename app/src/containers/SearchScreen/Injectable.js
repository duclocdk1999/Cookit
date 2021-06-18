import { connect } from 'react-redux';
import { compose } from 'redux';
import SearchScreen from '.';


const mapStateToProps = (state) => {
    return {
        listHomeScreenRecipe : state.homescreen.resultSearch,
        isShow: state.homescreen.isShow
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
)(SearchScreen)