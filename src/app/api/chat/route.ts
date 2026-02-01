// app/api/chat/route.ts
import { NextRequest } from 'next/server';


const API_KEY = process.env.YANDEX_API_KEY!;
const FOLDER_ID = process.env.YANDEX_FOLDER_ID!;
const MODEL = process.env.YANDEXGPT_MODEL ?? 'yandexgpt-lite';
const BASE_URL = `https://rest-assistant.api.cloud.yandex.net/v1`; //process.env.YANDEXGPT_BASE_URL!;


export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, previousResponseId } = await req.json();

    console.log(`>>>>>>>>  messages :  `,  messages)
    console.log(`>>>>>>>>  BASE_URL :  `,  `${BASE_URL}/responses`)
    console.log(`>>>>>>>>  MODEL :  `,  `gpt://${FOLDER_ID}/${MODEL}/latest`)

    if (messages?.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Empty message' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // @TODO/FIX
    const input = messages[messages.length - 1]?.parts[0]?.text;
    console.log(`>>>>>>>>  INPUT :  `,  input)



    const res = await fetch(`${BASE_URL}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Api-Key ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        input,
        // для контекста диалога
        previous_response_id: previousResponseId ?? null,
        temperature: 0.5,
        max_output_tokens: 800,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('YandexGPT error:', res.status, text);
      return new Response(
        JSON.stringify({ error: 'YandexGPT request failed', details: text }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const data = await res.json();

    console.log(`>>>>>>>>  ANSWER :  `,  data)

    // Responses API: текст можно получить как output_text (см. доку) [web:169]
    const answer: string = data.output[0]?.content[0]?.text ?? ''; // @TODO/FIX
    const responseId: string = data.id;

    return new Response(
      JSON.stringify({ answer, responseId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error: any) {
    console.error('API /api/chat error', error);
    return new Response(
      JSON.stringify({ error: error?.message ?? 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
