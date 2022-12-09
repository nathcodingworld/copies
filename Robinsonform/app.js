const modalBody = document.querySelector("#confirmModal .modal-body")
const modalFooter = document.querySelector("#confirmModal .modal-footer")
const modalheader = document.querySelector("#confirmModal .modal-header")
const listingBody = document.querySelector("#crud-table tbody")
let listing

(async ()=>{
  try {
    const res = await fetch("server.php?type=read")
    // const res = await fetch("data.json")
    listing = await res.json()
    listing.forEach(list=>{
      const tr = document.createElement("tr")
      tr.setAttribute("class", `rowid${list.id}`)
      tr.innerHTML = `
      <td  scope="row">${list.id}</td>
      <td >${list.fname}</td>
      <td >${list.lname}</td>
      <td >${list.email}</td>
      <td >${list.phone}</td>
      <td >
        <button class="btn btn-outline-primary" data-to="${list.id}" data-bs-toggle="modal" data-bs-target="#confirmModal"  onclick="updateHandler(${list.id})"><i class="bi bi-pencil-square" ></i></button>
        <button class="btn btn-outline-danger" data-to="${list.id}" data-bs-toggle="modal" data-bs-target="#confirmModal"  onclick="deleteHandler(${list.id})"><i class="bi bi-trash3-fill"></i></button>
      </td>
      `
      listingBody.append(tr)
    })
  } catch (error) {
    console.log(error);
  }
})()


function deleteHandler(id) {
    modalheader.querySelector("h5").innerText = "Delete User"
    modalBody.innerHTML = `<p>Are you sure you want to delete this User id${id}?</p>`
    modalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-danger delbtn">Delete</button>
    `
    const btn = modalFooter.querySelector(".delbtn")
    btn.addEventListener("click", ()=> {
      const finnish = loading()
      fetch(`server.php?delid=${id}`)
      .then(res=>res.json())
      .then(dt=>{
        listingBody.querySelector(`.rowid${id}`).remove()
        finnish()
      })
      .catch(err=>console.log(err))
    })
}
function createHandler(e) {
    modalheader.querySelector("h5").innerText = "Add User"
    modalBody.innerHTML = `
    <form class="row g-4 needs-validation createform" novalidate>
    <div class="col-md-4">
      <label for="addfname" class="form-label">First name</label>
      <input type="text" class="form-control" id="addfname"  required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-4">
      <label for="addmname" class="form-label">Middle name</label>
      <input type="text" class="form-control" id="addmname" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-4">
      <label for="addlname" class="form-label">Last name</label>
      <input type="text" class="form-control" id="addlname" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-12">
      <label for="address" class="form-label">Address</label>
      <input type="text" class="form-control" id="addaddress" required>
      <div class="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div class="col-md-6">
      <label for="phone" class="form-label">Phone</label>
      <input type="number" class="form-control" id="addphone" required>
      <div class="invalid-feedback">
        Please provide a phone number.
      </div>
    </div>
    <div class="col-md-6">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="addemail" required>
      <div class="invalid-feedback">
        Please provide a valid email address.
      </div>
    </div>
    <div class="col-md-6">
      <label for="income" class="form-label">Income</label>
      <input type="number" class="form-control" id="addincome" required>
      <div class="invalid-feedback">
        Please provide a valid income value.
      </div>
    </div>
    <div class="col-md-3">
      <label for="dataone" class="form-label">dataone</label>
      <input type="number" class="form-control" id="adddataone" required>
      <div class="invalid-feedback">
        Please provide a valid data.
      </div>
    </div>
    <div class="col-md-3">
      <label for="datatwo" class="form-label">datatwo</label>
      <input type="number" class="form-control" id="adddatatwo" required>
      <div class="invalid-feedback">
        Please provide a valid data.
      </div>
    </div>
    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
        <label class="form-check-label" for="invalidCheck">
          Agree to terms and conditions
        </label>
        <div class="invalid-feedback">
          You must agree before submitting.
        </div>
      </div>
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Submit form</button>
    </div>
  </form>
    `
    modalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    `

    const form = modalBody.querySelector(".needs-validation")
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity()) {
        const formdata =  new FormData()
        const fname = form.querySelector("#addfname").value
        const lname = form.querySelector("#addlname").value
        const email = form.querySelector("#addemail").value
        const phone = form.querySelector("#addphone").value
        const mname = form.querySelector("#addmname").value
        const income = form.querySelector("#addincome").value
        const addres = form.querySelector("#addaddress").value
        const dataone = form.querySelector("#adddataone").value
        const datatwo = form.querySelector("#adddatatwo").value
        formdata.append("fname", fname)
        formdata.append("mname", mname)
        formdata.append("lname", lname)
        formdata.append("phone", phone)
        formdata.append("email", email)
        formdata.append("income", income)
        formdata.append("addres", addres)
        formdata.append("dataone", dataone)
        formdata.append("datatwo", datatwo)
        formdata.append("type", "create")
        const finnish = loading(form, "Added")
        fetch("server.php", {
          method: "POST",
          body: formdata
        })
        .then(res=> res.json())
        .then(id=>{
          const tr = document.createElement("tr")
          tr.setAttribute("class", `rowid${id}`)
          tr.innerHTML = `
          <td  scope="row">${id}</td>
          <td >${fname}</td>
          <td >${lname}</td>
          <td >${email}</td>
          <td >${phone}</td>
          <td >
            <button class="btn btn-outline-primary" data-to="${id}" data-bs-toggle="modal" data-bs-target="#confirmModal"  onclick="updateHandler(${id})"><i class="bi bi-pencil-square" ></i></button>
            <button class="btn btn-outline-danger" data-to="${id}" data-bs-toggle="modal" data-bs-target="#confirmModal"  onclick="deleteHandler(${id})"><i class="bi bi-trash3-fill"></i></button>
          </td>
          `
          listingBody.append(tr)
          listing.push({id, fname, lname, email, phone, mname, addres, dataone, datatwo, income})
          console.log(listing);
          finnish()
        })
        .catch(err=>console.log(err))
      }
      form.classList.add('was-validated')
    }, false)
}



function loading(form = "", nm = "Delete"){
    modalheader.querySelector("button").style.display = "none"
    modalFooter.innerHTML = `
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    `
    if(form)  form.querySelector("button").style.display = "none"
    return () => {
      if(form)  form.querySelector("button").style.display = "block"
        modalheader.querySelector("button").style.display = "block"
        modalBody.innerHTML = `<p>Successfully ${nm}</p>`
        modalFooter.innerHTML = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
    }
}

function updateHandler(id) {
  const data = listing.filter(list =>list.id == id)[0]

  modalheader.querySelector("h5").innerText = "Add User"
    modalBody.innerHTML = `
    <form class="row g-4 needs-validation createform" novalidate>
    <div class="col-md-4">
      <label for="addfname" class="form-label">First name</label>
      <input type="text" class="form-control" id="addfname" value="${data.fname}" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-4">
      <label for="addmname" class="form-label">Middle name</label>
      <input type="text" class="form-control" id="addmname" value="${data.mname}" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-4">
      <label for="addlname" class="form-label">Last name</label>
      <input type="text" class="form-control" id="addlname" value="${data.lname}" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-12">
      <label for="address" class="form-label">Address</label>
      <input type="text" class="form-control" id="addaddress" value="${data.addres}" required>
      <div class="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div class="col-md-6">
      <label for="phone" class="form-label">Phone</label>
      <input type="number" class="form-control" id="addphone" value="${data.phone}" required>
      <div class="invalid-feedback">
        Please provide a phone number.
      </div>
    </div>
    <div class="col-md-6">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="addemail" value="${data.email}" required>
      <div class="invalid-feedback">
        Please provide a valid email address.
      </div>
    </div>
    <div class="col-md-6">
      <label for="income" class="form-label">Income</label>
      <input type="number" class="form-control" id="addincome" value="${data.income}" required>
      <div class="invalid-feedback">
        Please provide a valid income value.
      </div>
    </div>
    <div class="col-md-3">
      <label for="dataone" class="form-label">dataone</label>
      <input type="number" class="form-control" id="adddataone" value="${data.dataone}" required>
      <div class="invalid-feedback">
        Please provide a valid data.
      </div>
    </div>
    <div class="col-md-3">
      <label for="datatwo" class="form-label">datatwo</label>
      <input type="number" class="form-control" id="adddatatwo" value="${data.datatwo}" required>
      <div class="invalid-feedback">
        Please provide a valid data.
      </div>
    </div>
    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
        <label class="form-check-label" for="invalidCheck">
          Agree to terms and conditions
        </label>
        <div class="invalid-feedback">
          You must agree before submitting.
        </div>
      </div>
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Submit form</button>
    </div>
  </form>
    `
    modalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    `

    const form = modalBody.querySelector(".needs-validation")
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity()) {
        const formdata =  new FormData()
        const fname = form.querySelector("#addfname").value
        const lname = form.querySelector("#addlname").value
        const email = form.querySelector("#addemail").value
        const phone = form.querySelector("#addphone").value
        const mname = form.querySelector("#addmname").value
        const income = form.querySelector("#addincome").value
        const addres = form.querySelector("#addaddress").value
        const dataone = form.querySelector("#adddataone").value
        const datatwo = form.querySelector("#adddatatwo").value
        formdata.append("fname", fname)
        formdata.append("mname", mname)
        formdata.append("lname", lname)
        formdata.append("phone", phone)
        formdata.append("email", email)
        formdata.append("income", income)
        formdata.append("addres", addres)
        formdata.append("dataone", dataone)
        formdata.append("datatwo", datatwo)
        formdata.append("updateid", id.toString())
        const finnish = loading(form, "Update")
        fetch("server.php", {
          method: "POST",
          body: formdata
        })
        .then(res=> res.json())
        .then(dt=>{
          data.fname = fname
          data.mname = mname
          data.lname = lname
          data.phone = phone
          data.addres = addres
          data.dataone = dataone
          data.datatwo = datatwo
          data.income = income
          data.email = email
          listingBody.querySelector(`.rowid${id}`).innerHTML = `
          <td  scope="row">${id}</td>
          <td >${fname}</td>
          <td >${lname}</td>
          <td >${email}</td>
          <td >${phone}</td>
          <td >
            <button class="btn btn-outline-primary" data-to="${id}" data-bs-toggle="modal" data-bs-target="#confirmModal"  onclick="updateHandler(${id})"><i class="bi bi-pencil-square" ></i></button>
            <button class="btn btn-outline-danger" data-to="${id}" data-bs-toggle="modal" data-bs-target="#confirmModal"  onclick="deleteHandler(${id})"><i class="bi bi-trash3-fill"></i></button>
          </td>
          `
          finnish()
        })
        .catch(err=>console.log(err))
      }
      form.classList.add('was-validated')
    }, false)
}