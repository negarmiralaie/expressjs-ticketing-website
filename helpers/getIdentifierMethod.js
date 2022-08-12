const getIdentifierMethod = (identifier) => (identifier.indexOf('@') > -1 ? 'email' : 'phoneNumber');

module.exports = getIdentifierMethod;
