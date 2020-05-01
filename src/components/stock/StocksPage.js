import React, {createRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {reset} from '../../redux/actions/stockActions';
import Stocks from "./Stocks";
import Alert from "../common/Alert";

function StocksPage(props) {

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
            <Stocks tableRef={tableRef}/>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(reset()),
    }
};

function mapStateToProps(state) {
    const {deleted} = state.stockReducer;
    return {
        deleted,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksPage)