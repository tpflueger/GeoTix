(function () {
	'use strict';

	describe('Login Service', function () {
		var loginService,
			ngDialog;

		beforeEach(module('geotix'));

		beforeEach(module(function ($provide) {
			ngDialog = {
				openConfirm: function () { },
				close: function () { }
			}
			$provide.value('ngDialog', ngDialog);
		}));

		beforeEach(inject(function (LoginService) {
			loginService = LoginService;

			spyOn(ngDialog, 'openConfirm').and.callThrough();
			spyOn(ngDialog, 'close');
		}));

		describe('Open Dialog', function () {
			beforeEach(function () {
				loginService.openDialog();
			});

			it('Should call ngDialog', function () {
				expect(ngDialog.openConfirm).toHaveBeenCalled();
			});

			describe('and when dialog is open', function () {
				it('Should not call ngDialog', function () {
					ngDialog.openConfirm.calls.reset();
					loginService.openDialog();
					expect(ngDialog.openConfirm).not.toHaveBeenCalled();
				});
			});
		});

		describe('Close Dialog', function () {
			beforeEach(function () {
				loginService.closeDialog();
			});

			it('Should call ngDialog', function () {
				expect(ngDialog.close).toHaveBeenCalled();
			});
		});
	});
})();
