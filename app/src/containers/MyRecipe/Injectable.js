import { connect } from 'react-redux';
import { compose } from 'redux';
import MyRecipe from '.'


const mapStateToProps = (state) => {
    return {
        listHomeScreenRecipe: state.homescreen.listMyRecipe,
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
)(MyRecipe)