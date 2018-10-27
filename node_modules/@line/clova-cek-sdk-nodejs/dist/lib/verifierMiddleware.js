"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var body_parser_1 = require("body-parser");
var verifier_1 = require("./verifier");
function verifierMiddleware(config) {
    var _this = this;
    return function (req, res, next) {
        var signature = req.headers.signaturecek;
        var applicationId = config.applicationId;
        var process = function (rawBody) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var body, _a, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = Buffer.isBuffer(rawBody) ? rawBody.toString() : rawBody;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = req;
                        return [4 /*yield*/, verifier_1.default(signature, applicationId, body)];
                    case 2:
                        _a.body = _b.sent();
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        if (typeof req.body === 'string' || Buffer.isBuffer(req.body)) {
            return process(req.body);
        }
        body_parser_1.raw({ type: '*/*' })(req, res, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, process(req.body)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); });
    };
}
exports.default = verifierMiddleware;
//# sourceMappingURL=verifierMiddleware.js.map