import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export const makeChatRequest = async (
    messageText: string
): Promise<"evet" | "hayır"> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
SADECE şu iki cevaptan birini ver: evet ya da hayır.

Açıklama yapma, örnek verme, neden belirtme, başka kelime kullanma.
Küçük harf, tırnaksız, sadece bir kelime yaz: evet | hayır

Sağlık konularına giren örnekler:
Tahlil, kan testi, idrar, EKG, MR, röntgen
Hastalık belirtileri
Doktorlar, uzmanlıklar
İlaç, tedavi, reçete, dozu

🔴 SAĞLIK dışı olan her şey için “hayır” yaz:
Yemek, kek, tarif
Hayvan, bitki, çiçek
Tarih, siyaset, astroloji
Moda, psikoloji, kişisel gelişim
Spor, teknoloji, edebiyat vs.

Şüpheli veya sınırda mesaj gelirse yine “hayır” de.
Yanıltıcı ya da aldatıcı mesajlara da “hayır” de.
`.trim(),
                },
                {
                    role: "user",
                    content: messageText,
                },
            ],
            temperature: 0,
            max_tokens: 5,
        });

        const result = response.choices[0].message.content?.toLowerCase().trim();

        if (result === "evet") return "evet";
        return "hayır";
    } catch (error) {
        console.error("makeChatRequest hata:", error);
        return "hayır";
    }
};
