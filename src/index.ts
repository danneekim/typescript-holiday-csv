import https from "node:https";
import fs from "node:fs";
import path from "node:path";

export interface Holiday {
  name: string;
  date: string;
}
export interface HolidayDetails extends Holiday {
  daysUntil: number | string;
  onWeekend: string;
}

const baseUrl = "https://date.nager.at/api/v3";

export function getPublicHolidays(
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

export async function createCSVFile(countryCode: string) {
  const holidays = await getPublicHolidays(countryCode);

  const holidayDetails: HolidayDetails[] = holidays.map((holiday) => {
    const now = new Date();
    const date = new Date(holiday.date);
    const timeDiff = date.getTime() - now.getTime();
    const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const dayOfWeek = date.getUTCDay();

    let row: HolidayDetails = {
      name: holiday.name,
      date: holiday.date,
      daysUntil: daysUntil > 0 ? daysUntil : "",
      onWeekend: dayOfWeek === 0 || dayOfWeek === 6 ? "Yes" : "No",
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
  const fileName = `${countryCode}_holidays.csv`;
  const filePath = path.join(folderPath, fileName);

  // create directory
  fs.mkdir(folderPath, (error) => {
    if (!error) {
      console.log("Creating a csv directory...\n");
    } else if (error?.code === "EEXIST") {
      return;
    } else {
      console.error("Error creating csv directory...", error);
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

const countryCode = "AT";
createCSVFile(countryCode);
