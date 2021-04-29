import React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {getFormattedDate} from "../utils/common";
import Paper from "@material-ui/core/Paper";

const TruckListTable = ({truckData}) => {
    return (
        <Paper style={{paddingTop: '10px', paddingBottom: '10px', paddingRight: '50px', paddingLeft: '50px',
            display: 'flex', justifyContent: 'center'}} elevation={3} >
            <Table style={{backgroundColor: '#fafafa'}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Latitude</TableCell>
                        <TableCell align="right">Longitude</TableCell>
                        <TableCell align="right">License plate</TableCell>
                        <TableCell align="right">Allowed weight</TableCell>
                        <TableCell align="right">Current weight</TableCell>
                        <TableCell align="right">Max # of pallets</TableCell>
                        <TableCell align="right"># of pallets</TableCell>
                        <TableCell align="right">Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {truckData.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.latitude}</TableCell>
                            <TableCell align="right">{row.longitude}</TableCell>
                            <TableCell align="right">{row.licensePlate}</TableCell>
                            <TableCell align="right">{row.allowedWeight}</TableCell>
                            <TableCell align="right">{row.currentCargoWeight}</TableCell>
                            <TableCell align="right">{row.maxNumberOfPallets}</TableCell>
                            <TableCell align="right">{row.currentNumberOfPallets}</TableCell>
                            <TableCell align="right">{getFormattedDate(row.updatedAt, "DD-MM-YYYY HH:mm:SS")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default TruckListTable;