const { logPastelGreen, logPastelLavender, logPastelRed, logPastelYellow } = require('nstypocolors')

const logger = {
  log: message => logPastelGreen(`[LOG] ${message}`),
  sLog: message => logPastelLavender(`[SUCCESS] ${message}`),
  warn: message => logPastelYellow(`[WARN] ${message}`),
  error: message => logPastelRed(`[ERROR] ${message}`),
}

module.exports = { logger }
