import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export const makeChatRequest = async (messageText: string): Promise<string> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: messageText }],
            temperature: 0.7,       // 0 ile 1 arasında, çıktı yaratıcılığı kontrolü
            max_tokens: 150,        // maksimum çıktı token sayısı
            top_p: 1,               // nucleus sampling parametresi
            frequency_penalty: 0,   // tekrar eden ifadeleri azaltır
            presence_penalty: 0,    // yeni konuları teşvik eder
        });
        console.log('--->response', response?.choices[0]?.message)
        console.log('---> Token kullanımı:', response.usage);
        return response.choices[0].message.content ?? "";
    } catch (error) {
        console.error("OpenAI API error:", error);
        return "Bir hata oluştu.";
    }
};
