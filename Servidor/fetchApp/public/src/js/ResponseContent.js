import PageItem from './PageItem.js';
import ResponseRow from './ResponseRow.js';

export default class ResponseContent {

    constructor(content, paginationContent) {
        this.content = content;
        this.currentPage = 1;
        this.paginationContent = paginationContent;
        this.pageItem = new PageItem(this.paginationContent);
        const isAdmin = (window.userRole || 'guest') === 'admin';
        this.responseRow = new ResponseRow(this.content, { isAdmin });
    }

    cleanContent(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    setContent(result) {
        this.cleanContent(this.content);
        this.cleanContent(this.paginationContent);
    
        this.currentPage = result.products.current_page;
    
        // Create table element
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered', 'table-hover');
    
        // Create table header with the same columns as data
        const thead = document.createElement('thead');
        thead.classList.add('table-dark');
        const headerRow = document.createElement('tr');
        const headers = [
            'ID', 'Brand', 'Model', 'Year', 'License Plate',
            'Engine Capacity', 'Color', 'Price', 'Mileage',
            'Fuel Type', 'Transmission', 'New?', 'Actions'
        ];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // Create table body and update responseRow to use this new tbody
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        const isAdmin = (window.userRole || 'guest') === 'admin';
        this.responseRow = new ResponseRow(tbody, { isAdmin });
    
        // Sólo agregar botón "create" si es admin
        if (isAdmin) {
            const buttonCreate = document.createElement('button');
            buttonCreate.textContent = 'create';
            buttonCreate.setAttribute('data-bs-toggle', 'modal');
            buttonCreate.setAttribute('data-bs-target', '#createModal');
            buttonCreate.classList.add('btn', 'btn-success', 'mb-3');
            buttonCreate.dataset.url = "/product";
            buttonCreate.dataset.method = "post";
            this.content.appendChild(buttonCreate);
        }
    
        this.content.appendChild(table);
    
        // Add data rows
        result.products.data.forEach(element => {
            this.responseRow.add(element);
        });
    
        // Add pagination
        result.products.links.forEach(element => {
            this.pageItem.add(element, (data) => {
                this.setContent(data);
            });
        });
    }
}