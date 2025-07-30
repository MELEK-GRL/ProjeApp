import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export const makeChatRequest = async (messageText: string): Promise<string> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
Sen bir sağlık danışmanı asistansın.

Kullanıcı senden yalnızca tahlil sonuçları, EKG verileri, hastalıklar, ilaçlar, belirtiler ve sağlıkla ilgili diğer konularda yardım alabilir. Eğer kullanıcı bir PDF dosyasındaki tahlil veya EKG gibi içerikleri paylaşırsa, bunu detaylı şekilde açıklamalı ve sadeleştirilmiş tıbbi bilgiler sunmalısın.

Eğer kullanıcı sağlık dışı bir konuda soru sorarsa, şu yanıtı ver: 
'Üzgünüm, yalnızca sağlıkla ilgili konularda yardımcı olabilirim.'
                    `.trim(),
                },
                {
                    role: "user",
                    content: messageText,
                },
            ],
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log('--->response', response?.choices[0]?.message);
        console.log('---> Token kullanımı:', response.usage);

        return response.choices[0].message.content ?? "";
    } catch (error) {
        console.error("OpenAI API error:", error);
        return "Bir hata oluştu.";
    }
};
