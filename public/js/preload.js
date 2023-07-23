const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('SQLite3', {
    "get_buildings": () => ipcRenderer.invoke('SQLite3/get_buildings'),
    "get_department_program": () => ipcRenderer.invoke('SQLite3/get_department_program'),
    "get_research_centre": () => ipcRenderer.invoke('SQLite3/get_research_centre'),
    "get_communication_method": () => ipcRenderer.invoke('SQLite3/get_communication_method'),
    "get_category": () => ipcRenderer.invoke('SQLite3/get_category'),
    "get_responsible": () => ipcRenderer.invoke('SQLite3/get_responsible'),
    "get_status": () => ipcRenderer.invoke('SQLite3/get_status'),
    "get_branch": () => {
        return ipcRenderer.invoke('SQLite3/get_branch')
    },
})
