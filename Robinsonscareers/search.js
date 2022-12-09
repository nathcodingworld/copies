



class SearchPage {
    root
    data
    mapped = []
    type = []
    sector = []
    skills = []
    search
    content = document.createElement("div")
    searchs = document.createElement("div")
    buttons = document.createElement("div")
    filters = document.createElement("div")
    constructor (data, filter, root) {
        this.data = data
        this.root = document.getElementById(root)
        this.content.classList.add("cardinp")
        this.buttons.classList.add("buttoninp")
        this.searchs.classList.add("searchinp")
        this._run()
        this._createFilters(filter)
        this._createSearch()
        this._render()
    }
    _searchTypes() {
        this.mapped =  this.mapped.filter(d=>this.type.every(i=>d.type.includes(i)))
    }
    _searchSectors() {
        this.mapped =  this.mapped.filter(d=>this.sector.every(i=>d.sector.includes(i)))
    }
    _searchSkills() {
        this.mapped =  this.mapped.filter(d=>this.skills.every(i=>d.skills.includes(i)))
    }
    _searchJobs() {
        if(!this.search) this.mapped = this.data
        else this.mapped = this.data.filter(d=>d.jobtitle.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
    }
    _createFilters(filter) {
        for(let key in filter) {
            const container = document.createElement("div")
            const filterTitle = document.createElement("h3")
            const thisFilter = key === "type"? this.type : key === "sector" ? this.sector : this.skills
            filterTitle.innerHTML = key
            container.append(filterTitle)
            filter[key].forEach(fltr=> {
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
            this.filters.append(container)
        }
    }
    _createSearch() {
        const srch = document.createElement("input")
        const srchbtn = document.createElement("button")
        srch.setAttribute("type", "text")
        srch.setAttribute("name", "search")
        srch.setAttribute("id", "search")
        srch.setAttribute("placeholder", "search")
        srchbtn.setAttribute("class", "searchbtn")
        srchbtn.innerHTML = "search"
        srch.addEventListener("keypress", (e)=>{
            if(e.key === "Enter") this._search(e.target.value)
        })
        srchbtn.addEventListener("click", ()=>{
            this._search(srch.value)
        })
        this.searchs.append(srch, srchbtn)
    }
    _createBtn() {
        this.buttons.innerHTML = ""
        const limit = 10
        const pages = Math.ceil(this.mapped.length / limit) 
        if(pages !== 1)
        for(let i =  1; i <= pages; i++ ) {
            const btn = document.createElement("button")
            btn.innerHTML = i
            btn.classList.add("btn-child")
            btn.addEventListener("click", ()=> {
                this._insertPage((i-1)*limit, limit*i )
            })
            this.buttons.append(btn)
        }
    }
    _insertPage(start, end) {
        this.content.innerHTML = ""
        const last = Math.min(this.mapped.length , end)
        const child = this.mapped.slice(start, last)
        child.forEach(data => {
            const newdiv = document.createElement("div")
            const title = document.createElement("h3")
            const date = document.createElement("p")
            const loc = document.createElement("p")
            const salary = document.createElement("p")
            newdiv.classList.add("cardcontainer")
            title.classList.add("cardtitle")
            date.classList.add("carddate")
            loc.classList.add("cardloc")
            salary.classList.add("cardsal")
            date.innerHTML = data.date
            loc.innerHTML = data.address
            salary.innerHTML = data.salary
            title.innerHTML = data.jobtitle
            // newdiv.addEventListener("click", ()=> {
            //     this._openModal(data)
            // })
            newdiv.append(title,date,loc,salary)
            this.content.append(newdiv)
        })
    }
    _run() {
        this._searchJobs()
        this._searchTypes()
        this._searchSectors()
        this._searchSkills()
        this._createBtn()
        this._insertPage(0, 10)
    }
    _search(param) {
        this.search = param
        this._run()
    }
    _render() {
        if(this.root)
        this.root.append(this.searchs,this.filters, this.content,this.buttons)
    }
}
export default SearchPage