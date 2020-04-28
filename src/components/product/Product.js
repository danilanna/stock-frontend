import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {connect} from 'react-redux';
import {loadProductById, reset, saveProduct} from '../../redux/actions/productActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {Cancel} from "@material-ui/icons";
import {Grid} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        '& .MuiButton-contained ': {
            margin: theme.spacing(2),
        },
    },
}));

function Product(props) {
    const {id} = useParams();
    const {product, isFetching, saved} = props;
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (id !== 'new' || saved) {
            if (!isFetching || saved) {
                const productId = id !== 'new' ? id : product.id;
                props.loadProducts(productId);
            }
        }
    }, [saved]);

    function submit(event) {
        event.preventDefault();
        const saveProduct = {
            name: event.target.name.value,
            description: event.target.description.value,
            id: product.id
        };
        props.saveProduct(saveProduct);
    }

    function cancel() {
        history.push("/products");
        props.reset();
    }

    if (isFetching) {
        return (<div>Loading...</div>)
    } else {
        return (
            <div>
                <Alert/>
                <form className={classes.root} autoComplete="off" onSubmit={submit}>
                    <TextField required id="name" label="Nome" defaultValue={product.name} fullWidth/>
                    <TextField fullWidth
                               defaultValue={product.description}
                               label="Descrição do Produto"
                               rows={4}
                               multiline
                               id="description"
                    />
                    <Grid container
                          direction="row"
                          justify="flex-end"
                          alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<Cancel/>}
                            onClick={cancel}>
                            Voltar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon/>}
                            type="submit">
                            Salvar
                        </Button>
                    </Grid>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProducts: (id) => dispatch(loadProductById(id)),
        saveProduct: (product) => dispatch(saveProduct(product)),
        reset: () => dispatch(reset()),
    }
};

function mapStateToProps(state) {
    const {product, isFetching, saved} = state.productReducer;
    return {
        product,
        isFetching,
        saved
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)