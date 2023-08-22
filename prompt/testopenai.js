const openai = require("openai");

openai.apiKey = ""
openai.completions.create({
    model: "text-davinci-002",
    prompt: "Once upon a time",
    temperature: 0.5
}).then((response) => {
    // do something with the response
});