export class Truck {

    constructor(truckFromAPI) {
        this.id = truckFromAPI.id;
        this.latitude = truckFromAPI.geo_location.latitude;
        this.longitude = truckFromAPI.geo_location.longitude;
        this.licensePlate = truckFromAPI.license_plate;
        this.allowedWeight = truckFromAPI.allowed_weight;
        this.currentCargoWeight = truckFromAPI.current_cargo_weight;
        this.currentNumberOfPallets = truckFromAPI.current_number_of_pallets;
        this.maxNumberOfPallets = truckFromAPI.max_number_of_pallets;
        this.createdAt = truckFromAPI.created_at;
        this.updatedAt = truckFromAPI.updated_at;
    }
}