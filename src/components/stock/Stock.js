import React, {useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import brLocale from "date-fns/locale/pt-BR";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {Cancel} from "@material-ui/icons";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Typography from '@material-ui/core/Typography';
import Alert from "../common/Alert";
import CurrencyInput from "../common/CurrencyInput";
import {
    loadStockById,
    reset,
    saveStock,
    loadProducts,
    openCloseAlert,
    setEntryDate,
    setType,
    setProduct,
    setPrice,
    setQuantity
} from '../../redux/actions/stockActions';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

function Stock(props) {
    const {id} = useParams();
    const {stock, isFetching, saved, isFetchingProducts, products} = props;
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        props.loadProducts();
        if (id !== 'new' || saved) {
            if (!isFetching || saved) {
                const stockId = id !== 'new' ? id : stock.id;
                props.loadStocks(stockId);
            }
        }
    }, [saved]);

    function submit(event) {
        event.preventDefault();

        if (!stock.type) {
            props.openCloseAlert(true, {message: "Selecione um Tipo de cadastro!"});
            return;
        } else if (!stock.product) {
            props.openCloseAlert(true, {message: "Selecione um produto!"});
            return;
        }

        let date = stock.entryDate ? new Date(stock.entryDate).toLocaleDateString("pt-BR") : new Date().toLocaleDateString("pt-BR");

        date = date.split("/")[2] + '-' + date.split("/")[1] + '-' + date.split("/")[0];

        const saveStock = {
            quantity: event.target.quantity.value,
            price: event.target.price.value.replace("R$", "").replace(".", "").replace(",", "."),
            product: stock.product,
            entryDate: date,
            type: stock.type === "Entrada" ? "IN" : "OUT",
            id: stock.id
        };
        props.saveStock(saveStock);
    }

    function cancel() {
        history.push("/stocks");
        props.reset();
    }

    const handleProductChange = (value) => {
        props.setProduct(value.target.value);
    };

    const handleTypeChange = (value) => {
        props.setType(value.target.value);
    };

    const handleDateChange = (date) => {
        props.setEntryDate(date);
    };

    const handlePriceChange = (value) => {
        props.setPrice(value.target.value);
    };

    const handleQuantityChange = (value) => {
        props.setQuantity(value.target.value);
    };

    if (isFetching || isFetchingProducts) {
        return (<div>Loading...</div>)
    } else {
        return (
            <Container component="main" maxWidth="sm">
                <Alert/>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <NoteAdd/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastrar estoque
                    </Typography>
                    <form className={classes.form} autoComplete="off" onSubmit={submit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="product">Tipo de cadastro</InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        id="product"
                                        name="product"
                                        value={stock.type}
                                        onChange={handleTypeChange}
                                        defaultValue={""}>

                                        <MenuItem value={"Entrada"}>
                                            <em>Entrada</em>
                                        </MenuItem>

                                        <MenuItem value={"Saida"}>
                                            <em>Saida</em>
                                        </MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="product">Produto</InputLabel>
                                    <Select
                                        fullWidth
                                        required
                                        id="product"
                                        name="product"
                                        value={stock.product.id}
                                        onChange={handleProductChange}
                                        defaultValue={""}>
                                        {
                                            products.map((value) => {
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={handlePriceChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Valor"
                                    value={stock.price}
                                    name="price"
                                    id="price"
                                    InputProps={{
                                        inputComponent: CurrencyInput,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={handleQuantityChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Quantidade"
                                    id="quantity"
                                    type="number"
                                    value={stock.quantity}
                                />
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                                <Grid item xs={12}>
                                    <KeyboardDatePicker
                                        fullWidth
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="entryDate"
                                        label="Data do cadastro"
                                        value={stock.entryDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
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
        loadStocks: (id) => dispatch(loadStockById(id)),
        saveStock: (stock) => dispatch(saveStock(stock)),
        reset: () => dispatch(reset()),
        openCloseAlert: (status, data) => dispatch(openCloseAlert(status, data)),
        setEntryDate: (date) => dispatch(setEntryDate(date)),
        setType: (type) => dispatch(setType(type)),
        setProduct: (productId) => dispatch(setProduct(productId)),
        setPrice: (price) => dispatch(setPrice(price)),
        setQuantity: (quantity) => dispatch(setQuantity(quantity)),
    }
};

function mapStateToProps(state) {
    const {stock, isFetching, saved, isFetchingProducts, products} = state.stockReducer;
    return {
        stock,
        isFetching,
        saved,
        isFetchingProducts,
        products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)