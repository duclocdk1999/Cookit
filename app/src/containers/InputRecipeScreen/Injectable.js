import { connect } from 'react-redux';
import { compose } from 'redux';
import InputRecipeScreen from '.'


const mapStateToProps = (state) => {
    return {
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
)(InputRecipeScreen)