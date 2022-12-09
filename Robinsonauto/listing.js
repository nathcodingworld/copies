

class AutomobileListings {
    listing = []
    mapped = []
    parent
    limit
    input
    brand = []
    year = []
    mileage = 0
    color = []
    transmision = [] 
    fuel = []
    minprice = 0
    maxprice = 0
    head = document.createElement("div")
    body = document.createElement("div")
    side = document.createElement("div")
    foot = document.createElement("div")
    constructor(data, root, limit) {
        try {
            this.listing = data
            this.limit = limit
            this.parent = document.getElementById(root)
            this._initialize()
        } catch (error) {
            console.log(error);
        }
    }
    _initialize() {
        this.body.classList.add("elbody")
        this.side.classList.add("elside")
        this.head.classList.add("elhead")
        this.foot.classList.add("elfoot")
        this._createSrch()
        this._createFltrs()
        this._run()
        this._render()
    }
    _createBtns() {
        this.foot.innerHTML = ""
        const limit = this.limit
        const pages = Math.ceil(this.mapped.length / limit) 
        if(pages !== 1)
        for(let i =  1; i <= pages; i++ ) {
            const btn = document.createElement("button")
            btn.innerHTML = i
            btn.classList.add("btn-child")
            btn.addEventListener("click", ()=> {
                this._createCrds((i-1)*limit, limit*i )
            })
            this.foot.append(btn)
        }
    }
    _createCrds(start, end) {
        this.body.innerHTML = ""
        const last = Math.min(this.mapped.length , end)
        const child = this.mapped.slice(start, last)
        child.forEach(d=>{
            const card = document.createElement("div")
            card.setAttribute("class", "elcard")
            card.innerHTML = `
            <div class="cardtitle">
            <h3 class="ctitle">${d.assets_model}</h3>
            </div>
            <div class="cardcontent">
            <p class="content"><span><b>COLOR: </b></span><span>${d.assets_color}</span></p>
            <p class="content"><span><b>MILEAGE: </b></span><span>${d.assets_mileage}</span></p>
            <p class="content"><span><b>YEAR: </b></span><span>${d.assets_year}</span></p>
            <p class="content"><span><b>FUEL: </b></span><span>${d.assets_fuel_type}</span></p>
            <p class="content"><span><b>PRICE: </b></span><span>${d.assets_selling_price}</span></p>
            <p class="content"><span><b>TRANSMISION: </b></span><span>${d.assets_transmission_type}</span></p>
            </div>
            <div class="cardfoot">
            <p>${d.assets_mode_of_sale}</p>
            </div>
            <div class="cfbot">
            <p>Plate no. ${d.assets_plate_conduction_no}</p>
            <p>${d.assets_uploading_date}</p>
            </div>
            `
            const cardaction = document.createElement("div")
            cardaction.setAttribute("class", "cardaction")
            const cardbtni = document.createElement("button")
            const cardbtnv = document.createElement("button")
            cardbtni.setAttribute("class", "cbtni")
            cardbtnv.setAttribute("class", "cbtnv")
            cardbtni.innerText = "INQUIRE"
            cardbtnv.innerText = "VIEW"
            cardbtni.addEventListener("click", ()=> {
                console.log("inquire");
            })
            cardbtnv.addEventListener("click", ()=> {
                console.log("Make a offer");
            })
            cardaction.append(cardbtni, cardbtnv)
            card.append( cardaction)
            this.body.append(card)
        })
        anime({
            targets: this.body.querySelectorAll(".elcard"),
            translateX: [150, 0],
            opacity: [0,1],
            delay: anime.stagger(100) // increase delay by 100ms for each elements.
          });
    }
    _createSrch() {
        const searchel = document.createElement("input")
        const searchelbtn = document.createElement("button")
        searchel.setAttribute("type", "text")
        searchel.setAttribute("name", "search")
        searchel.setAttribute("id", "search")
        searchel.setAttribute("class", "srchel")
        searchel.setAttribute("placeholder", "search")
        searchelbtn.setAttribute("class", "searchbtn")
        searchelbtn.innerHTML = "search"
        searchel.addEventListener("keypress", (e)=>{
            if(e.key === "Enter") {
                this.input = e.target.value
                this._run()
            }
        })
        searchelbtn.addEventListener("click", ()=>{
            this.input = searchel.value
            this._run()
        })
        this.side.append(searchel,searchelbtn)
    }
    _createFltrs() {
        const entries = {
            brands: ["HYUNDAI", "MITSUBISHI", "SUZUKI", "FORD", "CHEVROLET", "NISSAN", "TOYOTA"],
            fuels: ["GAS", "DIESEL"],
            transmisions: ["AUTOMATIC", "MANUAL"],
            colors: ["WHITE", "BLACK", "RED", "BLUE", "SILVER", "STEEL", "GRAY"],
            years: [2016, 2017, 2018, 2019, 2020, 2021]
        }
        const maxmin= ["Max Price", "Min Price", "Max Mileage"]
        for(let key in entries) {
            const container = document.createElement("div")
            const filterTitle = document.createElement("h3")
            const thisFilter = key === "brands"? this.brand : key === "fuels" ? this.fuel :  key === "transmisions" ? this.transmision : key === "colors" ? this.color : this.year
            filterTitle.innerHTML = key
            container.append(filterTitle)
            entries[key].forEach(fltr=> {
                const filterInput = document.createElement("input")
                const filterLabel = document.createElement("label")
                filterInput.setAttribute("type", "checkbox")
                filterInput.setAttribute("name", fltr)
                filterInput.setAttribute("id", fltr)
                filterInput.setAttribute("value", fltr)
                filterLabel.setAttribute("for", fltr)
                filterLabel.innerHTML = fltr+"<br>"
                filterInput.addEventListener("change", (e)=> {
                    if(e.target.checked) thisFilter.push(e.target.value)
                    else thisFilter.splice(thisFilter.indexOf(e.target.value),1)
                    this._run()
                })
                container.append(filterInput, filterLabel)
            })
            this.side.append(container)
        }
        for(let fltr of maxmin) {
            const input = document.createElement("input")
            const label = document.createElement("h3")
            input.setAttribute("type", "number")
            input.setAttribute("name", fltr)
            input.setAttribute("class", "fltrel")
            input.setAttribute("placeholder", fltr)
            label.innerText = fltr
            input.addEventListener("blur", (e)=> {
                if(fltr === "Max Price") this.maxprice = e.target.value
                if(fltr === "Min Price") this.minprice = e.target.value
                if(fltr === "Max Mileage") this.mileage = e.target.value
                this._run()
                
            })
            input.addEventListener("keypress", (e)=> {
                if(e.key === "Enter") {
                    if(fltr === "Max Price") this.maxprice = e.target.value
                    if(fltr === "Min Price") this.minprice = e.target.value
                    if(fltr === "Max Mileage") this.mileage = e.target.value
                    this._run()
                }
            })
            this.side.append(label, input)
        }
    }
    _filter(){
        if(!this.input) this.mapped = this.listing
        else this.mapped = this.listing.filter(list => list.assets_model.toLocaleLowerCase().includes(this.input.toLocaleLowerCase()))
        this.mapped =  this.mapped.filter(l => {
            const brand = this.brand.length === 0 || this.brand.some(i=> l.assets_model.includes(i))
            const color = this.color.length === 0 || this.color.some(i=> l.assets_color.includes(i))
            const fuel = this.fuel.length === 0 || this.fuel.some(i=> l.assets_fuel_type === i)
            const transmision = this.transmision.length === 0 || this.transmision.some(i=> l.assets_transmission_type === i) 
            const mileage = !this.mileage || +l.assets_mileage < this.mileage
            const year = this.year.length === 0 || this.year.some(i=> l.assets_year == i) 
            const minprice = !this.minprice || parseFloat(l.assets_selling_price.replace(",",'')) > this.minprice
            const maxprice = !this.maxprice || parseFloat(l.assets_selling_price.replace(",",'')) < this.maxprice
            if( brand && color && fuel && transmision && mileage && minprice && maxprice && year) return true
            else return false
        })
        console.log(this.mapped);
    }
    _run(){
        this._filter()
        this._createBtns()
        this._createCrds(0, this.limit)
    }
    _render() {
        if(this.parent) this.parent.append(this.head, this.side,this.body, this.foot)
    }
}

export default AutomobileListings