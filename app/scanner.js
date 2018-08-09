import * as ScanditSDK from "scandit-sdk";

import Store from './store';

const createScanner = async () => {
    await ScanditSDK.configure(
    'AU7LowRPGFFCH8IGEB+cCNsB24iwEyC642vuampcjmQDYpDYYWnCRTBk9Ghhe1rT5DEJRwdtQYvacZsev2yFq5ZEW2H1EKdX7XimIkpicFiVd9eSQWQO84gt5qSrSV+MGFcmcTAwRF6MXFlZpH3S3w4QfulJWfMs79xC7aRcSROMXSKJYoRzUhCnPzXrrT8Ei6j1W868b+ZjUJeKyP22zDRpmkTOEZAweTD5xhfjq7H5sbcLXwz0qRJiQ2Otx7b0mrUGzodvcH2uXyi2zUu9A/MA/KFuM28joPSpxDKnUjF73YwmlOgPxRpl8lHDnB4LcZfaPXsXaDoCOxlCx4kbdnEiqnKffTIGatfyQ9reWLfeBQIK1JI9Vo54hPGlzsy+CuL89fiDgvNCi6SlyqSVj2a6IL1JXZ1/mdWLhyfXJDO7TC/476YYGBkEHhtXUdRq/2WY65X59C5k9IwcKmuDZ7pQB+PgJ4PIZRjTidX5UhIY3Jl4eqZ49VWS/lDH/Q6YrRwjQwZy6D5X5Xh2PnoxsPW0mH0VsJzkcu5LCIdzEWtb1wEyKpacqTc4YEjhzrA7IpxcLr8Mg5OVSKrVr61L74ZOABHfl8xiQGt11JNOW60hB540pouci+VoLQVQdkt8tU5ln4nVDP31JzUXkUsng8527myOcMxAaOCknfxsfMYcF3V9eJ6bPFpAjG2kzBGymj7bOIfBv1HCHMncN0ADz18hnu9cUpctugVyhbhho+x2MJOTq7VT33mDSCgL8fXnMST4WFX+/XIV6G1xyiv+pGHCsLewWJizCBqkVPXXb1QeJLjbhr7jazbaPAWIAu59995c',
    {
        engineLocation: "/static/",
        preloadEngineLibrary: true,
        preloadCameras: true
    });

    try {
        const cameras = await ScanditSDK.CameraAccess.getCameras();
        if (cameras.length === 0) {
            Store.setHasCamera(false);
            return;
        }
    } catch (err) {
        Store.setHasCamera(false);
        return;
    }
    
    Store.setHasCamera(true);
    const barcodePicker = await ScanditSDK.BarcodePicker.create(
        document.getElementById("scandit-barcode-picker"),
        {
            playSoundOnScan: true,
            vibrateOnScan: true
        }
    );

    barcodePicker.pauseScanning();

    barcodePicker.startScanning = function (symbology, callback) {
        const scanSettings = new ScanditSDK.ScanSettings({
            codeDuplicateFilter: 1000,
            enabledSymbologies: [ symbology ]
        });
        const code39SymbologySettings = scanSettings.getSymbologySettings('code39');
        code39SymbologySettings.setActiveSymbolCounts([ 6 ]);

        this.applyScanSettings(scanSettings);

        this.resumeScanning();
        Store.setCurrentlyScanning(true);
        this.onScan((scanResult) => {
            this.pauseScanning();
            Store.setCurrentlyScanning(false);
            callback(scanResult.barcodes[0].data);
        }, true);
    }.bind(barcodePicker);

    barcodePicker.stopScanning = function() {
        barcodePicker.eventEmitter._events.scan = undefined;
        Store.setCurrentlyScanning(false);
    }.bind(barcodePicker);

    Store.setBarcodePicker(barcodePicker);
};

export default createScanner;
