import MotorcyclesListings from "./listing.js";

(async ()=>{
    const json = await fetch("data.json")
    const data = await json.json()
    new MotorcyclesListings(data, "Root", 8)
})()