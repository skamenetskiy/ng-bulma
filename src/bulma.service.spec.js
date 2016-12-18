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

        it('should throw an error if there is not template', inject(function (bulma) {
            expect(function () {
                bulma.modal({})
            }).toThrowError();
        }));

        it('should throw an error if there is not templateUrl', inject(function (bulma) {
            expect(function () {
                bulma.modal({})
            }).toThrowError();
        }));

        it('should not throw an error if there is not template', inject(function (bulma) {
            expect(function () {
                bulma.modal({controller: 'controller', template: 'template'})
            }).not.toThrowError();
        }));

        it('should not throw an error if there is not templateUrl', inject(function (bulma) {
            expect(function () {
                bulma.modal({controller: 'controller', templateUrl: 'templateUrl'})
            }).not.toThrowError()
        }));

        it('should return an instance of BulmaModal', inject(function (bulma, BulmaModal) {
            console.log(BulmaModal);
            expect(bulma.modal({controller: 'controller', template: 'template'}) instanceof BulmaModal).toBeTruthy();
        }));

    });


});