// alpha (+accents), "-" or "'" characters
const alphaWithDashAndQuote = /^[-|'|A-Za-z\u00C0-\u017F]+$/
const mobilePhone = /^04[7,8,9]{1}[0-9]{7}/
module.exports = {
  alphaWithDashAndQuote: alphaWithDashAndQuote,
  mobilePhone: mobilePhone
}
