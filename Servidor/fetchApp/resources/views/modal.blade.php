<div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="createModalLabel">Create Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="createForm">
                    <div class="mb-3">
                        <label for="createBrand" class="form-label">Brand</label>
                        <input type="text" class="form-control" id="createBrand" name="brand">
                    </div>
                    <div class="mb-3">
                        <label for="createModel" class="form-label">Model</label>
                        <input type="text" class="form-control" id="createModel" name="model">
                    </div>
                    <div class="mb-3">
                        <label for="createYear" class="form-label">Year</label>
                        <input type="number" class="form-control" id="createYear" name="year">
                    </div>
                    <div class="mb-3">
                        <label for="createLicensePlate" class="form-label">License Plate</label>
                        <input type="text" class="form-control" id="createLicensePlate" name="license_plate">
                    </div>
                    <div class="mb-3">
                        <label for="createEngineCapacity" class="form-label">Engine Capacity</label>
                        <input type="number" step="0.1" class="form-control" id="createEngineCapacity" name="engine_capacity">
                    </div>
                    <div class="mb-3">
                        <label for="createColor" class="form-label">Color</label>
                        <input type="text" class="form-control" id="createColor" name="color">
                    </div>
                    <div class="mb-3">
                        <label for="createPrice" class="form-label">Price</label>
                        <input type="number" step="0.01" class="form-control" id="createPrice" name="price">
                    </div>
                    <div class="mb-3">
                        <label for="createMileage" class="form-label">Mileage</label>
                        <input type="number" class="form-control" id="createMileage" name="mileage">
                    </div>
                    <div class="mb-3">
                        <label for="createFuelType" class="form-label">Fuel Type</label>
                        <input type="text" class="form-control" id="createFuelType" name="fuel_type">
                    </div>
                    <div class="mb-3">
                        <label for="createTransmission" class="form-label">Transmission</label>
                        <input type="text" class="form-control" id="createTransmission" name="transmission">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="createIsNew" name="is_new">
                        <label class="form-check-label" for="createIsNew">New?</label>
                    </div>
                </form>
            </div>
            <div class="alert alert-warning" role="alert" id="modalCreateWarning">An error occurred. The product has not been created.</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="modalCreateButton">Create</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="deleteForm">
                    <div class="mb-3">
                        <label for="deleteBrand" class="form-label">Brand</label>
                        <input type="text" readonly disabled class="form-control" id="deleteBrand" name="brand">
                    </div>
                    <div class="mb-3">
                        <label for="deleteModel" class="form-label">Model</label>
                        <input type="text" readonly disabled class="form-control" id="deleteModel" name="model">
                    </div>
                    <div class="mb-3">
                        <label for="deleteYear" class="form-label">Year</label>
                        <input type="number" readonly disabled class="form-control" id="deleteYear" name="year">
                    </div>
                    <div class="mb-3">
                        <label for="deleteLicensePlate" class="form-label">License Plate</label>
                        <input type="text" readonly disabled class="form-control" id="deleteLicensePlate" name="license_plate">
                    </div>
                    <div class="mb-3">
                        <label for="deleteEngineCapacity" class="form-label">Engine Capacity</label>
                        <input type="number" step="0.1" readonly disabled class="form-control" id="deleteEngineCapacity" name="engine_capacity">
                    </div>
                    <div class="mb-3">
                        <label for="deleteColor" class="form-label">Color</label>
                        <input type="text" readonly disabled class="form-control" id="deleteColor" name="color">
                    </div>
                    <div class="mb-3">
                        <label for="deletePrice" class="form-label">Price</label>
                        <input type="number" step="0.01" readonly disabled class="form-control" id="deletePrice" name="price">
                    </div>
                    <div class="mb-3">
                        <label for="deleteMileage" class="form-label">Mileage</label>
                        <input type="number" readonly disabled class="form-control" id="deleteMileage" name="mileage">
                    </div>
                    <div class="mb-3">
                        <label for="deleteFuelType" class="form-label">Fuel Type</label>
                        <input type="text" readonly disabled class="form-control" id="deleteFuelType" name="fuel_type">
                    </div>
                    <div class="mb-3">
                        <label for="deleteTransmission" class="form-label">Transmission</label>
                        <input type="text" readonly disabled class="form-control" id="deleteTransmission" name="transmission">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="deleteIsNew" name="is_new" disabled>
                        <label class="form-check-label" for="deleteIsNew">New?</label>
                    </div>
                </form>
            </div>
            <div class="alert alert-warning" role="alert" id="modalDeleteWarning">An error occurred. The product is still available.</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="modalDeleteButton">Delete</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="editModalLabel">Edit Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editForm">
                    <div class="mb-3">
                        <label for="editBrand" class="form-label">Brand</label>
                        <input type="text" class="form-control" id="editBrand" name="brand">
                    </div>
                    <div class="mb-3">
                        <label for="editModel" class="form-label">Model</label>
                        <input type="text" class="form-control" id="editModel" name="model">
                    </div>
                    <div class="mb-3">
                        <label for="editYear" class="form-label">Year</label>
                        <input type="number" class="form-control" id="editYear" name="year">
                    </div>
                    <div class="mb-3">
                        <label for="editLicensePlate" class="form-label">License Plate</label>
                        <input type="text" class="form-control" id="editLicensePlate" name="license_plate">
                    </div>
                    <div class="mb-3">
                        <label for="editEngineCapacity" class="form-label">Engine Capacity</label>
                        <input type="number" step="0.1" class="form-control" id="editEngineCapacity" name="engine_capacity">
                    </div>
                    <div class="mb-3">
                        <label for="editColor" class="form-label">Color</label>
                        <input type="text" class="form-control" id="editColor" name="color">
                    </div>
                    <div class="mb-3">
                        <label for="editPrice" class="form-label">Price</label>
                        <input type="number" step="0.01" class="form-control" id="editPrice" name="price">
                    </div>
                    <div class="mb-3">
                        <label for="editMileage" class="form-label">Mileage</label>
                        <input type="number" class="form-control" id="editMileage" name="mileage">
                    </div>
                    <div class="mb-3">
                        <label for="editFuelType" class="form-label">Fuel Type</label>
                        <input type="text" class="form-control" id="editFuelType" name="fuel_type">
                    </div>
                    <div class="mb-3">
                        <label for="editTransmission" class="form-label">Transmission</label>
                        <input type="text" class="form-control" id="editTransmission" name="transmission">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="editIsNew" name="is_new">
                        <label class="form-check-label" for="editIsNew">New?</label>
                    </div>
                </form>
            </div>
            <div class="alert alert-warning" role="alert" id="modalEditWarning">An error occurred. The product has not been edited.</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="modalEditButton">Edit</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="viewModal" tabindex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="viewModalLabel">View Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="viewForm">
                    <div class="mb-3">
                        <label for="viewId" class="form-label">Id</label>
                        <input disabled readonly type="text" class="form-control" id="viewId">
                    </div>
                    <div class="mb-3">
                        <label for="viewBrand" class="form-label">Brand</label>
                        <input disabled readonly type="text" class="form-control" id="viewBrand">
                    </div>
                    <div class="mb-3">
                        <label for="viewModel" class="form-label">Model</label>
                        <input disabled readonly type="text" class="form-control" id="viewModel">
                    </div>
                    <div class="mb-3">
                        <label for="viewYear" class="form-label">Year</label>
                        <input disabled readonly type="number" class="form-control" id="viewYear">
                    </div>
                    <div class="mb-3">
                        <label for="viewLicensePlate" class="form-label">License Plate</label>
                        <input disabled readonly type="text" class="form-control" id="viewLicensePlate">
                    </div>
                    <div class="mb-3">
                        <label for="viewEngineCapacity" class="form-label">Engine Capacity</label>
                        <input disabled readonly type="number" step="0.1" class="form-control" id="viewEngineCapacity">
                    </div>
                    <div class="mb-3">
                        <label for="viewColor" class="form-label">Color</label>
                        <input disabled readonly type="text" class="form-control" id="viewColor">
                    </div>
                    <div class="mb-3">
                        <label for="viewPrice" class="form-label">Price</label>
                        <input disabled readonly type="number" step="0.01" class="form-control" id="viewPrice">
                    </div>
                    <div class="mb-3">
                        <label for="viewMileage" class="form-label">Mileage</label>
                        <input disabled readonly type="number" class="form-control" id="viewMileage">
                    </div>
                    <div class="mb-3">
                        <label for="viewFuelType" class="form-label">Fuel Type</label>
                        <input disabled readonly type="text" class="form-control" id="viewFuelType">
                    </div>
                    <div class="mb-3">
                        <label for="viewTransmission" class="form-label">Transmission</label>
                        <input disabled readonly type="text" class="form-control" id="viewTransmission">
                    </div>
                    <div class="mb-3 form-check">
                        <input disabled readonly type="checkbox" class="form-check-input" id="viewIsNew">
                        <label class="form-check-label" for="viewIsNew">New?</label>
                    </div>
                    <div class="mb-3">
                        <label for="viewCreatedAt" class="form-label">Created At</label>
                        <input disabled readonly type="text" class="form-control" id="viewCreatedAt">
                    </div>
                    <div class="mb-3">
                        <label for="viewUpdatedAt" class="form-label">Updated At</label>
                        <input disabled readonly type="text" class="form-control" id="viewUpdatedAt">
                    </div>
                </form>
            </div>
            <div class="alert alert-warning" role="alert" id="modalViewWarning">An error occurred. Product not found.</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
