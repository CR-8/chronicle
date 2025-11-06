import { ProvideLinksToolSchema } from '../../../lib/inkeep-qa-schema';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { convertToModelMessages, streamText } from 'ai';

export const runtime = 'edge';

// Configure AI provider based on environment variables
const AI_PROVIDER = process.env.AI_PROVIDER || 'groq'; // 'groq' or 'openrouter'

// Groq configuration
const groq = createOpenAICompatible({
  name: 'groq',
  apiKey: process.env.GROQ_API_KEY || '',
  baseURL: 'https://api.groq.com/openai/v1',
});

// OpenRouter configuration
const openrouter = createOpenAICompatible({
  name: 'openrouter',
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
});

// Select the provider and model
function getModel() {
  if (AI_PROVIDER === 'openrouter') {
    const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';
    return openrouter(model);
  }
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  return groq(model);
}

export async function POST(req: Request) {
  const reqJson = await req.json();

  const result = streamText({
    model: getModel(),
    tools: {
      provideLinks: {
        inputSchema: ProvideLinksToolSchema,
      },
    },
    messages: convertToModelMessages(reqJson.messages, {
      ignoreIncompleteToolCalls: true,
    }),
    toolChoice: 'auto',
  });

  return result.toUIMessageStreamResponse();
}
