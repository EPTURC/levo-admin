baseUrl = "https://epturc-levo.herokuapp.com/api/v1/"

$("#form-tarefa").submit(function( event ) {
    let taskUrl = baseUrl + "tasks"

    let descricao = $("#descricao-rota").val()
    let responsavel = $("#responsavel-input").val()

    let coleta = {
        task: {
            object: descricao,
            responsible_name: responsavel,
            type: "Coleta",
            local: $("#ponto-coleta-lat").val() + ", " + $("#ponto-coleta-lon").val()
        }
    }

    let entrega = {
        task: {
            object: descricao,
            responsible_name: responsavel,
            type: "Entrega",
            local: $("#ponto-entrega-lat").val() + ", " + $("#ponto-entrega-lon").val()
        }
    }

    event.preventDefault();
    $.post( taskUrl, coleta)
    .done(function( dataColeta ) {
        console.log(dataColeta)
        $('#dataTasks').append(`
            <tr>
                <td class="v-align-middle" style="display:none">
                    <p>${dataColeta.id}</p>
                </td>
                <td class="v-align-middle">
                    <p>${dataColeta.object || "desconhecido"}</p>
                </td>
                <td class="v-align-middle">
                    <p>${dataColeta.responsible_name || "desconhecido"}</p>
                </td>
                <td class="v-align-middle">
                    <p>${dataColeta.type || "desconhecido"}</p>
                </td>                
            </tr>
       `)
        $.post( taskUrl, entrega)
        .done(function( dataEntrega ) {
            $("#text-alert").html("Tarefa cadastrada com sucesso!");
            $("#alert-form-driver").toggleClass("alert-success").show();
            $('#dataTasks').append(`
                <tr>
                    <td class="v-align-middle" style="display:none">
                        <p>${dataEntrega.id}</p>
                    </td>
                    <td class="v-align-middle">
                        <p>${dataEntrega.object || "desconhecido"}</p>
                    </td>
                    <td class="v-align-middle">
                        <p>${dataEntrega.responsible_name || "desconhecido"}</p>
                    </td>
                    <td class="v-align-middle">
                        <p>${dataEntrega.type || "desconhecido"}</p>
                    </td>                
                </tr>
           `)
        })
        .fail(function() {
            $("#text-alert").html("Ocorreu algum erro no cadastro!");
            $("#alert-form-driver").toggleClass("alert-danger").show();
        });
   })
   .fail(function() {
      $("#text-alert").html("Ocorreu algum erro no cadastro!");
      $("#alert-form-driver").toggleClass("alert-danger").show();
   });

   $("#form-tarefa")[0].reset();
})

$(document).ready(() => {
   
    getTasks();

    // start of events
    $( "#tableTasks").on( "click","tr", function() { 
        let data = $(this).children().children()

        let task = { 
            id: parseInt(data[0].textContent),
            object: "",
            responsible_name: "",
            type: "",
            local: ""
        }

        $.ajax({
            method:"GET",
            url:baseUrl+"tasks/" + task.id,
            success: (result) => {
                task.object = result.object
                task.responsible_name = result.responsible_name
                task.type = result.type
                task.local = result.local
                
                $("#editDeleteTask").modal('show')
                $("#id-edit").val(task.id)
                $("#descricao-rota-edit").val(task.object)
                $("#responsavel-input-edit").val(task.responsible_name)
                $("#responsavel-input-edit").val(task.responsible_name)
                $("#taskType").val(task.type)
                let coordenadas = task.local.split(", ")
                $('#local-mapa-edit').locationpicker({
                    location: {
                       latitude: coordenadas[0],
                       longitude: coordenadas[1]
                    },
                    radius: 0,
                    addressFormat: 'address',
                    inputBinding: {
                       latitudeInput: $('#local-lat-edit'),
                       longitudeInput: $('#local-lon-edit'),
                       radiusInput: $('#local-radius-edit'),
                       locationNameInput: $('#local-input-edit')
                    },
                    enableAutocomplete: true,
                    onchanged: function (currentLocation, radius, isMarkerDropped) { }
                  });
            },
            error: (err) =>{
                console.log(err)
            }
        })


    });

    $("#editVehicle").on( "click", function() { 
        let tasktoSend = {
            object: $('#descricao-rota-edit').val(),
            responsible_name: $('#descricao-rota-edit').val(),
            type: $("#taskType").val(),
            local: $("#local-lat-edit").val() + ", " + $("#local-lon-edit").val()
        }
        
        $.ajax({
            method:"PUT",
            url:baseUrl+`tasks/${parseInt($("#id-edit").val())}`,
            data: {task:{ taskToSend } },
            success: (result) => {
                $("#text-alert-edit").html("Tarefa editada com sucesso!");
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
        event.preventDefault();        
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
    
    function getTasks(){
        $.ajax({
            method:"GET",
            url:baseUrl+"tasks",
            success: (result) => {
                result.map(task => {
                    
                    $('#dataTasks').append(`
                                    <tr>
                                        <td class="v-align-middle" style="display:none">
                                            <p>${task.id}</p>
                                        </td>
                                        <td class="v-align-middle">
                                            <p>${task.object || "desconhecido"}</p>
                                        </td>
                                        <td class="v-align-middle">
                                            <p>${task.responsible_name || "desconhecido"}</p>
                                        </td>
                                        <td class="v-align-middle">
                                            <p>${task.type || "desconhecido"}</p>
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