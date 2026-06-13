const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  notify: (title, body) => ipcRenderer.send('notify', { title, body }),
  updateTray: (text) => ipcRenderer.send('tray-update', text),
  onResetSessions: (fn) => ipcRenderer.on('reset-sessions', fn),
});
