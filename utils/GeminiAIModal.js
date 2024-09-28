import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";


require('dotenv').config();



const api = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ;
export const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  maxOutputTokens: 2048,
  apiKey: api
});



export  const outputParser = new StringOutputParser();