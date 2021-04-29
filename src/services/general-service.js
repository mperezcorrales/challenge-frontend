import {apiConstants} from "../constants/api";
import {getFetchWithTimeoutAndErrorHandling, postFetchWithTimeoutAndErrorHandling} from "../utils/common";

export const getTruckListData = async () => {
    return await getFetchWithTimeoutAndErrorHandling(apiConstants.getTrucksList, 'general');
};

export const updateTruckInfo = async (body) => {
    return await postFetchWithTimeoutAndErrorHandling(apiConstants.updateTruckInfo, 'general', body);
};

export const requestOrderAndGetNearbyTrucks = async (body) => {
    return await postFetchWithTimeoutAndErrorHandling(apiConstants.getOrderNearbyTrucks, 'general', body);
};

export const updateDefaultNearbyDistance = async (newDefaultDistance) => {
    const body = {
        defaultDistance: newDefaultDistance
    };
    return await postFetchWithTimeoutAndErrorHandling(apiConstants.getOrderNearbyTrucks, 'general', body);
};