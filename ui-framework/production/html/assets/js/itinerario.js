
let baseUrl = "https://epturc-levo.herokuapp.com/api/v1/"

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
    
    // Events
    $( "#tableDriveWithDynamicRows").on( "click","tr", function() { 
        
        let data = $(this).children().children()
        
        let driver = {
            id:  data[0].textContent,
            name: data[1].textContent,
            cpf: data[2].textContent,
            rg: data[3].textContent,
        }
        
        $("#id-edit").val(driver.id)
        $("#nome-editDelete-motorista").val(driver.name)
        $("cpf-editDelete-motorista").val(driver.cpf)
        $("#rg-editDelete-motorista").val(driver.rg)

        $("#editDeleteDriverModal").modal('show')

    });
    
    $("#editDriver").on( "click", function() { 
        $.ajax({
            method:"PUT",
            url:baseUrl+`/${paserInt($("#id-edit").val())}`,
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
        $("#nome-editDelete-motorista").val('')
        $("cpf-editDelete-motorista").val('')
        $("#rg-editDelete-motorista").val('')


    });

    $("#deleteDriver").on( "click", function() { 
        $.ajax({
            method:"DELETE",
            url:baseUrl+`/${paserInt($("#id-edit").val())}`,
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
        $("#nome-editDelete-motorista").val('')
        $("cpf-editDelete-motorista").val('')
        $("#rg-editDelete-motorista").val('')

    });
    // End of events
    
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