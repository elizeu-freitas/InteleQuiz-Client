/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['DADOS', 'SERVICE','CLASSES', '$state'];
    function loginCtrl(DADOS, SERVICE, CLASSES, $state) {
        var loginCtrl = this;

        init();

        function init() {
            loginCtrl.usuario = new CLASSES.Usuario();
            loginCtrl.init = init;
            loginCtrl.autenticar = autenticar;
            
            listTiposUsuario();
        }

        function listTiposUsuario() {
            if (DADOS.TIPOS_USUARIO && DADOS.TIPOS_USUARIO.length > 0) {
                loginCtrl.arrayTiposUsuario = DADOS.TIPOS_USUARIO;
                loginCtrl.usuario.perfil = loginCtrl.arrayTiposUsuario[0];
                mock();
            } else {
                SERVICE.listTiposUsuario().then(function (response) {
                    if (response.data) {
                        DADOS.TIPOS_USUARIO = response.data;
                        loginCtrl.arrayTiposUsuario = DADOS.TIPOS_USUARIO;
                        loginCtrl.usuario.perfil = loginCtrl.arrayTiposUsuario[0];
                        mock();
                    }
                });
            }
        }

        function autenticar(usuario) {
            SERVICE.autenticar(usuario).then(function (response) {
                if (response.data) {
                    DADOS.USUARIO_LOGADO = response.data;
                    $state.go('menu.home');
                }
            });
        }

        function mock() {
            loginCtrl.usuario.login = "MA123";
            loginCtrl.usuario.senha = "123";
            // autenticar(loginCtrl.usuario);
        }
    }
})();