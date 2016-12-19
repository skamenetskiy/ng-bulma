### bulma.module
```javascript
angular
    .module('bulma', [
        'bulma.modal',
        'bulma.progress'
    ]);
```

bulma is the main module which includes the ```<bulma/>``` component and the following dependencies:
- bulma.modal
- bulma.progress

### bulma.service
The ```bulma``` service is accessible through the `bulma` argument

#### bulma.modal(options) : promise(BulmaModal)

Option | Type | Description
------ | ---- | -----------
**options.template** | _string_ | represents the template string
**options.templateUrl** | string | represents the url to load the template from
**options.controller** | string|function|[string,function] | represents the modal controller
**options.controllerAs** | string | represents the controllerAs definition for the modals' controller
**options.classes** | object | will be passed to modals' ngClass