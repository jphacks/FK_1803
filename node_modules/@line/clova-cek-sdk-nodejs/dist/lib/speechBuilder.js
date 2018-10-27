"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpeechBuilder = /** @class */ (function () {
    function SpeechBuilder() {
    }
    SpeechBuilder.createSpeechText = function (value, lang) {
        return {
            lang: lang || SpeechBuilder.DEFAULT_LANG,
            type: 'PlainText',
            value: value,
        };
    };
    SpeechBuilder.createSpeechUrl = function (value) {
        return {
            lang: '',
            type: 'URL',
            value: value,
        };
    };
    Object.defineProperty(SpeechBuilder, "DEFAULT_LANG", {
        get: function () {
            return SpeechBuilder.defaultLang;
        },
        set: function (lang) {
            SpeechBuilder.defaultLang = lang;
        },
        enumerable: true,
        configurable: true
    });
    SpeechBuilder.defaultLang = 'ja';
    return SpeechBuilder;
}());
exports.SpeechBuilder = SpeechBuilder;
//# sourceMappingURL=speechBuilder.js.map