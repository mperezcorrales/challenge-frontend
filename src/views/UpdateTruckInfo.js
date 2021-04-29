import React, {useContext, useEffect, useState} from 'react';
import {getTruckListData, updateTruckInfo} from "../services/general-service";
import MainContext from "../contexts/MainContext";
import {Truck} from "../models/Truck";
import CenteredProgressLoader from "../shared-components/CenteredProgressLoader";
import Paper from "@material-ui/core/Paper";
import {
    TextField as TextFieldFinalForm
} from 'mui-rff';
import TruckListTable from "../shared-components/TruckListTable";
import Typography from "@material-ui/core/Typography";
import {Form} from "react-final-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const UpdateTruckInfo = () => {

    const [showLoader, setShowLoader] = useState(true);
    const mainContext = useContext(MainContext);

    const [truckData, setTruckData] = useState([]);

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

    const onSaveTruckUpdate = (truckToUpdateData) => {
        console.log('truckToUpdateData', truckToUpdateData);
        setShowLoader(true);
        updateTruckInfo(truckToUpdateData)
            .then(resp => {
                mainContext.setMsgSnackbar('Updated correctly!', 'success');
                getTruckData();
            })
            .catch(err => {
                console.error('updateTruckInfo err: ', updateTruckInfo);
                mainContext.setMsgSnackbar(err);
            })

    };

    if(!showLoader) {
        return (
            <div style={{padding: '10px'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h3">Update truck info</Typography>
                </div>
                <br/><br/>
                <TruckListTable truckData={truckData}/>
                <br/>

                <Paper style={{paddingTop: '20px', paddingBottom: '20px', paddingRight: '100px', paddingLeft: '100px'}}
                       elevation={3}>
                    <Form
                        onSubmit={onSaveTruckUpdate}
                        validate={(values) => {
                            const errors = {};
                            const MISSING_VALUE_MESSAGE = 'Inválido';
                            if (!values.id) errors.id = MISSING_VALUE_MESSAGE;
                            if (!values.latitude) errors.latitude = MISSING_VALUE_MESSAGE;
                            if (!values.longitude) errors.longitude = MISSING_VALUE_MESSAGE;
                            if (!values.licensePlate) errors.licensePlate = MISSING_VALUE_MESSAGE;
                            if (!values.allowedWeight) errors.allowedWeight = MISSING_VALUE_MESSAGE;
                            if (!values.currentCargoWeight) errors.currentCargoWeight = MISSING_VALUE_MESSAGE;
                            if (!values.currentNumberOfPallets) errors.currentNumberOfPallets = MISSING_VALUE_MESSAGE;
                            if (!values.maxNumberOfPallets) errors.maxNumberOfPallets = MISSING_VALUE_MESSAGE;
                            return errors;
                        }}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="h6">Fill to update truck info</Typography>
                                </div>
                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Id"
                                            name="id"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Latitude"
                                            name="latitude"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Longitude"
                                            name="longitude"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="License plate"
                                            name="licensePlate"
                                            margin="none"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Allowed weight"
                                            name="allowedWeight"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Current cargo weight"
                                            name="currentCargoWeight"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Max number of pallets"
                                            name="maxNumberOfPallets"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextFieldFinalForm
                                            label="Current number of pallets"
                                            name="currentNumberOfPallets"
                                            margin="none"
                                            type="number"
                                        />
                                    </Grid>
                                </Grid>

                                <br/>

                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        )}
                    />
                </Paper>
            </div>
        );
    } else {
        return (
            <CenteredProgressLoader/>
        )
    }
};

export default UpdateTruckInfo;