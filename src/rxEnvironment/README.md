[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Component built to detect and provide the current environment (e.g. dev, staging, prod)

This service defines the following Encore specific environments:

* **`local`** - http://localhost:port and http://server:port
* **`preprod`** - http://preprod.encore.rackspace.com
* **`unified-preprod`** - https://*.encore.rackspace.com
* **`unified`** - All environments including https://encore.rackspace.com
* **`unified-prod`** - https://encore.rackspace.com

They can be overwritten if necessary via the `Environment.environments` property.