const { useMultiFileAuthState, BufferJSON } = require("@adiwajshing/baileys");
const fs = require('fs');

module.exports = class Authentication {
  constructor(sessionId) {
    this.sessionId = sessionId;
  }

  getAuthFromDatabase = async () => {
    // 1. Check karo agar session folder nahi hai aur config mein string hai
    if (!fs.existsSync('./session/creds.json') && global.sessionString) {
      try {
        console.log("Decoding Session String and Creating Local Files...");
        const sessionData = JSON.parse(
          Buffer.from(global.sessionString, 'base64').toString('utf-8'),
          BufferJSON.reviver
        );

        if (!fs.existsSync('./session')) fs.mkdirSync('./session');

        // Creds save karna (Local storage start)
        fs.writeFileSync('./session/creds.json', JSON.stringify(sessionData.creds, null, 2));
        console.log("Session files created! Bot will now use local storage.");
      } catch (e) {
        console.log("Invalid Session String or Error in decoding!");
      }
    }

    // 2. Ab bot hamesha local file use karega
    const { state, saveCreds } = await useMultiFileAuthState('session');

    return {
      state,
      saveState: saveCreds,
      clearState: async () => {
        if (fs.existsSync('./session')) fs.rmSync('./session', { recursive: true });
      }
    };
  };
};