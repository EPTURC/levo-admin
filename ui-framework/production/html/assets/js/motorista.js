
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
         $('#dataDrivers').append(`
            <tr>
                <td class="v-align-middle">
                    <p>${dataUser.name}</p>
                </td>
                <td class="v-align-middle">
                    <p>${dataUser.cpf}</p>
                </td>
                <td class="v-align-middle">
                    <p>${dataUser.rg}</p>
                </td>
            </tr>
        `)
         $("#alert-form-driver").toggleClass("alert-success").show();
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

$("#form-edit-motorista").submit(function( event ) {
    event.preventDefault()
 })
 
$(document).ready(() => {
   
    setMasks();
    getDrivers();
    
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
        let userToSend = {
            nome: $("#nome-editDelete-motorista").val(),
            cpf: $("cpf-editDelete-motorista").val(),
            rg: $("#rg-editDelete-motorista").val()
        }

        $.ajax({
            method:"PUT",
            type:"application/json",
            url:baseUrl+`drivers/${parseInt($("#id-edit").val())}`,
            data:userToSend,
            success: (result) => {
                $("#text-alert-edit").html("Veículo editado com sucesso!");
                $("#alert-form-driver-edit").toggleClass("alert-success").show();
                //setTimeout(() => {window.location.reload()},2000 )
            },
            error: (err) =>{
                console.log(err)
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
            url:baseUrl+`drivers/${parseInt($("#id-edit").val())}`,
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
    
    function setMasks(){
        $("input[id*='cpf-motorista']").inputmask({
            mask: ['999.999.999-99'],
            keepStatic: true
        });
    
        $("input[id*='rg-motorista']").inputmask({
            mask: ['999.999.999'],
            keepStatic: true
        });
    
        $("input[id*='cpf-editDelete-motorista']").inputmask({
            mask: ['999.999.999-99'],
            keepStatic: true
        });
    
        $("input[id*='rg-editDelete-motorista']").inputmask({
            mask: ['999.999.999'],
            keepStatic: true
        });
    }

    function getDrivers(){
        $.ajax({
            method:"GET",
            url:baseUrl+"users",
            success: (result) => {
                result.map(driver => {
                    // if(!driver.cpf){
                    //     driver.cpf = "10500842418"
                    // }
                    // if(!driver.rg){
                    //     driver.rg = "248764"
                    // }
                    $('#dataDrivers').append(`
                                    <tr>
                                        <td class="v-align-middle" style="display:none">
                                            <p>${driver.id}</p>
                                        </td>
                                        <td class="v-align-middle">
                                            <p>${driver.name || "desconhecido"}</p>
                                        </td>
                                        <td class="v-align-middle">
                                            <p>${driver.cpf || "desconhecido"}</p>
                                        </td>
                                        <td class="v-align-middle">
                                            <p>${driver.rg || "desconhecido"}</p>
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
