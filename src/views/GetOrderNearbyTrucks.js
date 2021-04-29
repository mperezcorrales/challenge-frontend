import React, {useContext, useEffect, useState} from 'react';
import MainContext from "../contexts/MainContext";
import {getTruckListData, requestOrderAndGetNearbyTrucks, updateTruckInfo} from "../services/general-service";
import {Truck} from "../models/Truck";
import Typography from "@material-ui/core/Typography";
import TruckListTable from "../shared-components/TruckListTable";
import Paper from "@material-ui/core/Paper";
import {Form} from "react-final-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CenteredProgressLoader from "../shared-components/CenteredProgressLoader";
import {
    TextField as TextFieldFinalForm
} from 'mui-rff';

const GetOrderNearbyTrucks = () => {

    const [showLoader, setShowLoader] = useState(true);
    const mainContext = useContext(MainContext);

    const [truckData, setTruckData] = useState([]);
    const [nearbyTrucksFound, setNearbyTrucksFound] = useState([]);

    const getTruckData = () => {
        getTruckListData()
            .then(trucks => {
                setTruckData(trucks.map(truck => new Truck(truck)).sort((a, b) => a.id - b.id));
            })
            .catch(err => {
                console.log('getTruckListData err: ' + err);
                mainContext.setMsgSnackbar(err);
            })
            .finally(() => setShowLoader(false));
    };

    useEffect(() => {
        getTruckData();
    }, []);

    const onGetNearbyTrucks = (orderRequestParams) => {
        console.log('orderRequestParams', orderRequestParams);
        setShowLoader(true);
        let orderRequestBody = {
            pickupGeoLocation: {
                latitude: parseFloat(orderRequestParams.pickupLatitude),
                longitude: parseFloat(orderRequestParams.pickupLongitude),
            },
            deliveryGeoLocation: {
                latitude: parseFloat(orderRequestParams.deliveryLatitude),
                longitude: parseFloat(orderRequestParams.deliveryLongitude),
            },
        };
        if (orderRequestParams.nearbyRadiusKM && orderRequestParams.nearbyRadiusKM > 0 && orderRequestParams.nearbyRadiusKM !== '') {
            orderRequestBody.nearbyRadiusKM = parseFloat(orderRequestParams.nearbyRadiusKM);
        }
        console.log('orderRequestBody', orderRequestBody)
        requestOrderAndGetNearbyTrucks(orderRequestBody)
            .then(nearbyTrucks => {
                mainContext.setMsgSnackbar('Got nearby trucks correctly!', 'success');
                setNearbyTrucksFound(nearbyTrucks.map(truck => new Truck(truck)).sort((a, b) => a.id - b.id));
            })
            .catch(err => {
                console.error('updateTruckInfo err: ', err.errors);
                mainContext.setMsgSnackbar(err.errors);
            })
            .finally(() => setShowLoader(false))

    };

    if (!showLoader) {
        return (
            <div style={{padding: '10px'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h3">Shipping order nearby trucks</Typography>
                </div>
                <br/><br/>
                <TruckListTable truckData={truckData}/>
                <br/>

                <Paper style={{paddingTop: '20px', paddingBottom: '20px', paddingRight: '100px', paddingLeft: '100px'}}
                       elevation={3}>
                    <Form
                        onSubmit={onGetNearbyTrucks}
                        validate={(values) => {
                            const errors = {};
                            const MISSING_VALUE_MESSAGE = 'Inválido';
                            if (!values.pickupLatitude) errors.pickupLatitude = MISSING_VALUE_MESSAGE;
                            if (!values.pickupLongitude) errors.pickupLongitude = MISSING_VALUE_MESSAGE;
                            if (!values.deliveryLatitude) errors.deliveryLatitude = MISSING_VALUE_MESSAGE;
                            if (!values.deliveryLongitude) errors.deliveryLongitude = MISSING_VALUE_MESSAGE;
                            return errors;
                        }}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="h6">Shipping order params:</Typography>
                                </div>
                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Pickup Latitude"
                                            name="pickupLatitude"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Pickup Longitude"
                                            name="pickupLongitude"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Delivery Latitude"
                                            name="deliveryLatitude"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Delivery Longitude"
                                            name="deliveryLongitude"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Custom nearby radius"
                                            name="nearbyRadiusKM"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                </Grid>

                                <br/>

                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Get nearby trucks
                                    </Button>
                                </div>
                            </form>
                        )}
                    />
                </Paper>
                <br/><br/>
                <Paper style={{paddingTop: '20px', paddingBottom: '20px', paddingRight: '100px', paddingLeft: '100px'}}
                       elevation={3}>
                    <div style={{display: 'flex', justifyContent: 'center'}} ele>
                        <Typography variant="h6">Nearby trucks found</Typography>
                    </div>
                    <br/>
                    <TruckListTable truckData={nearbyTrucksFound}/>
                    <br/>
                </Paper>
            </div>
        );
    } else {
        return (
            <CenteredProgressLoader/>
        )
    }
};

export default GetOrderNearbyTrucks;