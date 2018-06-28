let baseUrl = "https://epturc-levo.herokuapp.com/api/v1/"
$("#form-cadastro-motorista").submit(function( event ) {
   let userUrl = baseUrl + "users"
   let driveUrl = baseUrl + "drivers"
   let name = $("#nome-motorista").val()
   let cpf = $("#cpf-motorista").val()
   let rg = $("#rg-motorista").val()

   event.preventDefault();
   $.post( userUrl, { user: { name: name, cpf:cpf, rg:rg} })
   .done(function( dataUser ) {
      $.post( driveUrl, { driver: { user_id: dataUser.id } })
        .done(function( dataDriver ) {
            $("#text-alert").html("Motorista cadastrado com sucesso!");
            $("#alert-form-driver").toggleClass("alert-success").show();

            $('#dataDrivers').append(`
                                <tr>
                                    <td class="v-align-middle">
                                        <p>${name}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${cpf}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${rg}</p>
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
   $("#form-cadastro-motorista")[0].reset();
})

$(document).ready(() => {
    
    $.ajax({
        method:"GET",
        url:baseUrl+"drivers",
        success: (result) => {
            result.map(driver => {
                
                $('#dataDrivers').append(`
                                <tr>
                                    <td class="v-align-middle">
                                        <p>${driver.user.name || "desconhecido"}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${driver.user.cpf || "desconhecido"}</p>
                                    </td>
                                    <td class="v-align-middle">
                                        <p>${driver.user.rg || "desconhecido"}</p>
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