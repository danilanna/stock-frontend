import React, {createRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {reset} from '../../redux/actions/clientActions';
import Clients from "./Clients";
import Alert from "../common/Alert";

function ClientsPage(props) {

    const {deleted} = props;
    const tableRef = createRef();

    useEffect(() => {
        if (deleted) {
            tableRef.current.onQueryChange({page: 0});
        } else {
            props.reset();
        }
    }, [deleted]);

    return (
        <div>
            <Alert/>
            <Clients tableRef={tableRef}/>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(reset()),
    }
};

function mapStateToProps(state) {
    const {deleted} = state.clientReducer;
    return {
        deleted,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage)