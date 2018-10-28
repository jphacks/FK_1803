const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');
const pg = require('pg');
// var pool = new pg.Pool();

const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: 'A2rzNxY4Vp0nhGlG6ZHCOlrr6wVxGsmWOeVcxYDKnDeCbI71+9qqz06TKtvkzV1gG4665DoKEeAQpss6SPAYJJiaXZjHsNacnfbI1jpME7Wuzm6hj8n1bC3egAQKvG7RfiNPACMK6AToNhD/w6f1GAdB04t89/1O/w1cDnyilFU='
});
// const userId = "Ubc575d55731711f84127f2230c79c526";



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

        client.pushMessage(userId,{
          type: 'text',
          text: slots.object + 'を' + slots.where + 'に置きました。'
        })
    
      //postgres DBに接続
      pg.connect(process.env.DATABASE_URL || "tcp://localhost:5432/mylocaldb", function(err, client, done) {
        console.log(err);
        console.log(client);
        console.log(done);
        if (err) {
          console.log('Connection Error:', err);
          throw err;
      } else {
        //INSERTの処理
        const insertSlots = responseHelper.getSlots();
        console.log(insertSlots.object);
        console.log(insertSlots.where);
        console.log(insertSlots.position);

        var qs = "INSERT INTO test (slot_object, slot_where, slot_position) VALUES(" +
        "'" + insertSlots.object + "'" + ", " + 
        "'" + insertSlots.where + "'" + ", " + 
        "'" + insertSlots.position + "'" + 
        ");";
        client.query(qs, function(err, result) {
          if(err) {
            console.log(err);
            throw err;
          }
        });
      }
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

        let speech = {
          lang: 'ja',
          type: 'PlainText',
          value: `${slots.object}は棚の上にあります。まだ続けますか？`
        }
        if (slots.area === undefined) {
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
// const clovaMiddleware = clova.Middleware({ applicationId: 'com.test.kiyokawa' });
const clovaMiddleware = clova.Middleware({ applicationId: 'com.startfox.wasrenbo' });

app.post('/clova', clovaMiddleware, clovaSkillHandler);

app.listen(port, () => console.log(`Server running on ${port}`));
