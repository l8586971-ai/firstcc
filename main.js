const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, Notification } = require('electron');
const path = require('path');

let win, tray;
let isQuitting = false;

function createTrayIcon(text) {
  // draw a simple icon with timer text using nativeImage
  const size = 64;
  const canvas = Buffer.alloc(size * size * 4);
  for (let i = 0; i < canvas.length; i += 4) { canvas[i] = 26; canvas[i+1] = 26; canvas[i+2] = 46; canvas[i+3] = 255; }
  const img = nativeImage.createFromBuffer(canvas, { width: size, height: size });
  return img.resize({ width: 16, height: 16 });
}

function createWindow() {
  win = new BrowserWindow({
    width: 420,
    height: 620,
    resizable: false,
    frame: true,
    title: '番茄时钟',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('pomodoro.html');
  win.setMenuBarVisibility(false);

  win.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      win.hide();
    }
  });
}

function createTray() {
  tray = new Tray(createTrayIcon(''));
  tray.setToolTip('番茄时钟');

  const ctxMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: () => win.show() },
    { label: '重置计数', click: () => win.webContents.send('reset-sessions') },
    { type: 'separator' },
    { label: '退出', click: () => { isQuitting = true; app.quit(); } },
  ]);
  tray.setContextMenu(ctxMenu);
  tray.on('double-click', () => win.show());
}

// IPC: desktop notification from renderer
ipcMain.on('notify', (_e, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({ title, body }).show();
  }
});

// IPC: update tray title
ipcMain.on('tray-update', (_e, text) => {
  if (tray) tray.setTitle(text);
});

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {}); // don't quit on close
app.on('before-quit', () => { isQuitting = true; });
app.on('activate', () => { if (win) win.show(); });
