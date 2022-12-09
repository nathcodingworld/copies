

class MapMarker {
    root
    map
    listing = []
    filtered = []
    markers = []
    categories = "ATM"
    locRegion = ""
    locCity = ""
    locSearch = ""
    filters = document.createElement("div")
    cats = document.createElement("div")
    selects = document.createElement("div")
    searchs = document.createElement("div")
    cards = document.createElement("div")
    searchEl = document.createElement("input")
    constructor(rootid,mapid, data) {
        try {
            this.root = document.getElementById(rootid)
            this.listing = data
            this.map = L.map(mapid).setView([14.599445293277881, 120.98421427768011], 7);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '© OpenStreetMap'}).addTo(this.map);
            this._initialize()
        } catch (error) {
            console.log(error.message);
        }
    }
    _initialize() {
        this.filters.classList.add("rbfilters")
        this.cats.classList.add("category-con")
        this.selects.classList.add("select-con")
        this.searchs.classList.add("search-con")
        this.cards.classList.add("cards-con")
        this.root.prepend(this.filters)
        this._createFilters()
        this.filters.append(this.cats,this.selects,this.searchs,this.cards)
    }
    _createFilters() {
        const atmbtn = document.createElement("button")
        atmbtn.classList.add("cat-active")
        atmbtn.innerText = "ATM"
        atmbtn.addEventListener("click", ()=>{
            if(this.categories !== "ATM") {
                this.categories = "ATM"
                atmbtn.classList.add("cat-active")
                brcbtn.classList.remove("cat-active")
                if(this.locCity || this.locSearch) this._filter()
            }
        })
        const brcbtn = document.createElement("button")
        brcbtn.innerText = "BRANCH"
        brcbtn.addEventListener("click", ()=> {
            if(this.categories !== "Branches"){
                this.categories = "Branches"
                atmbtn.classList.remove("cat-active")
                brcbtn.classList.add("cat-active")
                if(this.locCity || this.locSearch) this._filter()

            }
        })
        this.cats.append(atmbtn, brcbtn)

        const region = document.createElement("select")
        region.innerHTML = "<option value='' disabled selected hidden>Choose State</option>"
        const states = [...new Set(this.listing.map(d=>d.State))]
        states.forEach(val=>{
            const state = document.createElement("option")
            state.value = val
            state.innerText = val
            region.append(state)
        })
        const cities = document.createElement("select")
        region.addEventListener("change", (e)=>{
            this.locRegion = e.target.value
            this.locCity = ""
            cities.innerHTML = "<option value='' disabled selected hidden>Choose City</option>"
            const citys = [...new Set(this.listing.filter(d=> d.State === e.target.value).map(d=> d.City))]
            citys.forEach(val=>{
                const city = document.createElement("option")
                city.value = val
                city.innerText = val
                cities.append(city)
            })
        })
        cities.addEventListener("change", (e)=>{
            this.locCity = e.target.value
            this.locSearch = ""
            this.searchEl.value = ""
            this._filter()
        })
        this.selects.append(region, cities)

        this.searchEl.setAttribute("placeholder", "Search name or city location")
        const searchbtn = document.createElement("button")
        searchbtn.innerText = "SEARCH"
        searchbtn.addEventListener("click", ()=> {
            this.locSearch = this.searchEl.value
            this._filter()
        })
        this.searchEl.addEventListener("keypress", (e)=>{
            if(e.key === "Enter") {
                this.locSearch = e.target.value
                this._filter()
            }
        })
        this.searchs.append(this.searchEl, searchbtn)
    }
    _createCards() {
        this.cards.innerHTML = ""
        this.filtered.forEach(item => {
            const card = document.createElement("div")
            card.classList.add("fcard")
            card.innerHTML = `
            <div class="cardhead">
                <h2 class="cardheadtitle">${item.Title}</h2>
            </div>
            <div class="cardbody">
                <p class="cardaddrss">${item.Address}</p>
            </div>
            <div class="cardfoot">
                ${item.BankingHours && `<p class="cardsub"><i class="bi bi-clock-fill"></i>${item.BankingHours}</p>`}
                ${item.ContactNumber1 &&`<p class="cardsub"><i class="bi bi-telephone-fill"></i>${item.ContactNumber1}</p>`}
                ${item.ContactNumber2 && `<p class="cardsub"><i class="bi bi-telephone-fill"></i>${item.ContactNumber2}</p>`}
            </div>
            `
            const cardbtn = document.createElement("button")
            cardbtn.innerText = "VIEW"
            cardbtn.addEventListener("click", ()=>{
                this.map.setView([item.Latitude, item.Longitude],17)
            })
            card.append(cardbtn)
            this.cards.append(card)
        })
    }
    _filter() {
        this.filtered = this.listing.filter(c=>c.Categories === this.categories)
        this.filtered = this.filtered.filter(l=>l.State === this.locRegion && l.City === this.locCity)
        if(this.filtered.length === 0) this.filtered = this.listing
        if(this.locSearch){
            console.log("test");
            this.filtered = this.filtered.filter(f=>{
                const map = f.Title+f.Address
                return map.toLowerCase().includes(this.locSearch.toLowerCase())
            })
        }
        this._createCards()
        this._pointMarker()
    }
    _pointMarker() {
        this.markers.forEach(m=>this.map.removeLayer(m))
        this.markers = []
        this.filtered.forEach(list=> {
            const card = document.createElement("div")
            card.innerHTML = `
            <div class="maphead">
             <h1 class="mheadtitle">${list.Categories}</h1>
            </div>
            <div class="mapbody">
             <h1 class="maptitle">${list.Title}</h1>
             <p class="mapaddrss">${list.Address}</p>
            </div>
            <div class="mapfoot">
             ${list.BankingHours && `<p class="mapsub"><i class="bi bi-clock-fill"></i>${list.BankingHours}</p>`}
             ${list.ContactNumber1 && `<p class="mapsub"><i class="bi bi-telephone-fill"></i>${list.ContactNumber1}</p>`}
             ${list.ContactNumber2 && `<p class="mapsub"><i class="bi bi-telephone-fill"></i>${list.ContactNumber2}</p>`}
            </div>
            `
            const mark = L.marker([list.Latitude, list.Longitude])
            this.markers.push(mark)
            mark.bindPopup(card).addTo(this.map)
        } )
    }
}

export default MapMarker