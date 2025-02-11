export default class ResponseRow {
    constructor(parent, options = {}) {
        this.parent = parent;
        // Se utiliza window.userRole si está definido
        this.isAdmin = options.hasOwnProperty('isAdmin')
            ? options.isAdmin
            : ((window.userRole || 'guest') === 'admin');
    }

    add({id, brand, model, year, license_plate, engine_capacity, color, price, mileage, fuel_type, transmission_type, is_new, description}) {
        const tr = document.createElement('tr');

        // Se crean las celdas para cada dato
        const createCell = (value) => {
            const td = document.createElement('td');
            td.textContent = value;
            return td;
        };

        tr.appendChild(createCell(id));
        tr.appendChild(createCell(brand));
        tr.appendChild(createCell(model));
        tr.appendChild(createCell(year));
        tr.appendChild(createCell(license_plate));
        tr.appendChild(createCell(engine_capacity));
        tr.appendChild(createCell(color));
        tr.appendChild(createCell('$' + Number(price).toFixed(2)));
        tr.appendChild(createCell(mileage));
        tr.appendChild(createCell(fuel_type));
        tr.appendChild(createCell(transmission_type));
        tr.appendChild(createCell(is_new ? 'Yes' : 'No'));

        // Celda de acciones
        const actionCell = document.createElement('td');

        // Botón view siempre se muestra
        const buttonView = document.createElement('button');
        buttonView.textContent = 'view';
        buttonView.setAttribute('data-bs-toggle', 'modal');
        buttonView.setAttribute('data-bs-target', '#viewModal');
        buttonView.classList.add('btn', 'btn-primary', 'me-1');
        // Función para asignar dataset a un botón
        const assignDataset = (button) => {
            button.dataset.id = id;
            button.dataset.brand = brand;
            button.dataset.model = model;
            button.dataset.year = year;
            button.dataset.license_plate = license_plate;
            button.dataset.engine_capacity = engine_capacity;
            button.dataset.color = color;
            button.dataset.price = price;
            button.dataset.mileage = mileage;
            button.dataset.fuel_type = fuel_type;
            button.dataset.transmission = transmission_type;
            button.dataset.is_new = is_new;
        };
        assignDataset(buttonView);
        buttonView.dataset.method = "get";
        buttonView.dataset.url = "/product/" + id;
        actionCell.appendChild(buttonView);

        // Solo si es admin se muestran botones edit y delete
        if (this.isAdmin) {
            const buttonEdit = document.createElement('button');
            buttonEdit.textContent = 'edit';
            buttonEdit.setAttribute('data-bs-toggle', 'modal');
            buttonEdit.setAttribute('data-bs-target', '#editModal');
            buttonEdit.classList.add('btn', 'btn-warning', 'me-1');
            assignDataset(buttonEdit);
            buttonEdit.dataset.method = "put";
            buttonEdit.dataset.url = "/product/" + id;
            actionCell.appendChild(buttonEdit);

            const buttonDelete = document.createElement('button');
            buttonDelete.textContent = 'delete';
            buttonDelete.setAttribute('data-bs-toggle', 'modal');
            buttonDelete.setAttribute('data-bs-target', '#deleteModal');
            buttonDelete.classList.add('btn', 'btn-danger');
            assignDataset(buttonDelete);
            buttonDelete.dataset.method = "delete";
            buttonDelete.dataset.url = "/product/" + id;
            actionCell.appendChild(buttonDelete);
        }

        tr.appendChild(actionCell);
        this.parent.appendChild(tr);
    }
}
