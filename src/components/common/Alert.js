import React from 'react';
import {connect} from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import {openCloseAlert} from "../../redux/actions/productActions";

function Alert(props) {

    const {alertData, openAlert} = props;

    const handleClose = (event, reason) => {
        event.preventDefault();
        props.openCloseAlert(false, {});
    };

    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            key={'top,right'}
            open={openAlert}
            onClose={handleClose}
            message={alertData.message}>
        </Snackbar>

    );
}

const mapDispatchToProps = dispatch => {
    return {
        openCloseAlert: (option, data) => dispatch(openCloseAlert(option, data)),
    }
};


function mapStateToProps(state) {
    const {alertData, openAlert} = state.productReducer;
    return {
        alertData,
        openAlert,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)