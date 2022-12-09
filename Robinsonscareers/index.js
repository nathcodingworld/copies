import SearchPage from "./search.js"



  (async ()=>{
    const data = await fetch("data.json")
    const filters = await fetch("filter.json")
    const filterjson = await filters.json()
    const json = await data.json()
    new SearchPage(json.data,filterjson, "Root")
  })()

