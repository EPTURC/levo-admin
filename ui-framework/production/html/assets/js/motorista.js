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