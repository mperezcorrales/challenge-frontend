import React from 'react';
import {ArrowBack} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {NavLink} from "react-router-dom";

const NotFound = (props) => {
    return (
        <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
            <h1>Página no encontrada</h1>
            <br/>
            <NavLink activeClassName="active" to={props.returnRoute}>
                <Button variant="contained" color="primary">
                    Regresar al inicio
                    <ArrowBack/>
                </Button>
            </NavLink>
        </Grid>
    );
};

export default NotFound;

