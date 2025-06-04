import { OPENAI_KEY } from "./constants";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;
