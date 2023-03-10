// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fileUrl: 'http://localhost:8080/files',
  baseUrl: 'http://localhost:8080/api',
  categoryUrl: 'http://localhost:8080/api/book-category',
  formatUrl: 'http://localhost:8080/api/book-format',
  countriesUrl: 'http://localhost:8080/api/countries',
  placeOrderUrl: 'http://localhost:8080/api/checkout/purchase',
  orderUrl: 'http://localhost:8080/api/orders',
  stripePublishableKey:
    'pk_test_51MSPBiAzkd76A7dKeRf8tKhvveO7VGuCz6CPSTdWPnb0ml9oeWBo6gjog1E5JnKrza8F9BaBp7K480b2U8MtQQfN006aXK88mO',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
