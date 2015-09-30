[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Component built to gather and send user feedback

## Default Submission Function

The `rxFeedback` component sends feedback to `/api/encore/feedback`, which routes feedback to `encoreui@lists`.

This endpoint also supports a `product` parameter `/api/encore/feedback/:product` for sending feedback to a
product-specific mailing list.

## Custom Endpoint

Adding a custom endpoint is managed in `encore-service-pillar`. Once configured
you can override the default endpoint with `rxFeedbackSvc.setEndpoint`.

```javascript
// To be put in the run section of your application
.run(function (rxFeedbackSvc) {
    rxFeedbackSvc.setEndpoint('/api/encore/feedback/cloud');
});
```

## Custom Submission Function

The `rxFeedback` component allows you to define an `on-submit` attribute that points to a custom function for the
purposes of overriding the default submission logic.  This function should accept a single argument for a
feedback object with the following definition:

```javascript
// feedback object structure
{
  "type": {
    "label": "(string)",
    "placeholder": "(string) placeholder text",
    "prompt": "(string) UI text used to describe the `description` field"
  },
  "description": "(string) user-submitted feedback"
}
```

## Feedback Redirect Integration

To obtain the Feedback Redirect integration, please update `encore-ui-svcs` to version `0.11.0` or above.  Once you have done so include
`'encore.svcs.feedback'` in the list of dependencies for your application, this will ensure that when a user selects a **Feedback Type**
of "Feature Request", the service will open up a new window redirecting the user to the **GET Feedback** website,
which will now host all internal requests for features.


```
angular.module('myApplication', ['ngRoute', 'ngResource', 'encore.svcs.feedback'])
```

By adding the `encore.svcs.feedback` dependency to your application, the `Feedback` service will be available and automatically
initialized by the `rxFeedback` controller.  Once initialized, the default behaviour of the `rxFeedback` controller will be
altered to perform the GET feedback redirect.


### Production
To manually include the Feedback changes without updating your version of Encore UI (but after updating `encore-ui-svcs`), please include the following:

Add the following script in your `index.html` (after injected dependencies):

[http://3bea8551c95f45baa125-a22eac1892b2a6dcfdb36104c0e925de.r46.cf1.rackcdn.com/feedback-override.js](http://3bea8551c95f45baa125-a22eac1892b2a6dcfdb36104c0e925de.r46.cf1.rackcdn.com/feedback-override.js)

```html
<!-- inject:js -->
<!-- endinject -->
<script src="https://6618f7541d71c1a404be-a22eac1892b2a6dcfdb36104c0e925de.ssl.cf1.rackcdn.com/feedback-override.js"></script>
```

### Development
For development purposes, you may want to include one of the two following configurations depending on which type of project you have:

*The latest version of the [Encore generator](https://github.com/rackerlabs/generator-encore) will include this proxy*

**Gulp**: `gulp/util/prism.js`
```javascript
prism.create({
    name: 'encorefeedback',
    context: '/encore/feedback',
    host: 'staging.encore.rackspace.com',
    port: 443,
    https: true,
    changeOrigin: false
});
```

**Grunt**: `tasks/util/config`
```javascript
{
    context: '/encore/feedback',
    host: 'staging.encore.rackspace.com',
    port: 443,
    https: true,
    protocol: 'https',
    changeOrigin: false
}
```
