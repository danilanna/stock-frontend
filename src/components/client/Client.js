import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {connect} from 'react-redux';
import {loadClientById, reset, saveClient} from '../../redux/actions/clientActions';
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

function Client(props) {
    const {id} = useParams();
    const {client, isFetching, saved} = props;
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (id !== 'new' || saved) {
            if (!isFetching || saved) {
                const clientId = id !== 'new' ? id : client.id;
                props.loadClients(clientId);
            }
        }
    }, [saved]);

    function submit(event) {
        event.preventDefault();
        const saveClient = {
            name: event.target.name.value,
            id: client.id
        };
        props.saveClient(saveClient);
    }

    function cancel() {
        history.push("/clients");
        props.reset();
    }

    if (isFetching) {
        return (<div>Loading...</div>)
    } else {
        return (
            <div>
                <Alert/>
                <form className={classes.root} autoComplete="off" onSubmit={submit}>
                    <TextField required id="name" label="Nome" defaultValue={client.name} fullWidth/>
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
        loadClients: (id) => dispatch(loadClientById(id)),
        saveClient: (client) => dispatch(saveClient(client)),
        reset: () => dispatch(reset()),
    }
};

function mapStateToProps(state) {
    const {client, isFetching, saved} = state.clientReducer;
    return {
        client,
        isFetching,
        saved
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)