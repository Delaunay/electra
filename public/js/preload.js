const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('recipes', {
    "GetRecipes": (_) => ipcRenderer.invoke('SQLite3/GetRecipes'),
    "GetRecipeIngredients": (recipe) => {
        // console.log("preload", recipe)
        return ipcRenderer.invoke('SQLite3/GetRecipeIngredients', recipe)
    },
    "GetRecipeSteps": (recipe) => {
        console.log("preload:", recipe)
        return ipcRenderer.invoke('SQLite3/GetRecipeSteps', recipe)
    },
    "GetTables": (_) => {
        return ipcRenderer.invoke('SQLite3/GetTables')
    },
})
