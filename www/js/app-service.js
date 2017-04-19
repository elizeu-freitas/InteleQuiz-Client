/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('DADOS_GLOBAIS', DADOS_GLOBAIS)
            .factory('SERVICOS_GLOBAIS', SERVICOS_GLOBAIS);

    DADOS_GLOBAIS.$inject = [];
    SERVICOS_GLOBAIS.$inject = ['DADOS_GLOBAIS', '$window', '$log', 'toaster'];

    function DADOS_GLOBAIS() {
        var data = {
            URL_BASE: "http://192.168.0.5:8084" + "/intelequiz-srv/",
            USUARIO_LOGADO: {},
            TIPOS_USUARIO: [],
            NIVEIS_QUESTAO: [],
            TIPOS_QUESTAO: [],
            STATUS_QUIZ_QUESTAO: [],
        };
        return data;
    }

    function SERVICOS_GLOBAIS(DADOS_GLOBAIS, $window, $log, toaster) {
        var service = {
            showToaster: function (message) {
                toaster.pop({
                    "type": message.type,
                    "body": message.text
                });
            },
            success: function (response) {
                $log.info(response);
                if (response.data.message) {
                    response.data.message.type = response.data.message.type.toLowerCase();
                }
                return response.data;
            },
            error: function (response) {
                $log.error(response);
                return {data: null, message: {type: 'ERROR', text: 'Serviço indisponível, tente mais tarde'}};
            },
        };
        return service;
    }
})();