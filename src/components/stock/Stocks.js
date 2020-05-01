import React from 'react';
import MaterialTable from 'material-table';
import {useHistory} from "react-router-dom";
import {deleteStock, openCloseDialog, openCloseAlert} from "../../redux/actions/stockActions";
import {connect} from "react-redux";
import AlertDialog from "../common/AlertDialog";
import StockApi from "../../redux/api/stockApi";

function Stocks(props) {

    const columns = [
            {title: 'Quantidade', field: 'quantity'},
            {title: 'Preço R$', field: 'price'},
            {title: 'Produto', field: 'product.name'},
            {title: 'Data de Cadastro', field: 'entryDate'},
            {title: 'Tipo', field: 'type'},
        ],
        history = useHistory();

    function remove(event, data) {
        event.preventDefault();
        data.label = 'product.name';
        props.openCloseDialog(true, data);
    }

    function callbackDialogYes() {
        const data = props.dialogData;
        props.deleteStock({id: data.id});
        props.openCloseDialog(false, {});
    }

    function edit(id) {
        props.openCloseAlert(false, {});
        history.push(`/stocks/${id}`)
    }

    function add() {
        props.openCloseAlert(false, {});
        history.push(`/stocks/new`)
    }

    return (
        <div>
            <AlertDialog yes={callbackDialogYes}/>
            <MaterialTable
                title="Estoque"
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
                data={query => StockApi.getAllStocks(query)
                    .catch(() => {
                        const error = {
                            message: "Ocorreu um erro ao buscar o estoque. Tente novamente mais tarde."
                        };
                        props.openCloseAlert(true, error);
                    })}
            />
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        deleteStock: (stock) => dispatch(deleteStock(stock)),
        openCloseDialog: (open, data) => dispatch(openCloseDialog(open, data)),
        openCloseAlert: (open, data) => dispatch(openCloseAlert(open, data)),
    }
};

function mapStateToProps(state) {
    const {isFetching, removed, openDialog, dialogData} = state.stockReducer;
    return {
        isFetching,
        removed,
        openDialog,
        dialogData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stocks)