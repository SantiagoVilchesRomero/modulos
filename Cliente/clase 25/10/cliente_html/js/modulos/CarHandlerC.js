
export class CarHandlerC {

    constructor(url) {
        this._url = url;
        this._lastQueryStatus = null;
    }

    getAllCars(onSuccesCallBack, onErrorCallBack) {
        fetch(`${this._url}/`)
            .then((datos) => {
                datos.json().then((datos) => {
                    this._lastQueryStatus = true;
                    onSuccesCallBack(datos);
                }, (error) => {
                    this._lastQueryStatus = false;
                    onErrorCallBack('JSONException');
                })
            }, (error) => {
                this._lastQueryStatus = false;
                onErrorCallBack('ConnectionException');
            });
    }

    async getAllCarsV2() {
        let b = null;
        await fetch(`${this._url}/`)
            .then(async (datos) => {
                await datos.json().then((datos) => {
                    this._lastQueryStatus = true;
                    b = datos;
                }, (error) => {
                    this._lastQueryStatus = false;
                    return null;
                })
            }, (error) => {
                this._lastQueryStatus = false;
                return null;
            });
        return b;
    }
}