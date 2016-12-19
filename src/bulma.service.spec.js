'use strict';

describe('bulma.service', function () {

    var $$bulma,
        $$BulmaModal,
        $$BulmaModalCollection,
        $$httpBackend,
        $$rootScope;

    beforeEach(angular.mock.module('bulma'));
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $$httpBackend = $injector.get('$httpBackend');
            $$rootScope   = $injector.get('$rootScope');
        });
    });
    beforeEach(inject(function (bulma, BulmaModal, BulmaModalCollection) {
        $$bulma                = bulma;
        $$BulmaModal           = BulmaModal;
        $$BulmaModalCollection = BulmaModalCollection;
    }));

    it('should be defined', inject(function (bulma) {
        expect(bulma).toBeDefined();
    }));

    describe('bulma.service.modal', function () {

        it('should be implemented', inject(function (bulma) {
            expect(bulma.modal).toBeDefined();
        }));

        it('should throw an error if there is not template', function () {
            expect(function () {
                $$bulma.modal({})
            }).toThrowError();
        });

        it('should throw an error if there is not templateUrl', function () {
            expect(function () {
                $$bulma.modal({})
            }).toThrowError();
        });

        it('should not throw an error if there is not template', function () {
            expect(function () {
                $$bulma
                    .modal({
                        controller: 'controller',
                        template:   'template'
                    });
            }).not.toThrowError();
        });

        it('should not throw an error if there is not templateUrl', function () {
            expect(function () {
                $$bulma
                    .modal({
                        controller:  'controller',
                        templateUrl: 'templateUrl'
                    });
            }).not.toThrowError()
        });

        it('should return an instance of BulmaModal', function (done) {
            $$bulma
                .modal({
                    controller:   function () {
                        this.test = 123;
                    },
                    controllerAs: 'vm',
                    template:     'hello modal'
                })
                .then(testInstanceOf)
                .catch(failTest)
                .finally(done);

            $$rootScope.$digest();

            function testInstanceOf(modal) {
                expect(modal instanceof $$BulmaModal).toBeTruthy();
            }

            function failTest(error) {
                expect(error).toBeUndefined();
            }
        });

        it('should try to load template from url', function (done) {
            $$httpBackend
                .expectGET('path/to/some/template.html');

            $$httpBackend
                .when('GET', 'path/to/some/template.html')
                .respond('template over url');


            $$bulma
                .modal({
                    controller:   function () {
                        this.test = 123;
                    },
                    controllerAs: 'vm',
                    templateUrl:  'path/to/some/template.html'
                })
                .then(testInstanceOf)
                .catch(failTest)
                .finally(done);

            $$rootScope.$digest();
            $$httpBackend.flush();

            function testInstanceOf(modal) {
                expect(modal.getOption('template')).toEqual('template over url');
            }

            function failTest(error) {
                expect(error).toBeUndefined();
            }
        });

    });


});