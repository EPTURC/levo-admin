$(document).ready(function() {
    $('#form-lock').submit((ev) => {
        ev.preventDefault();
        let data = {}

        let username = $("[name='username']").val()
        let password = $("[name='password']").val()

        data.username = username
        data.password = password
        
        if(data.username == '' || data.password == '') return
        // $.ajax({
        //     method: 'POST',
        //     type:'json',
        //     url: '',
        //     data: ,
        //     success: (result) => {
        //         window.sessionStorage.setItem('user',JSON.stringify(result.data))
        //     },
        //     error: (err) => {
        //         $('.alert').show()
                
        //     }
        // })
    })
})