import React, {createRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {reset} from '../../redux/actions/productActions';
import Products from "./Products";
import Alert from "../common/Alert";

function ProductsPage(props) {

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
            <Products tableRef={tableRef}/>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(reset()),
    }
};

function mapStateToProps(state) {
    const {deleted} = state.productReducer;
    return {
        deleted,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)