import https from "node:https";

const baseUrl = "https://date.nager.at/api/v3";
const countryCode = "AU";
const year = 2023;

function getPublicHolidays(
  countryCode: string,
  year: number = new Date().getFullYear()
) {
  const url = `${baseUrl}/PublicHolidays/${year}/${countryCode}`;

  https
    .get(url, (res) => {
      console.log(`status: ${res.statusCode}`);
      console.log(`headers:`, res.headers, "\n");

      res.on("data", (d) => {
        process.stdout.write(d);
      });

      res.on("end", () => {});
    })
    .on("error", (e) => {
      console.error(e);
    });
}

getPublicHolidays("AU");
