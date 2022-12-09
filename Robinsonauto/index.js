import AutomobileListings from "./listing.js"

(async ()=> {
    console.log("er");
    const json = await fetch("data.json")
    const data = await json.json()
    const map = new AutomobileListings(data, "Root", 6)
    console.log("re");
})()