(function($) {

    'use strict';

    $(document).ready(function() {
        var ordenarItinerario = function(e) {
            var list = e.length ? e : $(e.target),
                output = list.data('output');
            if (window.JSON) {
                output.html(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
            } else {
                output.html('É preciso de um navegador compatível com JSON. Atualize seu navegador.');
            }
        };

        $('#listaItinerario').nestable({
                group: 1,
                maxDepth: 1
            })
            .on('change', ordenarItinerario);

        ordenarItinerario($('#listaItinerario').data('output', $('#listaItinerario-output-debug')));


    });

})(window.jQuery);