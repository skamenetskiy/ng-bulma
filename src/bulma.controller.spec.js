'use strict';

describe('bulma.controller', function () {

    var $$bulma,
        $$BulmaModal,
        $$BulmaModalCollection,
        $$httpBackend,
        $$rootScope,
        $$controller,
        controller,
        $scope = {};

    beforeEach(angular.mock.module('bulma'));
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $$httpBackend          = $injector.get('$httpBackend');
            $$rootScope            = $injector.get('$rootScope');
            $$controller           = $injector.get('$controller');
            $$bulma                = $injector.get('bulma');
            $$BulmaModal           = $injector.get('BulmaModal');
            $$BulmaModalCollection = $injector.get('BulmaModalCollection');
            controller             = $$controller('bulmaController', {
                $scope: $scope,
                bulma:  $$bulma
            });
        });
    });

    it('creates modals collection', function () {
        expect(controller.modals).toBeDefined();
    });

    it('creates modals collection of type BulmaModalCollection', function () {
        expect(controller.modals instanceof $$BulmaModalCollection).toBeTruthy();
    });

    it('creates modals collection of type Array', function () {
        expect(controller.modals instanceof Array).toBeTruthy();
    });

    it('adds a modal to modals collection', function (done) {
        $$bulma
            .modal({
                controller:   function () {
                    this.test = 123;
                },
                controllerAs: 'vm',
                template:     'hello modal'
            })
            .then(testController)
            .catch(failTest)
            .finally(done);

        $$rootScope.$digest();

        function testController(modal) {
            expect(controller.modals.length).toBeGreaterThan(0);
            expect(controller.modals[0] instanceof $$BulmaModal).toBeTruthy();
            expect(controller.modals[0] === modal).toBeTruthy();
        }

        function failTest(error) {
            expect(error).toBeUndefined();
        }
    });

});