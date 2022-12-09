

class MotorcyclesListings {
    listing = []
    mapped = []
    buttons = []
    parent
    limit
    currentPage = 1
    lastPage = 1
    input
    brand = []
    year = []
    color = []
    location = [] 
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
        this.currentPage = 1
        this.lastPage = 1
        const limit = this.limit
        const pages = Math.ceil( this.mapped.length / limit) 
        if(pages !== 1) {
            for(let i =  1; i <= pages; i++ ) {
                const btn = document.createElement("button")
                btn.innerHTML = i
                btn.classList.add("btn-child", `btn${i}`)
                btn.addEventListener("click", ()=> {
                    this.currentPage = i
                    this._createCrds((i-1)*limit, limit*i )
                    this.foot.querySelector(`.btn${this.currentPage}`).classList.add("btnactive")
                    if(this.currentPage !== this.lastPage) {
                        this.foot.querySelector(`.btn${this.lastPage}`).classList.remove("btnactive")
                        this.lastPage = i
                    } 
                    this._updateBtns()
                })
                this.buttons.push(btn)
            }
            this._updateBtns()
        }
    }
    _updateBtns() {
        this.foot.innerHTML = ""
        const length = this.mapped.length
        const minbtn = this.limit/2
        const start = Math.max(0, this.currentPage - minbtn)
        const end = Math.min(length - 1, this.currentPage + minbtn)
        this.buttons.slice(start,end).forEach(btn=>{
            this.foot.append(btn)
        })
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
                <h3 class="ctitle">${d.assets_make_model}</h3>
                </div>
                <div class="cardcontent">
                <p class="content"><span><b>Chassis: </b></span><span>${d.assets_chassis}</span></p>
                <p class="content"><span><b>Engine: </b></span><span>${d.assets_engine}</span></p>
                <p class="content"><span><b>Location of unit: </b></span><span>${d.assets_location_of_unit}</span></p>
                </div>
                <div class="cardfoot">
                <p><b>refference no.</b> ${d.assets_reference_number}</p>
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
            brands: ["YAMAHA", "HONDA", "SUZUKI", "KAWASAKI", "KYMCO"],
            locations: ["Calamba Warehouse", "Octagon Warehouse", "Pampanga Warehouse", "Passi Warehouse"],
            colors: ["WHITE", "BLACK", "RED", "BLUE", "SILVER", "GREEN", "GRAY", "ORANGE", "VIOLET"],
            years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
        }
        for(let key in entries) {
            const container = document.createElement("div")
            const filterTitle = document.createElement("h3")
            const thisFilter = key === "brands"? this.brand : key === "locations" ? this.location : key === "colors" ? this.color : this.year
            filterTitle.innerText = key
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
    }
    _filter(){
        if(!this.input) this.mapped = this.listing
        else this.mapped = this.listing.filter(list => list.assets_make_model.toLocaleLowerCase().includes(this.input.toLocaleLowerCase()))
        this.mapped =  this.mapped.filter(l => {
            const brand = this.brand.length === 0 || this.brand.some(i=> l.assets_make_model.includes(i))
            const color = this.color.length === 0 || this.color.some(i=> l.assets_make_model.includes(i))
            const location = this.location.length === 0 || this.location.some(i=> l.assets_location_of_unit.includes(i)) 
            const year = this.year.length === 0 || this.year.some(i=> l.assets_make_model.includes(i)) 
            if( brand && color && location && year) return true
            else return false
        })
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

export default MotorcyclesListings