import 'core-js/fn/object/values';
import Clova from './types';
/**
 * Create Context for clova response.
 *
 * @class ClientContext
 */
export declare class Context implements Clova.ClientContext {
    requestObject: Clova.RequestBody;
    responseObject: Clova.ResponseBody;
    constructor(req: Clova.RequestBody);
    /**
     * Set session end attributes for clova response.
     *
     * @memberOf Context
     */
    endSession(): void;
    /**
     * Get sessionId from clova request
     *
     * @memberOf Context
     */
    getSessionId(): string;
    /**
     * Get intent name from clova IntentRequest
     *
     * @memberOf Context
     */
    getIntentName(): string | null;
    /**
     * Get slots key-value pair from clova IntentRequest.
     *
     * @memberOf Context
     */
    getSlots(): {
        [key: string]: Clova.SlotValue;
    };
    /**
     * Get slot value for particular slot name from clova IntentRequest.
     *
     * @param {string} slotName
     * @memberOf Context
     */
    getSlot(slotName: string): Clova.SlotValue;
    /**
     * Get {Clova.User} from clova request
     *
     * @memberOf Context
     */
    getUser(): Clova.User;
    /**
     * Set outputSpeech content
     *
     * @param {Clova.OutputSpeech} outputSpeech
     * @param {boolean} reprompt
     * @memberOf Context
     */
    setOutputSpeech(outputSpeech: Clova.OutputSpeech, reprompt?: boolean): void;
    /**
     * Set reprompt content
     *
     * @param {Clova.OutputSpeech} outputSpeech
     * @memberOf Context
     */
    setReprompt(outputSpeech: Clova.OutputSpeech): void;
    /**
     * Set SimpleSpeech object for outputSpeech content.
     *
     * @param {Clova.SpeechInfoObject} speechInfo
     * @param {boolean} reprompt
     * @memberOf Context
     */
    setSimpleSpeech(speechInfo: Clova.SpeechInfoObject, reprompt?: boolean): this;
    /**
     * Set SpeechList object for outputSpeech content.
     *
     * @param {Clova.SpeechInfoObject[]} speechInfo
     * @param {boolean} reprompt
     * @memberOf Context
     */
    setSpeechList(speechInfo: Clova.SpeechInfoObject[], reprompt?: boolean): this;
    /**
     * Set SpeechSet object for outputSpeech content.
     *
     * @param {Clova.SpeechInfoObject} speechInfoBrief
     * @param {Clova.OutputSpeechListVerbose} speechInfoVerbose
     * @param {boolean} reprompt
     * @memberOf Context
     */
    setSpeechSet(speechInfoBrief: Clova.SpeechInfoObject, speechInfoVerbose: Clova.OutputSpeechVerbose, reprompt?: boolean): this;
    /**
     * Get sessionAttributes from clova request.
     *
     * @memberOf Context
     */
    getSessionAttributes(): object;
    /**
     * Set sessionAttributes for clova response.
     *
     * @memberOf Context
     */
    setSessionAttributes(sessionAttributes: object): void;
}
