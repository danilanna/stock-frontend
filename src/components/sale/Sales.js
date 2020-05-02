import React from 'react';
import MaterialTable from 'material-table';
import {useHistory} from "react-router-dom";
import {deleteSale, openCloseDialog, openCloseAlert} from "../../redux/actions/saleActions";
import {connect} from "react-redux";
import AlertDialog from "../common/AlertDialog";
import SaleApi from "../../redux/api/saleApi";

function Sales(props) {

    const columns = [
            {title: 'Cliente', field: 'client.name'},
            {title: 'Data', field: 'entryDate'},
        ],
        history = useHistory();

    function remove(event, data) {
        event.preventDefault();
        data.label = 'name';
        props.openCloseDialog(true, data);
    }

    function callbackDialogYes() {
        const data = props.dialogData;
        props.deleteSale({id: data.id, name: data.name});
        props.openCloseDialog(false, {});
    }

    function edit(id) {
        props.openCloseAlert(false, {});
        history.push(`/sales/${id}`)
    }

    function add() {
        props.openCloseAlert(false, {});
        history.push(`/sales/new`)
    }

    return (
        <div>
            <AlertDialog yes={callbackDialogYes}/>
            <MaterialTable
                title="Vendas"
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
                data={query => SaleApi.getAllSales(query)
                    .catch(() => {
                        const error = {
                            message: "Ocorreu um erro ao buscar as vendas. Tente novamente mais tarde."
                        };
                        props.openCloseAlert(true, error);
                    })}
            />
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        deleteSale: (sale) => dispatch(deleteSale(sale)),
        openCloseDialog: (open, data) => dispatch(openCloseDialog(open, data)),
        openCloseAlert: (open, data) => dispatch(openCloseAlert(open, data)),
    }
};

function mapStateToProps(state) {
    const {isFetching, removed, openDialog, dialogData} = state.saleReducer;
    return {
        isFetching,
        removed,
        openDialog,
        dialogData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales)