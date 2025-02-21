import { stringify } from "querystring";

const baseUrl = "https://de1.api.radio-browser.info/json";
export default {
  //Listo os generos
  //   getStations: async () => {
  //     const res = await fetch(`${baseUrl}/tags`);
  //     const json = await res.json();
  //     return json;
  //   },

  // https://de1.api.radio-browser.info/json/stations/search?tag=rock&limit=10
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
  getRadio: async (stationuuid: string) => {
    // console.log(stationuuid);
    //pego a radio especifica
    // https://de1.api.radio-browser.info/json/stations/byuuid/db93a00f-9191-46ab-9e87-ec9b373b3eee
    const res = await fetch(`${baseUrl}/stations/byuuid/${stationuuid}`);
    const json = await res.json();
    // console.log(json);
    return json;
  },
};

// https://de1.api.radio-browser.info/json/stations/bytag/rock
//   https://de1.api.radio-browser.info/json/stations/search?name=NomeDaRadio

// "https://de1.api.radio-browser.info/json/stations/search?name=\tArrow Classic Rock"
