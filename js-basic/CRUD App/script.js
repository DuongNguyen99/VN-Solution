let products = [ 
    { id: '1', product_name: 'Computer architecture', category: 'Computers', price: 125.60 },
    { id: '2', product_name: 'Asp.Net 4 blue book', category: 'Programming', price: 56.00 },
    { id: '3', product_name: 'popular Science', category: 'science', price: 210.40 },
]

const $ = document.querySelector.bind(document)

const productContainer = $('.product-container')
const submitContainer = $('.submit-container')
const buttonContainer = $('.button-container')
const searchContainer = $('.search-container')

const nameElement = $('input[id="name"]')
const categoryElement = $('input[id="category"]')
const priceElement = $('input[id="price"]')
let inputElements = [nameElement, categoryElement, priceElement]

function getParent(element, selector) {
    while (element.parentNode) {
        if (element.parentNode.matches(selector)) return element.parentNode
        element = element.parentNode
    }
}
function createBtn() {
    let btn = document.createElement('input')
    btn.value = 'Create'
    btn.setAttribute('type', 'button')
    btn.setAttribute('id', 'create-btn')
    btn.setAttribute('onclick', 'crudApp.Create()')
    btn.classList.add('btn')
    buttonContainer.appendChild(btn)
    return btn
}
function searchInput() {
    let input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('class', 'search-input')
    input.setAttribute('placeholder', 'Name of product(s)')
    searchContainer.appendChild(input)
    return input
}
function searchBtn() {
    let btn = document.createElement('input')
    btn.value = "Search"
    btn.setAttribute('type', 'button')
    btn.setAttribute('id', 'search-btn')
    btn.setAttribute('onclick', 'crudApp.Search()')
    btn.classList.add('btn')
    searchContainer.appendChild(btn)
    return btn
} 
function cancelBtn() {
    let btn = document.createElement('input')
    btn.value = 'Cancel'
    btn.setAttribute('type', 'button')
    btn.setAttribute('id', 'cancel-btn')
    btn.setAttribute('onclick', 'crudApp.Cancel(this)')
    btn.classList.add('btn')
    buttonContainer.appendChild(btn)
    return btn
}
function updateBtn() { 
    let btn = document.createElement('input')
    btn.value = 'Update'
    btn.setAttribute('type', 'button')
    btn.setAttribute('id', 'update-btn')
    btn.setAttribute('onclick', 'crudApp.Update(this)') // this -> updateBtn
    btn.classList.add('btn-small')
    return btn    
}
function deleteBtn() {
    let btn = document.createElement('input')
    btn.value = 'Delete'
    btn.setAttribute('type', 'button')
    btn.setAttribute('id', 'delete-btn')
    btn.setAttribute('onclick', 'crudApp.Delete(this)') // this -> delBtn
    btn.classList.add('btn-small')
    return btn
}
function saveBtn() {
    let btn = document.createElement('input')
    btn.value = 'Save'
    btn.setAttribute('type', 'button')
    btn.setAttribute('id', 'save-btn')
    btn.setAttribute('onclick', 'crudApp.Save(this)') // this -> saveBtn
    btn.classList.add('btn-small')
    btn.classList.add('hidden')
    return btn
}

// Constructor function
const crudApp = new function() {  
    this.header = []
    
    for (let i = 0; i < products.length; i++) {
        for (let key in products[i]) {
            if (this.header.indexOf(key) === -1) this.header.push(key)
        }
    }
    // Create table
    let table = document.createElement('table')
    table.setAttribute('id', 'product-table')
    productContainer.appendChild(table)
    
    // Create header
    let headerRow = table.createTHead()  
    this.header.forEach( (item) => {
        let headerCell = document.createElement('th')
        headerCell.innerHTML = item.replace('_', ' ')
        headerCell.classList.add('p-10')
        headerCell.style.textTransform = 'capitalize'
        headerRow.appendChild(headerCell)
    })
    table.appendChild(headerRow) 

    // Create body
    let bodyRows = table.createTBody()

    //* ----------------------------------------------------------------------
    this.clearTable = function() {
        for (let i = table.rows.length - 1; i >= 0; i--) {
            table.deleteRow(i)
        }
    }
    this.renderTable = function(products) { // this -> crudApp
         // Create table
        for (let i = 0; i < products.length; i++) {
            let itemRow = bodyRows.insertRow(-1)

            for (let j = 0; j < this.header.length; j++) {
                itemCell = itemRow.insertCell(-1)
                itemCell.innerHTML = products[i][this.header[j]]
                itemCell.classList.add('p-10')
                itemCell.style.textTransform = 'capitalize'
                itemRow.appendChild(itemCell)
            }

            this.buttonCell = itemRow.insertCell(-1) // this -> renderTable
            this.buttonCell.appendChild(updateBtn()) 
            
            this.buttonCell = itemRow.insertCell(-1) // this -> renderTable
            this.buttonCell.appendChild(deleteBtn())
        }  
    }
    //* -----------------------------------------------------------------------
    createBtn()
    // Process: Clear table -> Update table ->  Render
    this.Create = function() {     
        this.clearTable()

        let newProduct = {}

        for (let i = 1; i < this.header.length; i++) {
            newProduct[this.header[i]] = inputElements[i-1].value
        }
        if (Object.keys(newProduct).length > 0) {
            // ID for new product
            newProduct[this.header[0]] = (products.length + 1).toString() 
            products.push(newProduct)
            // Clear input data
            for (let j = 0; j < inputElements.length; j++) {
                inputElements[j].value = ''
            }
        }
        this.renderTable(products)
    }  
    searchInput()
    searchBtn()
    this.Search = function() {
        
        const searchInput = $('.search-input')
        let productNames = products.map(product => product.product_name.toLowerCase())
        let searchNames = productNames.filter(productName => productName.indexOf(searchInput.value) > -1)
        let searchProducts = []
        
        products.forEach(product => {
            searchNames.forEach(searchName => { 
                if (product.product_name.toLowerCase() === searchName) searchProducts.push(product) 
            })   
        }) 
        
        this.clearTable()
        this.renderTable(searchProducts)     
    }
    cancelBtn()
    this.Cancel = function() {
        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].value = ''
        }
    }
    this.Update = function(btn) {
        // Replace update button by save button
        let activeRow = getParent(btn, 'tr')
        let activeCell = getParent(btn, 'td')
        let updateBtnIndex = activeCell.cellIndex 
        activeRow.deleteCell(updateBtnIndex)
        buttonCell = activeRow.insertCell(updateBtnIndex)
        buttonCell.appendChild(saveBtn()).classList.remove('hidden')

        for (let i = 1; i < this.header.length; i++) {
            let td = activeRow.getElementsByTagName('td')[i]
            let element = document.createElement('input')
            element.setAttribute('type', 'text')
            element.setAttribute('value', td.innerText)
            // element.setAttribute('style', 'outline="none')
            td.innerHTML = ''
            td.appendChild(element)
        }
    }
    this.Save = function(btn) {
        let activeRow = getParent(btn, 'tr')

        for (let i = 1; i < this.header.length; i++) { // Not change value of ID
            let td = activeRow.getElementsByTagName('td')[i]
            // Render modified value
            if (td.childNodes[0].getAttribute('type') === 'text') 
                products[activeRow.rowIndex][this.header[i]] = td.childNodes[0].value
        }
        this.clearTable()
        this.renderTable(products)
    }
    // Process: Update table -> Clear table -> Render
    this.Delete = function(btn) {
        let activeRow = getParent(btn, 'tr')  

        products.splice(activeRow.rowIndex, 1)
        table.deleteRow(activeRow.rowIndex)

        // Reset product ID
        for (let i = 0; i < products.length; i++) {
            products[i].id = i + 1
        }
        this.clearTable()
        this.renderTable(products)
    }
}

crudApp.renderTable(products)
