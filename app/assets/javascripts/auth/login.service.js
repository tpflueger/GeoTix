(function () {
    'use strict';

    var app = angular.module('geotix');

    app.factory('LoginService', ['ngDialog', loginService]);

    function loginService(ngDialog) {
        var isDialogOpened = false;

        function openDialog() {
            if(!isDialogOpened) {
                ngDialog.openConfirm({
                    template: 'auth/_login.html',
                    showClose: false,
                    controller: 'ModalController'
                });
                isDialogOpened = true;
            }
        }

        function closeDialog() {
            ngDialog.close();
            isDialogOpened =  false;
        }

        return {
          openDialog: openDialog,
          closeDialog: closeDialog
        };
    }
})();