const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');
const line = require('line-bot-sdk');

const client = line.client({
    //Messaging APIのアクセストークン
    channelID: '1617995270',
  channelSecret: 'ac5ed545f83f3d4cedd4f510ee2fd429',
  channelToken: "6stEM2pVNUf9zymbATj8zFo+S0t1kGvji07+fLafd7Url4A7zWPt4sibrHMiIg2cBM6RNIObdGiJQ49HNgbLTKMWEnFk3ek6c9HFujOe9FrDjqql6tMFkQBkWjWJ14su9v439IiS6Y+sWmL/0G79sgdB04t89/1O/w1cDnyilFU=" 
});
const clovaSkillHandler = clova.Client
  .configureSkill()

  //起動時に喋る
  .onLaunchRequest(responseHelper => {

    responseHelper.setSessionAttributes({});    

    // まずはこっちをしゃべる
    responseHelper.setSimpleSpeech({
      lang: 'ja',
      type: 'PlainText',
      value: 'ものを登録または検索します。',
    });

    // しばらく反応がなければこちらをしゃべる
    responseHelper.setSimpleSpeech({
      lang: 'ja',
      type: 'PlainText',
      value: '〜は〜に置いた、〜はどこ？と話しかけてください。'
    }, true);


  })

  // ユーザーからの発話が来たら反応する箇所
  // onSessionEndedRequestがなければここが呼ばれ続ける

  .onIntentRequest(async responseHelper => {
    const intent = responseHelper.getIntentName();
    const sessionId = responseHelper.getSessionId();
    const userId = responseHelper.getUser().userId;


    console.log('Intent:' + intent);

    let continuous = {
      lang: 'ja',
      type: 'PlainText',
      value: 'まだ続けますか？'
    }

    if(responseHelper.getSessionAttributes().subsequent === true){
      console.log("Success!")
    }
    console.log(responseHelper.getSessionAttributes())
    const slots = responseHelper.getSlots();

    switch (intent) {
      case 'submit':
        client.pushMessage(userId, {
          type: 'text',
          text: slots.object + 'を'　+ slots.where + 'におきました。'
        });
      
        responseHelper.setSimpleSpeech({
          lang: 'ja',
          type: 'PlainText',
          value: '登録しました。まだ続けますか？'
        })

        responseHelper.setSessionAttributes({
          subsequent: true
        })


        // responseHelper.setSimpleSpeech(continuous, true)

        break;
      case 'answer':
        // const slots = responseHelper.getSlots();

        client.sendText('<target mid>', 'Message');

        client.pushMessage(userId, {
          type: 'text',
          text: slots.object + 'をさがしました。'
        });

        let speech = {
          lang: 'ja',
          type: 'PlainText',
          value: `${slots.object}は棚の上にあります。まだ続けますか？`
        }
        if (slots.area === '') {
          speech.value = '捜し物の場所は登録されていません。まだ続けますか？'
        }
        responseHelper.setSimpleSpeech(speech);
        responseHelper.setSimpleSpeech(continuous, true);

        responseHelper.setSessionAttributes({
          subsequent: true
        });

        break;
      
      case 'Clova.YesIntent':
        if (responseHelper.getSessionAttributes().subsequent === true){
          responseHelper.setSimpleSpeech({
            lang: 'ja',
            type: 'PlainText',
            value: '忘れ物を探しますか？登録しますか？'
          });

          responseHelper.setSimpleSpeech(continuous, true);

        }
        break;
      
      case 'Clova.NoIntent':
        if (responseHelper.getSessionAttributes().subsequent === true){

        responseHelper.setSimpleSpeech({
            lang: 'ja',
            type: 'PlainText',
            value: 'さようなら'
        });


         responseHelper.endSession();
        }
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
