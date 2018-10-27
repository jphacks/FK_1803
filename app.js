const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');

const clovaSkillHandler = clova.Client
  .configureSkill()

  //起動時に喋る
  .onLaunchRequest(responseHelper => {
    // まずはこっちをしゃべる
    responseHelper.setSimpleSpeech({
      lang: 'ja',
      type: 'PlainText',
      value: '忘れ物を探します',
    });

    // しばらく反応がなければこちらをしゃべる
    responseHelper.setSimpleSpeech({
      lang: 'ja',
      type: 'PlainText',
      value: '忘れ物を探しますか？登録しますか？'
    }, true);


  })

  // ユーザーからの発話が来たら反応する箇所
  // onSessionEndedRequestがなければここが呼ばれ続ける

  .onIntentRequest(async responseHelper => {
    const intent = responseHelper.getIntentName();
    const sessionId = responseHelper.getSessionId();

    console.log('Intent:' + intent);

    let continuous = {
      lang: 'ja',
      type: 'PlainText',
      value: 'まだ続けますか？'
    }

    console.log(responseHelper.getSessionAttributes())

    switch (intent) {
      case 'submit':
        responseHelper.setSimpleSpeech({
          lang: 'ja',
          type: 'PlainText',
          value: `登録しました。`
        })
        responseHelper.setSimpleSpeech(continuous, true)

        break;
      case 'answer':
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
        responseHelper.setSimpleSpeech(continuous, true)

        break;
      
      case 'otoja':
        responseHelper.setSimpleSpeech({
          lang: 'ja',
          type: 'PlainText',
          value: 'おとじゃです'
        })
        responseHelper.setSimpleSpeech(continuous, true)
        break;
    }

  })

  //終了時
  // .onSessionEndedRequest(responseHelper => {
  //   const sessionId = responseHelper.getSessionId();
  // })
  .handle();


const app = new express();
const port = process.env.PORT || 3000;

//リクエストの検証を行う場合。環境変数APPLICATION_ID(値はClova Developer Center上で入力したExtension ID)が必須
const clovaMiddleware = clova.Middleware({ applicationId: 'com.startfox.wasrenbo' });
app.post('/clova', clovaMiddleware, clovaSkillHandler);

app.listen(port, () => console.log(`Server running on ${port}`));
