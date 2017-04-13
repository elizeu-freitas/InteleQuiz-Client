/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['DADOS_GLOBAIS', 'SERVICOS_GLOBAIS', 'loginSrvc', '$state', '$ionicPopup'];
    function loginCtrl(DADOS_GLOBAIS, SERVICOS_GLOBAIS, loginSrvc, $state, $ionicPopup) {
        var loginCtrl = this;
        var loginSrvc = loginSrvc;
        console.log(DADOS_GLOBAIS);
        loginCtrl.usuario = {};

        loginCtrl.autenticar = autenticar;

        if (DADOS_GLOBAIS.TIPOS_USUARIO && DADOS_GLOBAIS.TIPOS_USUARIO.length > 0) {
            loginCtrl.listarPerfis = DADOS_GLOBAIS.TIPOS_USUARIO;
            loginCtrl.usuario.perfil = loginCtrl.listarPerfis[0];
            loginCtrl.usuario.login = "MA123";
            loginCtrl.usuario.senha = "123";
        } else {
            loginSrvc.tiposUsuario().then(function (response) {
                if (response.data) {
                    DADOS_GLOBAIS.TIPOS_USUARIO = response.data;
                    loginCtrl.listarPerfis = DADOS_GLOBAIS.TIPOS_USUARIO;
                    loginCtrl.usuario.perfil = loginCtrl.listarPerfis[0];
                    loginCtrl.usuario.login = "MA123";
                    loginCtrl.usuario.senha = "123";
                } else if (response.message) {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: response.message.text,
                        buttons: [{
                                text: '<b>Fechar</b>',
                                type: 'button-assertive'
                            }]
                    });
                }
            });
        }


        function autenticar(usuario) {
            loginSrvc.autenticar(usuario).then(function (response) {
                if (response.data) {
                    DADOS_GLOBAIS.USUARIO_LOGADO = response.data;
                    $state.go('menu.home'); //,{}, {reload: true}
                } else if (response.message) {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: response.message.text,
                        buttons: [{
                                text: '<b>Fechar</b>',
                                type: 'button-assertive'
                            }]
                    });
                }
            });
        }
    }
})();