# Public Holidays CSV Generator

This is a Typescript script that generates a CSV file listing all the public holidays in a country, using data from the public API at https://date.nager.at/.

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

- [ ] Allow users to choose a country for public holiday listings.
- [ ] Consider how to run the script behind a corporate proxy server
- [ ] Include additional unit tests
- [ ] Include more extensive error handling

## Running the Script
