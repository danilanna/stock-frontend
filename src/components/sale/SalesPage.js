import React, {createRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {reset} from '../../redux/actions/saleActions';
import Sales from "./Sales";
import Alert from "../common/Alert";

function SalesPage(props) {

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
            <Sales tableRef={tableRef}/>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(reset()),
    }
};

function mapStateToProps(state) {
    const {deleted} = state.saleReducer;
    return {
        deleted,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesPage)