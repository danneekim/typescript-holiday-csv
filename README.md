# Public Holidays CSV Generator

This is a Typescript script that generates a CSV file listing all the public holidays in a country, using data from the public API at https://date.nager.at/.

This project can be installed as a third party dependency via npm
> https://www.npmjs.com/package/typescript-holiday-csv
>```js
> npm i typescript-holiday-csv
> ```

## Requirements

- [x] Use only `typescript` and `@types/node`.
- [x] Use Git.
- [x] Use API at https://date.nager.at/.
- [x] The script generates a CSV file listing public holidays of a country.
- [x] The CSV file includes 4 columns:
  - [x] `Name:` - name of holiday
  - [x] `Date:` - date of holiday
  - [x] `Days until:` - number of days for future holiday, blank if passed.
  - [x] `Weekend:` - "Yes" of "No" if holidays is on a weekend.
- [x] Code delivered as an npm project that runs with `npm run main`.

## Extra Points

- [ ] Allow users to choose a country for public holiday listings. (**WIP**)
- [ ] Consider how to run the script behind a corporate proxy server.
- [ ] Include additional unit tests
- [ ] Include more extensive error handling

## Running the Script

To run the script, clone the repository and install the dependencies:
```node
git clone https://github.com/danneekim/typescript-holiday-csv.git
cd typescript-holiday-csv
npm install
```

#### **`npm run main`**: <br>
> will create a **`csv/`** folder at the project's root directory.<br>
> by default, generate a CSV file with information related to Austria's (AU) public holidays.<br>


# API Reference
Nager.Date API - V3
> Documentation: https://date.nager.at/Api <br>
> Swagger: https://date.nager.at/swagger/index.html <br>
>  - **GET** /api/v3/PublicHolidays/{year}/{countryCode} <br>
>  - **GET** /api/v3/AvailableCountries *(pending)*
