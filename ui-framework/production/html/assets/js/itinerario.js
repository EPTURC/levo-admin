

(function($) {
    let baseUrl = "https://epturc-levo.herokuapp.com/api/v1/"
    'use strict';

    $(document).ready(function() {
        getTasks();


        function getTasks(){
            $.ajax({
                method:"GET",
                url:baseUrl+"tasks",
                success: (result) =>{
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
                                                <p>${task.type || "desconhecido"}</p>
                                            </td>
                                            <td class="v-align-middle">
                                                <p>${task.local || "desconhecido"}</p>
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

    });

})(window.jQuery);