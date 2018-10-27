const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');

const clovaSkillHandler = clova.Client
  .configureSkill()

  //起動時に喋る
  .onLaunchRequest(responseHelper => {
    responseHelper.setSimpleSpeech({
      lang: 'ja',
      type: 'PlainText',
      value: '忘れ物を探します',
    });
  })

  //ユーザーからの発話が来たら反応する箇所
  .onIntentRequest(async responseHelper => {
    const intent = responseHelper.getIntentName();
    const sessionId = responseHelper.getSessionId();

    console.log('Intent:' + intent);

    if (intent === 'otoja') {
      responseHelper.setSimpleSpeech({
        lang: 'ja',
        type: 'PlainText',
        value: 'おとじゃです'
      })
    }


    if (intent === 'submit') {
      responseHelper.setSimpleSpeech({
        lang: 'ja',
        type: 'PlainText',
        value: `登録しました。`
      })
    }
    if (intent === 'answer') {
      const slots = responseHelper.getSlots();
      console.log(slots);
      console.log(slots.object);
      let speech = {
        lang: 'ja',
        type: 'PlainText',
        value: `${slots.object}は棚の上にあります。`
      }
      if (slots.area === '') {
        speech.value = `捜し物の場所は登録されていません。`
      }
      responseHelper.setSimpleSpeech(speech);
      responseHelper.setSimpleSpeech(speech, true);
    }
  })

  //終了時
  .onSessionEndedRequest(responseHelper => {
    const sessionId = responseHelper.getSessionId();
    responseHelper.setSimpleSpeech("わすれんぼを終わります");
  })
  .handle();


const app = new express();
const port = process.env.PORT || 3000;

//リクエストの検証を行う場合。環境変数APPLICATION_ID(値はClova Developer Center上で入力したExtension ID)が必須
const clovaMiddleware = clova.Middleware({ applicationId: 'com.startfox.wasrenbo' });
app.post('/clova', clovaMiddleware, clovaSkillHandler);

app.listen(port, () => console.log(`Server running on ${port}`));
