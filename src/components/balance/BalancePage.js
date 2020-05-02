import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from "@date-io/date-fns";
import brLocale from "date-fns/locale/pt-BR";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import {Cancel, Refresh} from "@material-ui/icons";
import Alert from "../common/Alert";
import {fetchBalance, setStart, setEnd} from '../../redux/actions/balanceActions';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    container: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    divider: {
        marginTop: theme.spacing(5),
    }
}));

function Dates(props) {
    const {start, end, isFetching} = props;

    const handleStartDateChange = (date) => {
        props.setStart(date);
    };

    const handleEndDateChange = (date) => {
        props.setEnd(date);
    };

    function search() {
        props.fetchBalance(start, end);
    }

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                <Grid container
                      direction="row"
                      justify="space-between"
                      alignItems="center">
                    <Grid item xs={12} sm={5}>
                        <KeyboardDatePicker
                            fullWidth
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="start"
                            label="Inicio"
                            value={start}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <KeyboardDatePicker
                            fullWidth
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="end"
                            label="Fim"
                            value={end}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
            <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="center">
                <Grid item>
                    <Button
                        disabled={isFetching}
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<Refresh/>}
                        onClick={search}>
                        Pesquisar
                    </Button>
                </Grid>

            </Grid>
        </div>)
}

function Balances(props) {
    const classes = useStyles();
    const {balance, hasBeenFetched} = props;

    if (!hasBeenFetched) {
        return (<div></div>)
    } else {
        return (
            <div>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Balanço do estoque - Total
                    </Typography>
                    <div className={classes.container}>
                        <Grid container spacing={3}>
                            {
                                balance.completeBalances.map(value => {
                                    return (
                                        <Grid item xs={12} sm key={value.productName + "balance"}>
                                            <Card className={classes.root}>
                                                <CardContent>
                                                    <Typography component="h1" variant="h5" color="textSecondary"
                                                                gutterBottom>
                                                        {value.productName}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Quantidate: {value.quantityTotal}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Valor: {value.priceTotal}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </div>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Balanço do estoque - Filtrado pela data
                    </Typography>
                    <div className={classes.container}>
                        <Grid container spacing={3}>
                            {
                                balance.balances.map(value => {
                                    return (
                                        <Grid item xs={12} sm key={value.productName + "balance"}>
                                            <Card className={classes.root}>
                                                <CardContent>
                                                    <Typography component="h1" variant="h5" color="textSecondary"
                                                                gutterBottom>
                                                        {value.productName}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Quantidate: {value.quantityTotal}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Valor: {value.priceTotal}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Balanço do estoque - Entradas - Filtrado pela data
                    </Typography>
                    <div className={classes.container}>
                        <Grid container spacing={3}>
                            {
                                balance.ins.map(value => {
                                    return (
                                        <Grid item xs={12} sm key={value.productName + "ins"}>
                                            <Card className={classes.root}>
                                                <CardContent>
                                                    <Typography component="h1" variant="h5" color="textSecondary"
                                                                gutterBottom>
                                                        {value.productName}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Quantidate: {value.quantityTotal}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Valor: {value.priceTotal}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Balanço do estoque - Saidas - Filtrado pela data
                    </Typography>
                    <div className={classes.container}>
                        <Grid container spacing={3}>
                            {
                                balance.outs.map(value => {
                                    return (
                                        <Grid item xs={12} sm key={value.productName + "outs"}>
                                            <Card className={classes.root}>
                                                <CardContent>
                                                    <Typography component="h1" variant="h5" color="textSecondary"
                                                                gutterBottom>
                                                        {value.productName}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Quantidate: {value.quantityTotal}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Valor: {value.priceTotal}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}

function BalancePage(props) {

    return (
        <Container component="main" maxWidth={"xl"}>
            <Alert/>
            <CssBaseline/>
            <Dates {...props}/>
            <Balances {...props}/>
        </Container>
    );

}

const mapDispatchToProps = dispatch => {
    return {
        fetchBalance: (start, end) => dispatch(fetchBalance(start, end)),
        setStart: (date) => dispatch(setStart(date)),
        setEnd: (date) => dispatch(setEnd(date)),
    }
};

function mapStateToProps(state) {
    const {balance, isFetching, start, end, hasBeenFetched} = state.balanceReducer;
    return {
        balance,
        isFetching,
        start,
        end,
        hasBeenFetched
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalancePage)