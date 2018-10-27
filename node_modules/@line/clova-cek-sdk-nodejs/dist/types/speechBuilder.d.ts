import Clova from './types';
export declare class SpeechBuilder {
    static createSpeechText(value: string, lang?: Clova.SpeechLang): Clova.SpeechInfoText;
    static createSpeechUrl(value: string): Clova.SpeechInfoUrl;
    private static defaultLang;
    static DEFAULT_LANG: Clova.SpeechLang;
}
