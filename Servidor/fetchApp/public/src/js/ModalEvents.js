import HttpClient from './HttpClient.js';
import ResponseContent from './ResponseContent.js';

export default class ModalEvents {

    constructor(url, csrf) {
        this.url = url;
        this.csrf = csrf;

        this.content = document.getElementById('content');
        this.pagination = document.getElementById('pagination');
        this.responseContent = new ResponseContent(this.content, this.pagination);

        this.fetchUrl = '';
        this.httpClient = new HttpClient(this.url, this.csrf);

        this.modalCreate = document.getElementById('createModal');
        this.modalCreateButton = document.getElementById('modalCreateButton');

        this.modalDelete = document.getElementById('deleteModal');
        this.modalDeleteButton = document.getElementById('modalDeleteButton');

        this.modalEdit = document.getElementById('editModal');
        this.modalEditButton = document.getElementById('modalEditButton');

        this.modalView = document.getElementById('viewModal');

        this.createBrand = document.getElementById('createBrand');
        this.createModel = document.getElementById('createModel');
        this.createYear = document.getElementById('createYear');
        this.createLicensePlate = document.getElementById('createLicensePlate');
        this.createEngineCapacity = document.getElementById('createEngineCapacity');
        this.createColor = document.getElementById('createColor');
        this.createPrice = document.getElementById('createPrice');
        this.createMileage = document.getElementById('createMileage');
        this.createFuelType = document.getElementById('createFuelType');
        this.createTransmission = document.getElementById('createTransmission');
        this.createIsNew = document.getElementById('createIsNew');

        this.deleteBrand = document.getElementById('deleteBrand');
        this.deleteModel = document.getElementById('deleteModel');
        this.deleteYear = document.getElementById('deleteYear');
        this.deleteLicensePlate = document.getElementById('deleteLicensePlate');
        this.deleteEngineCapacity = document.getElementById('deleteEngineCapacity');
        this.deleteColor = document.getElementById('deleteColor');
        this.deletePrice = document.getElementById('deletePrice');
        this.deleteMileage = document.getElementById('deleteMileage');
        this.deleteFuelType = document.getElementById('deleteFuelType');
        this.deleteTransmission = document.getElementById('deleteTransmission');
        this.deleteIsNew = document.getElementById('deleteIsNew');

        this.editBrand = document.getElementById('editBrand');
        this.editModel = document.getElementById('editModel');
        this.editYear = document.getElementById('editYear');
        this.editLicensePlate = document.getElementById('editLicensePlate');
        this.editEngineCapacity = document.getElementById('editEngineCapacity');
        this.editColor = document.getElementById('editColor');
        this.editPrice = document.getElementById('editPrice');
        this.editMileage = document.getElementById('editMileage');
        this.editFuelType = document.getElementById('editFuelType');
        this.editTransmission = document.getElementById('editTransmission');
        this.editIsNew = document.getElementById('editIsNew');

        this.viewCreatedAt = document.getElementById('viewCreatedAt');
        this.viewId = document.getElementById('viewId');
        this.viewBrand = document.getElementById('viewBrand');
        this.viewModel = document.getElementById('viewModel');
        this.viewYear = document.getElementById('viewYear');
        this.viewLicensePlate = document.getElementById('viewLicensePlate');
        this.viewEngineCapacity = document.getElementById('viewEngineCapacity');
        this.viewColor = document.getElementById('viewColor');
        this.viewPrice = document.getElementById('viewPrice');
        this.viewMileage = document.getElementById('viewMileage');
        this.viewFuelType = document.getElementById('viewFuelType');
        this.viewTransmission = document.getElementById('viewTransmission');
        this.viewIsNew = document.getElementById('viewIsNew');
        this.viewUpdatedAt = document.getElementById('viewUpdatedAt');

        this.productError = document.getElementById('productError');
        this.productSuccess = document.getElementById('productSuccess');

        this.assignEvents();
    }

    assignEvents() {

        this.modalCreate.addEventListener('show.bs.modal', event => {
            document.getElementById('modalCreateWarning').style.display = 'none';
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.createBrand.value = '';
            this.createModel.value = '';
            this.createYear.value = '';
            this.createLicensePlate.value = '';
            this.createEngineCapacity.value = '';
            this.createColor.value = '';
            this.createPrice.value = '';
            this.createMileage.value = '';
            this.createFuelType.value = '';
            this.createTransmission.value = '';
            this.createIsNew.checked = false;
        });

        this.modalDelete.addEventListener('show.bs.modal', event => {
            this.createEngineCapacity.value = '';
            this.createColor.value = '';
            this.createPrice.value = '';
            this.createMileage.value = '';
            this.createFuelType.value = '';
            this.createTransmission.value = '';
            this.createIsNew.checked = false;
        });

        this.modalDelete.addEventListener('show.bs.modal', event => {
            document.getElementById('modalDeleteWarning').style.display= 'none';
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.deleteBrand.value = event.relatedTarget.dataset.brand;
            this.deleteModel.value = event.relatedTarget.dataset.model;
            this.deleteYear.value = event.relatedTarget.dataset.year;
            this.deleteLicensePlate.value = event.relatedTarget.dataset.license_plate;
            this.deleteEngineCapacity.value = event.relatedTarget.dataset.engine_capacity;
            this.deleteColor.value = event.relatedTarget.dataset.color;
            this.deletePrice.value = event.relatedTarget.dataset.price;
            this.deleteMileage.value = event.relatedTarget.dataset.mileage;
            this.deleteFuelType.value = event.relatedTarget.dataset.fuel_type;
            this.deleteTransmission.value = event.relatedTarget.dataset.transmission;
            this.deleteIsNew.checked = event.relatedTarget.dataset.is_new === "true";
        });

        this.modalEdit.addEventListener('show.bs.modal', event => {
            document.getElementById('modalEditWarning').style.display= 'none';
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.editBrand.value = event.relatedTarget.dataset.brand;
            this.editModel.value = event.relatedTarget.dataset.model;
            this.editYear.value = event.relatedTarget.dataset.year;
            this.editLicensePlate.value = event.relatedTarget.dataset.license_plate;
            this.editEngineCapacity.value = event.relatedTarget.dataset.engine_capacity;
            this.editColor.value = event.relatedTarget.dataset.color;
            this.editPrice.value = event.relatedTarget.dataset.price;
            this.editMileage.value = event.relatedTarget.dataset.mileage;
            this.editFuelType.value = event.relatedTarget.dataset.fuel_type;
            this.editTransmission.value = event.relatedTarget.dataset.transmission;
            this.editIsNew.checked = event.relatedTarget.dataset.is_new === "true";
        });

        this.modalView.addEventListener('show.bs.modal', event => {
            // Verifica que se haya disparado desde un botón
            if (!event.relatedTarget) {
                console.error("No se recibió event.relatedTarget");
                return;
            }
            console.log("Modal view triggered by:", event.relatedTarget);
            document.getElementById('modalViewWarning').style.display = 'none';
            // Limpia valores previos
            this.viewCreatedAt.value = '';
            this.viewId.value = '';
            // Asegura que se reciben los dataset
            this.viewBrand.value = event.relatedTarget.dataset.brand || '';
            this.viewModel.value = event.relatedTarget.dataset.model || '';
            this.viewYear.value = event.relatedTarget.dataset.year || '';
            this.viewLicensePlate.value = event.relatedTarget.dataset.license_plate || '';
            this.viewEngineCapacity.value = event.relatedTarget.dataset.engine_capacity || '';
            this.viewColor.value = event.relatedTarget.dataset.color || '';
            this.viewPrice.value = event.relatedTarget.dataset.price || '';
            this.viewMileage.value = event.relatedTarget.dataset.mileage || '';
            this.viewFuelType.value = event.relatedTarget.dataset.fuel_type || '';
            this.viewTransmission.value = event.relatedTarget.dataset.transmission || '';
            this.viewIsNew.checked = (event.relatedTarget.dataset.is_new === "true");
            this.viewUpdatedAt.value = '';
            
            const url = event.relatedTarget.dataset.url;
            this.httpClient.get(
                url,
                {},
                data => this.responseShow(data)
            );
        });

        this.modalCreateButton.addEventListener('click', event => {
            this.httpClient.post(
                this.fetchUrl,
                {
                    brand: this.createBrand.value,
                    model: this.createModel.value,
                    year: this.createYear.value,
                    license_plate: this.createLicensePlate.value,
                    engine_capacity: this.createEngineCapacity.value,
                    color: this.createColor.value,
                    price: this.createPrice.value,
                    mileage: this.createMileage.value,
                    fuel_type: this.createFuelType.value,
                    transmission_type: this.createTransmission.value,
                    is_new: this.createIsNew.checked,
                    page: this.responseContent.currentPage
                },
                data => this.responseCreate(data)
            );
        });

        this.modalDeleteButton.addEventListener('click', event => {
            this.httpClient.delete(
                this.fetchUrl,
                {
                    page: this.responseContent.currentPage
                },
                data => this.responseDelete(data));
        });

        this.modalEditButton.addEventListener('click', event => {
            this.httpClient.put(
                this.fetchUrl,
                {
                    brand: this.editBrand.value,
                    model: this.editModel.value,
                    year: this.editYear.value,
                    license_plate: this.editLicensePlate.value,
                    engine_capacity: this.editEngineCapacity.value,
                    color: this.editColor.value,
                    price: this.editPrice.value,
                    mileage: this.editMileage.value,
                    fuel_type: this.editFuelType.value,
                    transmission_type: this.editTransmission.value, 
                    is_new: this.editIsNew.checked,
                    page: this.responseContent.currentPage
                },
                data => this.responseEdit(data)
            );
        });
    }

    responseCreate(data) {
        if(data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalCreate).hide();
            this.responseContent.setContent(data);
            setTimeout(() => {
                this.productSuccess.style.display= 'none';
            }, 4000);
        } else {
            document.getElementById('modalCreateWarning').style.display = 'block';
        }
    }

    responseDelete(data) {
        if(data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalDelete).hide();
            this.responseContent.setContent(data);
            setTimeout(() => {
                this.productSuccess.style.display= 'none';
            }, 4000);
        } else {
            document.getElementById('modalDeleteWarning').style.display = 'block';
        }
    }

    responseEdit(data) {
        if(data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalEdit).hide();
            this.responseContent.setContent(data);
            setTimeout(() => {
                this.productSuccess.style.display= 'none';
            }, 4000);
        } else {
            document.getElementById('modalEditWarning').style.display = 'block';
        }
    }

    responseShow(data) {
        // Se cambia "transmission" por "transmission_type" según el objeto recibido
        const {id, brand, model, year, license_plate, engine_capacity, color, price, mileage, fuel_type, transmission_type, is_new, created_at, updated_at} = data.product;
        this.viewCreatedAt.value = created_at;
        this.viewId.value = id;
        this.viewBrand.value = brand;
        this.viewModel.value = model;
        this.viewYear.value = year;
        this.viewLicensePlate.value = license_plate;
        this.viewEngineCapacity.value = engine_capacity;
        this.viewColor.value = color;
        this.viewPrice.value = price;
        this.viewMileage.value = mileage;
        this.viewFuelType.value = fuel_type;
        // Asignar la transmission_type al campo correspondiente
        this.viewTransmission.value = transmission_type;
        this.viewIsNew.checked = is_new;
        this.viewUpdatedAt.value = updated_at;
    }

    init() {
        this.httpClient.get('/product',{}, (data) => {
            this.responseContent.setContent(data);
        });
    }
}