const { ChatOpenAI } = require("langchain/chat_models/openai");
const { HumanChatMessage, SystemChatMessage } = require("langchain/schema");
const { LLMChain } = require("langchain/chains");
const { PromptTemplate } = require("langchain/prompts");
const config = require("../prompt/config")

//https://js.langchain.com/docs/expression_language/cookbook/prompt_llm_parser

const model = new ChatOpenAI({
    openAIApiKey: config.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    timeout: 10000,
}, { basePath: config.OPENAI_API_BASE_PATH }
);

const prompt = PromptTemplate.fromTemplate(`{subject}`);


const functionSchema = [
    {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
            type: "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g. San Francisco, CA"
                },
                "unit": {
                    "type": "string",
                    "enum": [
                        "celsius",
                        "fahrenheit"
                    ]
                }
            },
            "required": [
                "location"
            ]
        },
    },
    {
        name: "joke",
        description: "A joke",
        parameters: {
            type: "object",
            properties: {
                setup: {
                    type: "string",
                    description: "The setup for the joke",
                },
                punchline: {
                    type: "string",
                    description: "The punchline for the joke",
                },
            },
            required: ["setup", "punchline"],
        },
    },
];

const chain = prompt.pipe(
    model.bind({
        functions: functionSchema,
        // function_call: { name: "joke" },
    })
);


async function main() {

    // const result = await chain.invoke({ subject: "Tell me a joke about Singapore" });
    const result = await chain.invoke({ subject: "What is the weather like in Singapore" });


    console.log(result);
}

main().catch((error) => {
    console.error(error);
});