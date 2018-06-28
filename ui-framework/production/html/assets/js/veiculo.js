let baseUrl = "https://epturc-levo.herokuapp.com/api/v1/"
$("#form-cadastro-veiculo").submit(function( event ) {
   let vehiclesUrl = baseUrl + "vehicles"
   
   let licensePlate = $("#license-plate").val().toString()
   let companyId = $("#company-id").val().toString()
   let colorVehicle = $("#color-vehicle").val().toString()
   let modelVehicle = $("#model-vehicle").val().toString()

   let vehicle = {
       company_id : companyId,
       license_plate : licensePlate,
       model: modelVehicle,
       color: colorVehicle
   }

   
   event.preventDefault();
   $.post( vehiclesUrl, {vehicle} )
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

$('form-edit-veiculo').submit(function( event ) {
    console.log("HUSAFI ")
    event.preventDefault()
})

$(document).ready(() => {
    setMasks();
    getVehicles();

    // start of events
    $( "#tableWithDynamicRows").on( "click","tr", function() { 
        let data = $(this).children().children()
        
        let vehicle = {
            id: parseInt(data[0].textContent),
            license_plate: data[1].textContent,
            model: data[2].textContent,
            company_id: data[3].textContent,
            color: data[4].textContent
        }


        $("#editDeleteVehicle").modal('show')
        $("#id-edit").val(vehicle.id)
        $("#license-plate-edit").val(vehicle.license_plate)
        $("#model-vehicle-edit").val(vehicle.model)
        $("#company-id-edit").val(vehicle.company_id)
        $("#color-vehicle-edit").val(vehicle.color)

    });

    $("#editVehicle").on( "click", function() { 
        let vehicleToSend = {
            license_plate: $('#license-plate-edit').val(),
            company_id: $('#company-id-edit').val(),
            model: $('#model-vehicle-edit').val(),
            color: $("#color-vehicle-edit").val()
        }
        
        $.ajax({
            method:"PUT",
            url:baseUrl+`vehicles/${parseInt($("#id-edit").val())}`,
            data: {vehicle:{vehicleToSend} },
            success: (result) => {
                $("#text-alert-edit").html("Veículo editado com sucesso!");
                $("#alert-form-driver-edit").toggleClass("alert-success").show();
                setTimeout(() => {window.location.reload()},2000 )
            },
            error: (err) =>{
                $("#text-alert").html("Ocorreu um erro na edição!");
                $("#alert-form-driver-edit").toggleClass("alert-danger").show();

            }
        })

        $("#id-edit").val('')
        $("#company-id-edit").val('')
        $("#color-vehicle-edit").val('')
        $("#model-vehicle-edit").val('')
        $("#license-plate-edit").val('')
        

    });

    $("#deleteVehicle").on( "click", function() { 
        
        $.ajax({
            method:"DELETE",
            url:baseUrl+`vehicles/${parseInt($("#id-edit").val())}`,
            success: (result) => {
                $("#text-alert-edit").html("Veículo deletado com sucesso!");
                $("#alert-form-driver-edit").toggleClass("alert-success").show();
                setTimeout(() => {window.location.reload()},2000 )
            },
            error: (err) => {
                $("#text-alert").html("Ocorreu um erro na remoção!");
                $("#alert-form-driver-edit").toggleClass("alert-danger").show();

            }
        })

        $("#company-id-edit").val('')
        $("#color-vehicle-edit").val('')
        $("#model-vehicle-edit").val('')
        $("#license-plate-edit").val('')

    });
    //end of events

    function setMasks(){
        $("input[id*='license-plate']").inputmask({
            mask: ['AAAA-9999'],
            keepStatic: true
        });
    
        $("input[id*='license-plate-editDelete']").inputmask({
            mask: ['AAAA-9999'],
            keepStatic: true
        });
    }


    function getVehicles(){
        $.ajax({
            method:"GET",
            url:baseUrl+"vehicles",
            success: (result) => {
                result.map(vehicle => {
                    
                    $('#dataVehicles').append(`
                                    <tr>
                                        <td class="v-align-middle" style="display:none">
                                            <p>${vehicle.id}</p>
                                        </td>
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
    
    }
})