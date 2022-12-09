
 var forms = document.querySelectorAll('.parentform')
 var depform = document.querySelector('.depform')
 var charform = document.querySelector('.charform')
 var charnrform = document.querySelector('.charnrform')
 var ddtableBody = document.getElementById('adddd')
 var crtableBody = document.getElementById('addcr')
 var crnrtableBody = document.getElementById('addcrnr')
 let data = new FormData()

 let dependencyData = []
 let charReffData = []
 let charReffnoRelData = []


 Array.prototype.slice.call(forms)
   .forEach(function (form) {
     form.addEventListener('submit', function (event) {
         event.preventDefault()
         event.stopPropagation()
         if (form.checkValidity()) {
            const next = document.getElementById(form.dataset.ancr)
            next.removeAttribute("disabled")
            next.click()
            for(let [key, val] of new FormData(form).entries()) {
                data.set(key, val)
            }
            document.getElementById(form.dataset.anchor).classList.remove("list-group-item-danger")
        }
       form.classList.add('was-validated')
     }, false)
   })




 depform.addEventListener("submit", (e)=> {
    e.stopPropagation()
    e.preventDefault()
    if(depform.checkValidity()) {
        const id = Math.random()
        const data = new FormData(depform)
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <td> ${data.get("ddi-name")} </td>
        <td> ${data.get("ddi-age")}</td>
        <td> ${data.get("ddi-rel")}</td>
        <td> ${data.get("ddi-soa")}</td>
        <td>
            <button class="btn btn-danger delcr" data-id="${id}" type="button"><i data-id="${id}" class="bi bi-trash-fill"></i></button>
        </td>
        `
        ddtableBody.append(tr)
        depform.children[0].children[0].value = ""
        depform.children[1].children[0].value = ""
        depform.children[2].children[0].value = ""
        depform.children[3].children[0].value = ""
        depform.classList.remove('was-validated')

        dependencyData.push({
            id: id,
            name: data.get("ddi-name"),
            age: data.get("ddi-age"),
            relation: data.get("ddi-rel"),
            occupation: data.get("ddi-soa")
        })
        tr.querySelector(".delcr").addEventListener("click", (e)=> {
            e.stopPropagation()
            tr.remove()
            dependencyData = dependencyData.filter(dat=> dat.id != e.target.dataset.id)
        })
    } else
    depform.classList.add('was-validated')
 })

 charform.addEventListener("submit", (e)=> {
    e.stopPropagation()
    e.preventDefault()
    if(charform.checkValidity()) {
        const id = Math.random()
        const data = new FormData(charform)
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <td> ${data.get("cri-fname")} </td>
        <td> ${data.get("cri-mname")}</td>
        <td> ${data.get("cri-lname")}</td>
        <td> ${data.get("cri-cntc")}</td>
        <td> ${data.get("cri-addr")}</td>
        <td>
            <button class="btn btn-danger delcr" data-id="${id}" type="button"><i data-id="${id}" class="bi bi-trash-fill"></i></button>
        </td>
        `
        crtableBody.append(tr)
        charform.children[0].children[0].value = ""
        charform.children[1].children[0].value = ""
        charform.children[2].children[0].value = ""
        charform.children[3].children[0].value = ""
        charform.children[4].children[0].value = ""
        charform.classList.remove('was-validated')

        charReffData.push({
            id: id,
            fname: data.get("cri-fname"),
            mname: data.get("cri-mname"),
            lname: data.get("cri-lname"),
            contanct: data.get("cri-cntc"),
            adress: data.get("cri-addr")
        })
        tr.querySelector(".delcr").addEventListener("click", (e)=> {
            e.stopPropagation()
            tr.remove()
            charReffData = charReffData.filter(dat=> dat.id != e.target.dataset.id)
        })

    } else
    charform.classList.add('was-validated')
 })

 charnrform.addEventListener("submit", (e)=> {
    e.stopPropagation()
    e.preventDefault()
    if(charnrform.checkValidity()) {
        const id = Math.random()
        const data = new FormData(charnrform)
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <td> ${data.get("cri-fname-nr")} </td>
        <td> ${data.get("cri-mname-nr")}</td>
        <td> ${data.get("cri-lname-nr")}</td>
        <td> ${data.get("cri-cntc-nr")}</td>
        <td> ${data.get("cri-addr-nr")}</td>
        <td>
            <button class="btn btn-danger delcr" data-id="${id}" type="button"><i data-id="${id}" class="bi bi-trash-fill"></i></button>
        </td>
        `
        crnrtableBody.append(tr)
        charnrform.children[0].children[0].value = ""
        charnrform.children[1].children[0].value = ""
        charnrform.children[2].children[0].value = ""
        charnrform.children[3].children[0].value = ""
        charnrform.children[4].children[0].value = ""
        charnrform.classList.remove('was-validated')


        charReffnoRelData.push({
            id: id,
            fname: data.get("cri-fname-nr"),
            mname: data.get("cri-mname-nr"),
            lname: data.get("cri-lname-nr"),
            contanct: data.get("cri-cntc-nr"),
            adress: data.get("cri-addr-nr")
        })
        tr.querySelector(".delcr").addEventListener("click", (e)=> {
            e.stopPropagation()
            tr.remove()
            charReffnoRelData = charReffnoRelData.filter(dat=> dat.id != e.target.dataset.id)
        })
        
    } else
    charnrform.classList.add('was-validated')
 })

document.getElementById("tochar").addEventListener("click", ()=> {
  if(dependencyData.length > 0) {
    document.getElementById("depd-info-list").classList.remove("list-group-item-danger")
    const next = document.getElementById("char-reff-list")
    next.removeAttribute("disabled")
    next.click()
  }
})

document.getElementById("tofinal").addEventListener("click", ()=> {
  if(charReffData.length > 0 || charReffnoRelData.length > 0){
    document.getElementById("char-reff-list").classList.remove("list-group-item-danger")
    const next = document.getElementById("rev-sub-list")
    next.removeAttribute("disabled")
    next.click()
  }
})


function check() {
    const valid = []
    forms.forEach(form=>{
        valid.push(form.checkValidity())
    })
    if(dependencyData.length === 0) valid.push(false)
    if(charReffData.length === 0 && charReffnoRelData.length === 0) valid.push(false)
    return !valid.includes(false)
   }

function notValidForm() {
  const notvalid = []
  forms.forEach(form=>{
    if(!form.checkValidity()) {
      document.getElementById(form.dataset.anchor).classList.add("list-group-item-danger")
      if(form.dataset.anchor === "app-form-list") notvalid.push("Please Complete Application Form")
      if(form.dataset.anchor === "pers-info-list") notvalid.push("Please Complete Personal Information Form")
      if(form.dataset.anchor === "resd-info-list") notvalid.push("Please Complete Residence Information Form")
      if(form.dataset.anchor === "incm-info-list") notvalid.push("Please Complete Income Information Form")
    }
  })
  if(dependencyData.length === 0) {
    document.getElementById("depd-info-list").classList.add("list-group-item-danger")
    notvalid.push("Please add Dependents information")
  }
  if(charReffData.length === 0 && charReffnoRelData.length === 0) {
    document.getElementById("char-reff-list").classList.add("list-group-item-danger")
    notvalid.push("Please add Character refference information")
  }
  return notvalid
}

document.getElementById("rev-sub-list").addEventListener("click", ()=> {
    const reviewSubmit = document.getElementById("rev-sub")
    if(check()) {
        const submit = document.createElement("button")
        reviewSubmit.innerHTML = `
        <div class="card crd-con">

        <div class="card-header review"> Application Details </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-6 reviews">
              <div class="label">
                <p><b>Detail code:</b></p>
                <p><b>Brand:</b></p>
              </div>
              <div class="detail">
                <p>${data.get("detcode")}</p>
                <p>${data.get("brand")}</p>
              </div>
            </div>
            <div class="col-6 reviews" >
              <div class="label">
                <p><b>Purpose of Purchasing: </b></p>
                <p><b>Type of Application: </b></p>
              </div>
              <div class="detail">
                <p>${data.get("purpose")}</p>
                <p>${data.get("apptype")}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-header review"> Personal Details </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-6 reviews" >
              <div class="label">
                <p><b>Full name: </b></p>
                <p><b>Birth day: </b></p>
                <p><b>Civil Status:</b></p>
                <p><b>Gender:</b></p>
                <p><b>Birth place: </b></p>
              </div>
              <div class="detail">
                <p>${data.get("fname")} ${data.get("mname")} ${data.get("lname")} (${data.get("alias")})</p>
                <p>${data.get("birthday")}</p>
                <p>${data.get("gender")}</p>
                <p>${data.get("civilstatus")}</p>
                <p>${data.get("birthplace")}</p>
              </div>
            </div>
            <div class="col-6 reviews">
              <div class="label">
                <p><b>Nationality:</b></p>
                <p><b>Religion:</b></p>
                <p><b>Contact number:</b></p>
                <p><b>Email address:</b></p>
              </div>
              <div class="detail">
                <p>${data.get("nationality")}</p>
                <p>${data.get("religion")}</p>
                <p>${data.get("contact")}</p>
                <p>${data.get("email")}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-header review"> Address</div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col reviews" >
              <div class="label">
                <p><b>current Address: </b></p>
                <p><b>Permanent Address: </b></p>
                <p><b>Provincial Address: </b></p>
              </div>
              <div class="detail">
                <p>${data.get("currhouse")}, ${data.get("currstreet")}, ${data.get("currsubd")}, ${data.get("currbrng")}, ${data.get("currprov")}, ${data.get("currtown")}</p>
                <p>${data.get("permhouse")}, ${data.get("permstreet")}, ${data.get("permsubd")}, ${data.get("permbrng")}, ${data.get("permprov")}, ${data.get("permtown")}</p>
                <p>${data.get("provhouse")}, ${data.get("provstreet")}, ${data.get("provsubd")}, ${data.get("provbrng")}, ${data.get("provprov")}, ${data.get("provtown")}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-header review"> Income Details </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-6 reviews" >
              <div class="label">
                <p><b>Type of Employment: </b></p>
                <p><b>Employment Status: </b></p>
                <p><b>Employers Name: </b></p>
                <p><b>Position: </b></p>
                <p><b>Length of Service:</b></p>
                <p><b>Employers address:</b></p>
              </div>
              <div class="detail">
                <p>${data.get("employmenttype")}</p>
                <p>${data.get("employmentstat")}</p>
                <p>${data.get("employername")}</p>
                <p>${data.get("position")}</p>
                <p>${data.get("servicelength")}</p>
                <p>${data.get("employeraddress")}</p>
              </div>
            </div>
            <div class="col-6 reviews">
              <div class="label">
                <p><b>Contact number: </b></p>
                <p><b>telephone: </b></p>
                <p><b>Gross Income:</b></p>
                <p><b>Other Source:</b></p>
                <p><b>Expences:</b></p>
              </div>
              <div class="detail">
                <p>${data.get("employercontact")}</p>
                <p>${data.get("employertel")}</p>
                <p>${data.get("grossincome")}</p>
                <p>${data.get("othersource")}</p>
                <p>${data.get("expences")}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-header review"> Dependents</div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col reviews" >
              <div class="label">
                ${  dependencyData.map((d,i)=> `<p><b>Dependents ${i+1}: </b></p>`) }
              </div>
              <div class="detail">
              ${ dependencyData.map(d=> `<p>${d.name}- (${d.age}) - ${d.occupation}</p>`) }
              </div>
            </div>
          </div>
        </div>

        <div class="card-header review"> Chracter Refferences</div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col reviews" >
              <div class="label">
              ${  charReffData.map((d,i)=> `<p><b>Refference ${i+1}: </b></p>`) }
              ${  charReffnoRelData.map((d,i)=> `<p><b>Refference ${i+1} non relative: </b></p>`) }
              </div>
              <div class="detail">
              ${ charReffData.map(d=> `<p>${d.fname} ${d.mname} ${d.lname}- (${d.contanct}) - ${d.adress}</p>`) }
              ${ charReffnoRelData.map(d=> `<p>${d.fname} ${d.mname} ${d.lname}- (${d.contanct}) - ${d.adress}</p>`) }
              </div>
            </div>
          </div>
        </div>

      </div>
        `
        submit.setAttribute("class", "btn btn-primary")
        submit.innerText = "Submit"
        submit.addEventListener("click", async ()=> {
          data.set("dependents", JSON.stringify(dependencyData))
          data.set("charreff", JSON.stringify(charReffData))
          data.set("charreffnorel", JSON.stringify(charReffnoRelData))
          document.getElementById("list-tab").innerHTML = '<div class="list-group-item list-group-item-action active">Refference ID</div>'
          try {
            reviewSubmit. innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
            const res = await fetch("server.php", {method: "POST", body: data})
            const result = await res.json()
            if(result !== "failed") reviewSubmit. innerHTML = `<h1>Your refference id is <b>${result}</b></h1>`
            else reviewSubmit. innerHTML = '<h1>Submition failed</h1>'
          } catch (error) {
            console.log(error);
          }
          
        })
        reviewSubmit.append(submit)
    } else {
      const notvalid  = notValidForm()
      reviewSubmit.innerHTML = notvalid.map(msg => `<p>${msg}</p>`).join("<br>")
    }
})
