let baseUrl = "https://epturc-levo.herokuapp.com/api/v1/"
$("#form-cadastro-rota").submit(function( event ) {
   let routesUrl = baseUrl + "vehicles"
   let companyId = $("#ponto-coleta-input").val().toString()
   let companyId = $("#ponto-entrega-input").val().toString()
   let companyId = $("#descricao-rota").val().toString()
   event.preventDefault();
   $.post( routesUrl, { vehicle: { company_id : companyId } })
   .done(function( dataUser ) {
      $("#text-alert").html("Rota cadastrada com sucesso!");
      $("#alert-form-driver").toggleClass("alert-success").show();
   })
   .fail(function() {
      $("#text-alert").html("Ocorreu um erro no cadastro!");
      $("#alert-form-driver").toggleClass("alert-danger").show();
   });
   $("#form-cadastro-rota")[0].reset();
})