[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Component built to gather and send user feedback

## Default Submission Function

The `rxFeedback` component sends feedback to `/api/encore/feedback`, which routes feedback to `encoreui@lists`. 
This endpoint also supports a `product` parameter `/api/encore/feedback/:product` for sending feedback to a 
product-specific mailing list. Adding a custom endpoint is managed in `encore-service-pillar`. Once configured 
you can override the default endpoint with `rxFeedbackSvc.setEndpoint`.

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
