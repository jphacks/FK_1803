"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var crypto_1 = require("crypto");
function checkSignature(certBody, signature, requestBody) {
    var veri = crypto_1.createVerify('RSA-SHA256');
    veri.update(requestBody, 'utf8');
    if (!veri.verify(certBody, signature, 'base64')) {
        throw new Error("Invalid signature: \"" + signature + "\".");
    }
}
function checkApplicationId(jsonRequestBody, applicationId) {
    if (jsonRequestBody.context.System.application.applicationId !== applicationId) {
        throw new Error("Invalid application id: " + applicationId + ".");
    }
}
function getCertificate() {
    return "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwiMvQNKD/WQcX9KiWNMb\nnSR+dJYTWL6TmqqwWFia69TyiobVIfGfxFSefxYyMTcFznoGCpg8aOCAkMxUH58N\n0/UtWWvfq0U5FQN9McE3zP+rVL3Qul9fbC2mxvazxpv5KT7HEp780Yew777cVPUv\n3+I73z2t0EHnkwMesmpUA/2Rp8fW8vZE4jfiTRm5vSVmW9F37GC5TEhPwaiIkIin\nKCrH0rXbfe3jNWR7qKOvVDytcWgRHJqRUuWhwJuAnuuqLvqTyAawqEslhKZ5t+1Z\n0GN8b2zMENSuixa1M9K0ZKUw3unzHpvgBlYmXRGPTSuq/EaGYWyckYz8CBq5Lz2Q\nUwIDAQAB\n-----END PUBLIC KEY-----";
}
function verifier(signature, applicationId, requestBody) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var certBody, jsonRequestBody;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!signature) {
                        throw new Error('Missing signature.');
                    }
                    if (!applicationId) {
                        throw new Error('Missing applicationId.');
                    }
                    if (!requestBody) {
                        throw new Error('Missing requestBody.');
                    }
                    return [4 /*yield*/, getCertificate()];
                case 1:
                    certBody = _a.sent();
                    checkSignature(certBody, signature, requestBody);
                    jsonRequestBody = JSON.parse(requestBody);
                    checkApplicationId(jsonRequestBody, applicationId);
                    return [2 /*return*/, jsonRequestBody];
            }
        });
    });
}
exports.default = verifier;
//# sourceMappingURL=verifier.js.map