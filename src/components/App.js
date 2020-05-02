import React from 'react';
import {Provider} from 'react-redux';
import Header from './common/Header';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./home/Home";
import ProductsPage from "./product/ProductsPage";
import Product from "./product/Product";
import StocksPage from "./stock/StocksPage";
import Stock from "./stock/Stock";
import BalancePage from "./balance/BalancePage";
import configureStore from '../redux/store/configureStore';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import ClientsPage from "./client/ClientsPage";
import Client from "./client/Client";

const store = configureStore();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function App() {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Provider store={store}>
            <Router>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.root}>
                            <Header classes={classes} theme={theme}/>
                            <Box width={1}>
                                <div className={classes.root}>
                                    <main className={classes.content}>
                                        <div className={classes.toolbar}/>
                                        <Switch>
                                            <Route exact path="/">
                                                <Home/>
                                            </Route>
                                            <Route exact path="/products">
                                                <ProductsPage/>
                                            </Route>
                                            <Route path="/products/:id">
                                                <Product/>
                                            </Route>
                                            <Route exact path="/stocks">
                                                <StocksPage/>
                                            </Route>
                                            <Route path="/stocks/:id">
                                                <Stock/>
                                            </Route>
                                            <Route exact path="/balance">
                                                <BalancePage/>
                                            </Route>
                                            <Route exact path="/clients">
                                                <ClientsPage/>
                                            </Route>
                                            <Route path="/clients/:id">
                                                <Client/>
                                            </Route>
                                        </Switch>
                                    </main>
                                </div>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Router>
        </Provider>
    );

}

export default App;