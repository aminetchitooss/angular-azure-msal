# Angular Azure Msal

<!-- [![npm](https://img.shields.io/npm/v/@tchitos/datetime-picker.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/@tchitos/datetime-picker)
[![npm](https://img.shields.io/npm/dm/@tchitos/datetime-picker.svg)](https://www.npmjs.com/package/@tchitos/datetime-picker) -->

Angular MSAL Azure - This package supports Angular 13+

## Installation

1. Create a new project

```sh
ng new test
cd test
```

2. Include Angular Azure Msal into your application.

```sh
ng add @tchitos/azure-msal

#The terminal will prompt and ask you to fill `clientId` and `tenantId`.
```

3. Run the application et voila!

```sh
ng serve
```

## Test the schematics locally

1. Clone this repository.

```sh
git clone https://github.com/aminetchitooss/angular-azure-msal.git
```

2. Install dependencies

```sh
npm install
```

3. Make changes and then run

```bash
npm run build
schematics .:ng-add --dry-run=false
```

## License

MIT
