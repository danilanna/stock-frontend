import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {openCloseDialog} from "../../redux/actions/productActions";
import {connect} from "react-redux";

function AlertDialog(props) {

    const handleClose = () => {
      props.openCloseDialog(false, {});
    };

    return (
        <div>
            <Dialog
                open={props.openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja remover o registro {props.dialogData[props.dialogData['label']]}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Não
                    </Button>
                    <Button onClick={props.yes} color="primary" autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        openCloseDialog: (open, data) => dispatch(openCloseDialog(open, data)),
    }
};

function mapStateToProps(state) {
    const {openDialog, dialogData} = state.productReducer;
    return {
        openDialog,
        dialogData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog)