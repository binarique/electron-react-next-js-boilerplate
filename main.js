// Modules to control application life and create native browser window
const { app, screen, BrowserWindow } = require('electron')
const path = require('path')
const serve = require("electron-serve");


const appServe = app.isPackaged ? serve({ directory: path.join(__dirname, "out") }) : null;

function createWindow() {
    // Get the primary display's size
    const displays = screen.getAllDisplays();
    const primaryDisplay = displays.find(display => display.bounds.x === 0 && display.bounds.y === 0) || displays[0];
    const { width, height } = primaryDisplay ? primaryDisplay.workAreaSize : { width: 800, height: 600 };
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: width, // 50% of the screen width
        height: height, // 50% of the screen height
        webPreferences: {
            webSecurity: false, // Disable web security
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Load the Vite dev server in development
    if (app.isPackaged) {
        appServe(mainWindow).then(() => {
            mainWindow.loadURL("app://-");
        });
    } else {
        mainWindow.loadURL('http://localhost:3000/');
        //  Dev tools
        mainWindow.webContents.openDevTools();
        mainWindow.webContents.on("did-fail-load", (e, code, desc) => {
            mainWindow.webContents.reloadIgnoringCache();
        });
    }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
