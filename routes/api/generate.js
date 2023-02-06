const {Configuration, OpenAIApi} = require("openai");

//API OPENAI CONFIGURATION
async function returnCorrect( text ){
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const openai = new OpenAIApi(configuration);

   const completion =  await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Correct this to standard Portuguese:" + text,
    max_tokens: 1000,

    });

    completionReturn = completion.data.choices[0].text;
    return completionReturn
}
module.exports = {returnCorrect}