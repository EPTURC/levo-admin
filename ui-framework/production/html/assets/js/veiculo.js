let baseUrl = "https://epturc-levo.herokuapp.com/api/v1/"
$("#form-cadastro-veiculo").submit(function( event ) {
   let vehiclesUrl = baseUrl + "vehicles"
   let companyId = $("#company-id").val().toString()
   event.preventDefault();
   $.post( vehiclesUrl, { vehicle: { company_id : companyId } })
   .done(function( dataUser ) {
      $("#text-alert").html("Veículo cadastrado com sucesso!");
      $("#alert-form-driver").toggleClass("alert-success").show();
   })
   .fail(function() {
      $("#text-alert").html("Ocorreu um erro no cadastro!");
      $("#alert-form-driver").toggleClass("alert-danger").show();
   });
   $("#form-cadastro-veiculo")[0].reset();
})