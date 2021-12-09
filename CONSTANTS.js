var exports = module.exports = {};


exports.GATEWAY_HOST = GATEWAY_HOST = 'localhost:';
exports.GATEWAY_PORT = GATEWAY_PORT = process.env.PORT || 3000;
exports.GATEWAY_ENDPOINT = GATEWAY_ENDPOINT = 'http://' + GATEWAY_HOST + GATEWAY_PORT;

return module.exports;