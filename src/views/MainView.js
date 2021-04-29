import React, {useEffect, useState} from 'react';
import {authenticateUser} from "../services/auth-service";
import CenteredProgressLoader from "../shared-components/CenteredProgressLoader";
import {MainContextProvider} from "../contexts/MainContext";
import Snackbar from "@material-ui/core/Snackbar";
import {
    Route,
    BrowserRouter as Router, Redirect,
    Switch,
} from 'react-router-dom'
import Alert from "@material-ui/lab/Alert";
import Navigator from "./Navigator";
import UpdateTruckInfo from "./UpdateTruckInfo";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import GetOrderNearbyTrucks from "./GetOrderNearbyTrucks";
import ShopIcon from '@material-ui/icons/Shop';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NotFound from "./NotFound";

const MainView = (props) => {
    const [finishedLoading, setFinishedLoading] = useState(true);
    const [msgSnackbar, setMsgSnackbar] = useState({});

    useEffect(() => {
        // verificar si esta logueado
        authenticateUser(localStorage.getItem('user'), localStorage.getItem('password'))
            .then(response => {
                if (response.validLogin) {
                    console.log('user found in local storage')
                } else {
                    props.history.push('/login');
                }
            })
            .catch(err => {
                console.log('MainView promise err: ' + err);
                setMsgSnackbar(err);
                props.history.push('/login');
                setFinishedLoading(true);
            });
    }, []);

    const setMsgSnackbarFunc = (message, severity) => {
        setMsgSnackbar({message: message, severity: severity});
    };

    const contextValue = {
        setMsgSnackbar: (message, severity = 'error') => setMsgSnackbarFunc(message, severity)
    };

    if (finishedLoading) {

        const routesList = {
            updateTruckInfo: {
                component: (
                    <Route path="/update-truck-info" key="/update-truck-info" render={(props) => <UpdateTruckInfo {...props} />}/>
                ),
                navigatorParams: {label: 'Update truck', to: '/update-truck-info', icon: <LocalShippingIcon/>}
            },
            getOrderNearbyTrucks: {
                component: (
                    <Route path="/get-nearby-trucks" key="/get-nearby-trucks" render={(props) => <GetOrderNearbyTrucks {...props} />}/>
                ),
                navigatorParams: {label: 'Order nearby trucks', to: '/get-nearby-trucks', icon: <ShopIcon/>}
            }
        };

        const userRoutes = {
            routes: [routesList.updateTruckInfo, routesList.getOrderNearbyTrucks],
            defaultRoute: '/update-truck-info'
        };

        return (
            <div>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                          open={msgSnackbar && msgSnackbar.message && msgSnackbar.message !== ''} autoHideDuration={60000} onClose={() => setMsgSnackbar({})}
                >
                    <Alert onClose={() => setMsgSnackbar({})} severity={msgSnackbar.message ? msgSnackbar.severity === 'success' ? 'success' : 'error' : ''}>
                        {msgSnackbar.message && msgSnackbar.message.toString()}
                    </Alert>
                </Snackbar>
                <MainContextProvider value={contextValue}>
                    <Router>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Redirect to={window.location.pathname === '/' ? userRoutes.defaultRoute : window.location.pathname} push/>
                            <Navigator userAllowedLinks={userRoutes.routes.map(route => route.navigatorParams)}
                                       appRouterHistory={props.history}/>
                            <Switch>
                                {userRoutes.routes.map(route => route.component)}
                                <Route key="/notFound" render={() => <NotFound returnRoute={userRoutes.defaultRoute}/>}/>
                            </Switch>
                        </div>
                    </Router>
                </MainContextProvider>
            </div>
        );
    } else {
        return (
            <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CenteredProgressLoader/>
            </div>
        )
    }
};

export default MainView;