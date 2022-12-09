import MapMarker from "./interface.js";


(async ()=> {
    const response = await fetch("data.json")
    const data = await response.json()
    new MapMarker("Root",'rbankmap', data)
    // console.log([...new Set(data.filter(d=> d.State === "Pampanga").map(d=> d.City))]);
})()