import React, {useState} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    root: {
        background: '#222437',
    },
    logoText: {
        fontWeight: '200',
        '& span': {
            fontWeight: '200'
        },
        '& sup': {
            fontSize: '9px',
        }
    },
    iconMenu: {
        color: '#2cc0b1',
    },
    btnLogout: {
        background: '#e6e6e6',
        color: '#3e3c4e',
        lineHeight: 1.2,
        '&:hover': {
            background: 'white',
        }
    },
    positionTop: {
        top: '56px!important',
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            top: '48px!important',
        },
        [theme.breakpoints.up('sm')]: {
            top: '64px!important',
        },
    },
    itemMenu: {
        paddingLeft: '24px',
        boxShadow: `0px 1px 0px 0px ${theme.palette.divider}`,
        '&>div:first-of-type': {
            minWidth: '36px',
        }
    },
    infoDev: {
        position: 'absolute',
        top: '43px',
        backgroundColor: 'red',
        padding: '2px 4px',
        textTransform: 'uppercase',
        fontSize: '11px',
        left: '56px',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            top: '37px',
            left: '47px',
        },
    }
}));

const Navigator = ({
                       userAllowedLinks,
                       appRouterHistory
                   }) => {

    const isBiggerThanMobile = useMediaQuery('(min-width:600px)');
    const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(false);

    const onCloseSessionClicked = () => {
        localStorage.clear();
        appRouterHistory.push('/login');
    };

    return (
        <>
            <AppBar
                position="static"
                className={classes.root}
            >
                <Toolbar>
                    {process.env.REACT_APP_ENVIRONMENT !== 'production' && (
                        <div className={classes.infoDev}>
                            {'Modo: '}
                            {process.env.REACT_APP_ENVIRONMENT_NAME}
                        </div>
                    )}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Menu"
                        className={classes.iconMenu}
                        onClick={() => setOpenDrawer(!openDrawer)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{flexGrow: 1, display: 'flex', justifyContent: 'space-between'}}>
                        <Typography
                            variant="h6"
                            className={classes.logoText}
                        >
                            <strong>Quicargo</strong>
                        </Typography>

                        {isBiggerThanMobile && (
                            <Typography variant="h6" style={{marginLeft: '40px'}}>{'¡Bienvenido ' + 'Usuario' + '!'}</Typography>
                        )}

                        <Button
                            color="inherit"
                            onClick={onCloseSessionClicked}
                            className={classes.btnLogout}
                        >
                            Cerrar sesión
                        </Button>
                    </div>

                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                BackdropProps={{
                    className: classes.positionTop,
                }}
                classes={{
                    root: classes.positionTop,
                    paper: classes.positionTop,
                }}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
            >
                <div
                    style={{width: 250}}
                    role="presentation"
                    onClick={() => setOpenDrawer(false)}
                    onKeyDown={() => setOpenDrawer(false)}
                >
                    <List>
                        {userAllowedLinks.map((drawerItem) => (
                            <ListItem
                                button
                                key={drawerItem.label}
                                to={drawerItem.to}
                                component={Link}
                                className={classes.itemMenu}
                            >
                                <ListItemIcon>{drawerItem.icon}</ListItemIcon>
                                <ListItemText primary={drawerItem.label}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </SwipeableDrawer>
        </>
    );
};

export default withRouter(Navigator)
