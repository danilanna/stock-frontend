import React, {useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {Cancel, LocalAtm} from "@material-ui/icons";
import {Grid} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DateFnsUtils from "@date-io/date-fns";
import brLocale from "date-fns/locale/pt-BR";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {
    loadSaleById,
    reset,
    saveSale,
    loadProducts,
    loadClients,
    setProductQuantity,
    setClient,
    setEntryDate,
    setProductPrice,
    openCloseAlert,
    setProducts,
    setTotal,
} from '../../redux/actions/saleActions';
import Alert from "../common/Alert";
import CurrencyInput from "../common/CurrencyInput";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiFormControl-marginNormal': {
            marginTop: 0,
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function ProductList(props) {
    let {products, sale, productsSet} = props;

    const handleProductQuantityChange = (event, index) => {
        props.setProductQuantity(event.target.value, index);
        props.setTotal();
    };

    const handleProductPriceChange = (event, index) => {
        props.setProductPrice(event.target.value, index);
        props.setTotal();
    };

    if (!productsSet && sale.stocks) {
        sale.stocks.forEach(stockProduct => {
            products.forEach((product, i) => {
                if (product.id === stockProduct.product.id) {
                    props.setProductPrice(stockProduct.price, i);
                    props.setProductQuantity(stockProduct.quantity, i);
                }
            });
        });
        props.setProducts({});

    }

    return <List dense>
        {
            products.map((value, index) => {
                return (
                    <ListItem key={value.id} button>
                        <Grid container direction="row" justify="space-around"
                              alignItems="center" spacing={2}>
                            <ListItemText id={value.id} primary={value.name}/>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    onChange={(event) => handleProductPriceChange(event, index)}
                                    fullWidth
                                    variant="outlined"
                                    label="Valor"
                                    value={value.price}
                                    name="price"
                                    id="price"
                                    InputProps={{
                                        inputComponent: CurrencyInput,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    onChange={(event) => handleProductQuantityChange(event, index)}
                                    fullWidth
                                    variant="outlined"
                                    label="Quantidade"
                                    id="quantity"
                                    type="number"
                                    value={value.quantity}
                                />
                            </Grid>
                        </Grid>
                    </ListItem>
                );
            })}
    </List>;
}

function Sale(props) {
    const {id} = useParams();
    const {sale, isFetching, saved, isFetchingProducts, isFetchingClients, products, clients, totalValue} = props;
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        props.loadProducts();
        props.loadClients();
        if (id !== 'new' || saved) {
            if (!isFetching || saved) {
                const saleId = id !== 'new' ? id : sale.id;
                props.loadSales(saleId);
            }
        }
    }, [saved]);

    function submit(event) {
        event.preventDefault();

        if (sale.client && !sale.client.id) {
            props.openCloseAlert(true, {message: "Selecione um Cliente!"});
            return;
        }

        let date = sale.entryDate ? new Date(sale.entryDate).toLocaleDateString("pt-BR") : new Date().toLocaleDateString("pt-BR");

        date = date.split("/")[2] + '-' + date.split("/")[1] + '-' + date.split("/")[0];

        const stockList = [];
        let isInvalid = false;
        products.forEach(product => {
            if ((product.quantity !== undefined && product.price === undefined) || (product.price !== undefined && product.quantity === undefined)) {
                props.openCloseAlert(true, {message: "Por favor cadastre corretamente o produto: " + product.name + ". Quantidade e/ou Preco estao vazios"});
                isInvalid = true;
            }
            if (product.quantity !== undefined  && product.quantity !== "" && product.price !== undefined && product.price !== "") {
                const stock = {};
                stock.quantity = product.quantity;
                stock.price = product.price;
                stock.product = product;
                stock.entryDate = date;
                stock.type = "OUT";
                stockList.push(stock);
            }
        });
        if (isInvalid) {
            return;
        }
        const saleSave = {...sale};
        saleSave.stockList = null;
        saleSave.entryDate = date;
        saleSave.stocks = stockList;
        props.saveSale(saleSave);
    }

    function cancel() {
        history.push("/sales");
        props.reset();
    }

    const handleClientChange = (value) => {
        props.setClient(value.target.value);
    };

    const handleDateChange = (date) => {
        props.setEntryDate(date);
    };

    if (isFetching || isFetchingProducts || isFetchingClients) {
        return (<div>Loading...</div>)
    } else {
        return (
            <Container component="main" maxWidth="lg">
                <Alert/>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LocalAtm/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Realizar Venda
                    </Typography>
                    <Typography component="h1" variant="h5">
                        Total da Venda: R$: {totalValue.toFixed(2)}
                    </Typography>
                    <form className={classes.form} autoComplete="off" onSubmit={submit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="product">Cliente</InputLabel>
                                    <Select
                                        fullWidth
                                        required
                                        id="client"
                                        name="client"
                                        value={sale.client.id}
                                        onChange={handleClientChange}
                                        defaultValue={""}>
                                        {
                                            clients.map((value) => {
                                                return (
                                                    <MenuItem value={value.id} key={value.id}>
                                                        <em>{value.name}</em>
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                                <Grid item xs={12} sm={6}>
                                    <KeyboardDatePicker
                                        fullWidth
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="entryDate"
                                        label="Data da venda"
                                        value={sale.entryDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid item xs={12}>
                                <ProductList {...props}/>
                            </Grid>
                        </Grid>

                        <Grid container
                              direction="row"
                              justify="space-between"
                              alignItems="center">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<Cancel/>}
                                onClick={cancel}
                                className={classes.submit}>
                                Voltar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon/>}
                                type="submit"
                                className={classes.submit}>
                                Salvar
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProducts: () => dispatch(loadProducts()),
        loadClients: () => dispatch(loadClients()),
        loadSales: (id) => dispatch(loadSaleById(id)),
        saveSale: (sale) => dispatch(saveSale(sale)),
        setProductQuantity: (quantity, index) => dispatch(setProductQuantity(quantity, index)),
        setProductPrice: (price, index) => dispatch(setProductPrice(price, index)),
        setProducts: (products) => dispatch(setProducts(products)),
        setClient: (clientId) => dispatch(setClient(clientId)),
        setEntryDate: (date) => dispatch(setEntryDate(date)),
        reset: () => dispatch(reset()),
        setTotal: () => dispatch(setTotal()),
        openCloseAlert: (status, message) => dispatch(openCloseAlert(status, message)),
    }
};

function mapStateToProps(state) {
    const {sale, isFetching, saved, isFetchingProducts, isFetchingClients, clients, products, productsSet, totalValue} = state.saleReducer;
    return {
        sale,
        isFetching,
        saved,
        isFetchingProducts,
        isFetchingClients,
        clients,
        products,
        productsSet,
        totalValue,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sale)