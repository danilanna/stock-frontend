import React from 'react';
import MaterialTable from 'material-table';
import {useHistory} from "react-router-dom";
import {deleteProduct, openCloseDialog, openCloseAlert} from "../../redux/actions/productActions";
import {connect} from "react-redux";
import AlertDialog from "../common/AlertDialog";
import ProductApi from "../../redux/api/productApi";

function Products(props) {

    const columns = [
            {title: 'Name', field: 'name'},
        ],
        history = useHistory();

    function remove(event, data) {
        event.preventDefault();
        data.label = 'name';
        props.openCloseDialog(true, data);
    }

    function callbackDialogYes() {
        const data = props.dialogData;
        props.deleteProduct({id: data.id, name: data.name});
        props.openCloseDialog(false, {});
    }

    function edit(id) {
        props.openCloseAlert(false, {});
        history.push(`/products/${id}`)
    }

    function add() {
        props.openCloseAlert(false, {});
        history.push(`/products/new`)
    }

    return (
        <div>
            <AlertDialog yes={callbackDialogYes}/>
            <MaterialTable
                title="Produtos"
                columns={columns}
                tableRef={props.tableRef}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Adicionar',
                        isFreeAction: true,
                        onClick: () => add()
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => edit(rowData.id)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Deletar',
                        onClick: (event, rowData) => remove(event, rowData)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    searchText: props.queryText,
                    isLoading: props.isFetching,
                    debounceInterval: 500,
                }}
                localization={{
                    toolbar: {searchPlaceholder: "Procurar", searchTooltip: "Procurar"},
                    body: {emptyDataSourceMessage: "Nenhum resultado encontrado"},
                    header: {actions: "Ações"},
                    pagination: {
                        labelRowsSelect: "Linhas",
                        labelDisplayedRows: "{from}-{to} de {count}",
                        nextTooltip: "Proxima",
                        lastTooltip: "Ultima",
                        previousTooltip: "Anterior",
                        firstTooltip: "Primeira"
                    }

                }}
                data={query => ProductApi.getAllProducts(query)
                    .catch(() => {
                        const error = {
                            message: "Ocorreu um erro ao buscar os produtos. Tente novamente mais tarde."
                        };
                        props.openCloseAlert(true, error);
                    })}
            />
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProduct: (product) => dispatch(deleteProduct(product)),
        openCloseDialog: (open, data) => dispatch(openCloseDialog(open, data)),
        openCloseAlert: (open, data) => dispatch(openCloseAlert(open, data)),
    }
};

function mapStateToProps(state) {
    const {isFetching, removed, openDialog, dialogData} = state.productReducer;
    return {
        isFetching,
        removed,
        openDialog,
        dialogData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)