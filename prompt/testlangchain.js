const { OpenAI } = require("langchain/llms/openai");
const { HumanChatMessage, SystemChatMessage } = require("langchain/schema");
const { LLMChain } = require("langchain/chains");
const { PromptTemplate } = require("langchain/prompts");
const config = require("./config")


const llm = new OpenAI({
    openAIApiKey: config.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo-0613",
    timeout: 5000,
}, { basePath: config.OPENAI_API_BASE_URL }
);
console.log(llm)

const prompt = PromptTemplate.fromTemplate("What is a good name for a company that makes {product}?");

const chain = new LLMChain({
    llm,
    prompt
});

async function main() {
    // const response = await llm.call([
    //     new SystemChatMessage(
    //         "You are a helpful assistant that translates English to French."
    //     ),
    //     new HumanChatMessage("Translate: I love programming."),
    // ]);
    // const result = await llm.predict("Translate this sentence from English to French. I love programming.")
    const result = await chain.run("111")

    console.log(result);
}

main().catch((error) => {
    console.error(error);
});