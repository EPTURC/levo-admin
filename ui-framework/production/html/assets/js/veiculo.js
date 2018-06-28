let baseUrl = "https://epturc-levo.herokuapp.com/api/v1/"
$("#form-cadastro-veiculo").submit(function( event ) {
   let vehiclesUrl = baseUrl + "vehicles"

   let licensePlate = $("#license-plate").val().toString()
   let companyId = $("#company-id").val().toString()
   let colorVehicle = $("#color-vehicle").val().toString()
   let modelVehicle = $("#model-vehicle").val().toString()

   event.preventDefault();
   $.post( vehiclesUrl, { vehicle: { company_id : companyId,license_plate : licensePlate, model: modelVehicle, color: colorVehicle} })
   .done(function( res ) {
      $("#text-alert").html("Veículo cadastrado com sucesso!");
      $("#alert-form-driver").toggleClass("alert-success").show();

      $('#dataVehicles').append(`
                                <tr>
                                    <td class="v-align-middle">
                                        <p>${ vehicle.placa || "desconhecido"}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${ vehicle.modelo|| "desconhecido"}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${ vehicle.companhia || "desconhecido"}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${ vehicle.cor|| "desconhecido"}</p>
                                    </td>
                                </tr>
                           `)
   })
   .fail(function() {
      $("#text-alert").html("Ocorreu um erro no cadastro!");
      $("#alert-form-driver").toggleClass("alert-danger").show();
   });
   $("#form-cadastro-veiculo")[0].reset();
})


$(document).ready(() => {
    $("input[id*='license-plate']").inputmask({
        mask: ['AAAA-9999'],
        keepStatic: true
    });

    $( "#tableWithDynamicRows").on( "click","tr", function() { 
        let data = $(this).children().children()
        
        let vehicle = {
            license_plate: data[0].textContent,
            model: data[1].textContent,
            company_id: data[2].textContent,
            color: data[3].textContent
        }
        

        $("#addCar").modal('show')
        $("#license-plate").val(vehicle.license_plate)
        $("#model-vehicle").val(vehicle.model)
        $("#company-id").val(vehicle.company_id)
        $("#color-vehicle").val(vehicle.color)

    });

    $.ajax({
        method:"GET",
        url:baseUrl+"vehicles",
        success: (result) => {
            result.map(vehicle => {
                
                $('#dataVehicles').append(`
                                <tr>
                                    <td class="v-align-middle">
                                        <p>${vehicle.license_plate || "desconhecido"}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${vehicle.model || "desconhecido"}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${vehicle.company_id|| "desconhecido"}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${vehicle.color|| "desconhecido"}</p>
                                    </td>
                                </tr>
                           `)
            })
        },
        error: (err) =>{
            console.log(err)
        }
    })
})