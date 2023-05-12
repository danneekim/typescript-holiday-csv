# Public Holidays CSV Generator

This is a Typescript script that generates a CSV file listing all the public holidays in a country, using data from the public API at https://date.nager.at/.

## Requirements

- [x] Use only `typescript` and `@types/node`.
- [x] Use Git.
- [ ] Use API at https://date.nager.at/.
- [ ] The script generates a CSV file listing public holidays of a country.
- [ ] The CSV file includes 4 columns:
  - [ ] `Name:` - name of holiday
  - [ ] `Date:` - date of holiday
  - [ ] `Days until:` - number of days for future holiday, blank if passed.
  - [ ] `Weekend:` - "Yes" of "No" if holidays is on a weekend.
- [ ] Code delivered as an npm project that runs with `npm run main`.

## Extra Points

- [ ] Allow users to choose a country for public holiday listings.
- [ ] Consider how to run the script behind a corporate proxy server
- [ ] Include additional unit tests
- [ ] Include more extensive error handling

## Running the Script
