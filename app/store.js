import { decorate, observable, action, configure } from "mobx";
configure({enforceActions: true})

class Store {
    hasCamera;
    barcodePicker;
    currentlyScanning;

    constructor() {
        this.hasCamera = false;
        this.barcodePicker = null;
        this.currentlyScanning = false;
    }

    setHasCamera(hasCamera) {
        this.hasCamera = hasCamera;
    }

    setBarcodePicker(barcodePicker) {
        this.barcodePicker = barcodePicker;
    }

    setCurrentlyScanning(currentlyScanning) {
        this.currentlyScanning = currentlyScanning;
    }
}

decorate(Store, {
    hasCamera: observable,
    barcodePicker: observable,
    currentlyScanning: observable,
    setHasCamera: action,
    setBarcodePicker: action,
    setCurrentlyScanning: action
});
  
const appStore = new Store();

export default appStore;
