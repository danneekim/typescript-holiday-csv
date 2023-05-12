import https from "node:https";
import fs from "node:fs";
import path from "node:path";

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

function createCSVFile() {
  const data = [
    ["Name", "Age", "Email", "Hobby"],
    ["John", "30", "john@example.com", "gym"],
    ["Jane", "25", "jane@example.com", "reading"],
    ["Bob", "35", "bob@example.com", "coding"],
  ];
  // format data
  const csv = data.map((row) => row.join(",")).join("\n");
  console.log("formatted data:\n", csv + "\n");
  const folderPath = "csv/";
  const fileName = "data.csv";
  const filePath = path.join(folderPath, fileName);

  // create a csv directory
  fs.mkdir(folderPath, (error) => {
    if (error?.code === "EEXIST" || !error) {
      console.log("Successfully created csv directory..\n");
    } else {
      console.error("Error creating csv directory..", error);
    }
  });
  // create a csv file
  fs.writeFile(filePath, csv, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`A CSV file created at: ${filePath}`);
    }
  });
}
createCSVFile();
