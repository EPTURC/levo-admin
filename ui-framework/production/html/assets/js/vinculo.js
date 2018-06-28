$(document).ready(function () {

    $.when(getItineraries(),getDrivers(),getVehicles())
        .done((itineraries, drivers) =>{
            if(itineraries[1] == "success" && drivers[1] == "success"){
                let activeItineraries = []
                
                const allItineraries = itineraries[0]

                for(i in allItineraries){
                    if(!allItineraries[i].vehicle_id && !allItineraries[i].driver_id){
                        activeItineraries.push(allItineraries[i]);
                    }
                }
            }
        })


    function getItineraries(){
        return $.ajax({
            method:"GET",
            url: "https://epturc-levo.herokuapp.com/api/v1/itineraries"
        })
    }
    function getDrivers(){
        return $.ajax({
            method:"GET",
            url: "https://epturc-levo.herokuapp.com/api/v1/drivers"
        })
    }
    function getVehicles(){
        return $.ajax({
            method:"GET",
            url: "https://epturc-levo.herokuapp.com/api/v1/vehicles"
        })
    }
})