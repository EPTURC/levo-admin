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