import https from "node:https";
import fs from "node:fs";
import path from "node:path";

interface Holiday {
  name: string;
  date: string;
}
interface HolidayDetails extends Holiday {
  daysUntil: number | string;
  onWeekend: string;
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

async function createCSVFile() {
  const holidays = await getPublicHolidays("AU");

  const holidayDetails: HolidayDetails[] = holidays.map((holiday) => {
    const now = new Date();
    const date = new Date(holiday.date);
    const timeDiff = date.getTime() - now.getTime();
    const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // TODO: calculate holiday falls on weekend

    let row: HolidayDetails = {
      name: holiday.name,
      date: holiday.date,
      daysUntil: daysUntil > 0 ? daysUntil : "",
      onWeekend: "Yes",
    };
    return row;
  });

  // convert to 2d array
  const csvRows = [
    ["Name", "Date", "Days Until", "Weekend"],
    ...holidayDetails.map((holiday) => [
      holiday.name,
      holiday.date,
      holiday.daysUntil,
      holiday.onWeekend,
    ]),
  ];

  // stringify data
  const csvData: string = csvRows.map((row) => row.join(",")).join("\n");
  const folderPath = "csv/";
  const fileName = "data.csv";
  const filePath = path.join(folderPath, fileName);

  // create csv directory
  fs.mkdir(folderPath, (error) => {
    if (error?.code === "EEXIST" || !error) {
      console.log("Successfully created csv directory..\n");
    } else {
      console.error("Error creating csv directory..", error);
    }
  });

  // create csv file
  fs.writeFile(filePath, csvData, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`A CSV file created at: ${filePath}`);
    }
  });
}
createCSVFile();
