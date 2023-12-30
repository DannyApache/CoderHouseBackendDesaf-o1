const socket = io()
const mainDiv = document.getElementById('mainRealTimeProducts')
let table = null
let thead = null
let tbody = null
socket.on('enviarProductos', data=>{
    const array = data.dato    
    console.log(array)
    console.log(mainDiv.children)

     if(table != null){
         mainDiv.removeChild(table)
     }

    table = document.createElement("table")
    thead = document.createElement("thead")
    tbody = document.createElement("tbody")
    console.log(table)

    const headerRow = document.createElement("tr")
    
    const idHeader = document.createElement("th")
    idHeader.textContent = "ID"
    headerRow.appendChild(idHeader)

    const titleHeader = document.createElement("th")
    titleHeader.textContent = "Título"
    headerRow.appendChild(titleHeader)

    const descriptionHeader = document.createElement("th")
    descriptionHeader.textContent = "Descripción"
    headerRow.appendChild(descriptionHeader)

    const priceHeader = document.createElement("th")
    priceHeader.textContent = "Precio"
    headerRow.appendChild(priceHeader)

    thead.appendChild(headerRow)

    array.forEach(value => {
        const row = document.createElement("tr")
        const idCell = document.createElement("td")
        idCell.textContent = value.id
        row.appendChild(idCell)
    
        const titleCell = document.createElement("td")
        titleCell.textContent = value.title
        row.appendChild(titleCell)

        const descriptionCell = document.createElement("td")
        descriptionCell.textContent = value.description
        row.appendChild(descriptionCell)
    
        const priceCell = document.createElement("td")
        priceCell.textContent = value.price
        row.appendChild(priceCell)
        tbody.appendChild(row)
    })

    table.appendChild(thead)
    table.appendChild(tbody)

    mainDiv.appendChild(table)

})

