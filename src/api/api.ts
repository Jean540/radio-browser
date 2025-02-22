import { stringify } from "querystring";

const baseUrl = "https://de1.api.radio-browser.info/json";
export default {
  getStations: async (station?: string) => {
    const fields: { name?: string } = {};
    fields.name = station;

    const res = await fetch(
      `${baseUrl}/stations/search?${
        station ? stringify(fields) + "&" : ""
      }limit=10`
    );
    const json = await res.json();
    return json;
  },
};
