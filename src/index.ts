import https from "node:https";

interface Holiday {
  name: string;
  date: string;
}

const baseUrl = "https://date.nager.at/api/v3";
const countryCode = "AU";
const year = 2023;

function getPublicHolidays(
  countryCode: string,
  year: number = new Date().getFullYear()
): Promise<Holiday[]> {
  const url = `${baseUrl}/PublicHolidays/${year}/${countryCode}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            const holidays: Holiday[] = JSON.parse(data);
            resolve(holidays);
            // console.log(holidays);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (e) => {
        console.error(e);
        reject(e);
      });
  });
}

const holidays = getPublicHolidays("AU");
