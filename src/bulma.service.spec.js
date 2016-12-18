'use strict';

describe('bulma.service', function () {

    beforeEach(angular.mock.module('bulma'));

    it('should be defined', inject(function (bulma) {
        expect(bulma).toBeDefined();
    }));

    describe('bulma.service.modal', function () {

        it('should be implemented', inject(function (bulma) {
            expect(bulma.modal).toBeDefined();
        }));

        it('should return an instance of BulmaModal', inject(function (bulma, BulmaModal) {
            expect(bulma.modal() instanceof BulmaModal).toBeTruthy();
        }));

    });


});