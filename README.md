Yapay Zekâ Destekli Sağlık Asistanı Backend Servisi

Bu projede, OpenAI API kullanarak sağlık verileriyle (özellikle PDF tahlil dosyaları) etkileşime giren bir yapay zekâ destekli sağlık asistanı geliştirilmiştir. 
Kullanıcıların PDF olarak yüklediği tahlil verileri veya metin tabanlı sağlık soruları alınarak, OpenAI tarafından analiz edilir ve açıklayıcı geri bildirim sağlanır.

Kullanılan Teknolojiler ve Kütüphaneler
Node.js & Express – HTTP sunucusu ve REST endpoint'leri için

OpenAI SDK – GPT-4o ve GPT-4o-mini modelleri ile yanıt üretimi

Multer (şu anda kullanılmıyor ama PDF için hazır) – Dosya yüklemeye uygun yapı için

pdf-parse – Base64 formatında gelen PDF'lerin metne dönüştürülmesi

dotenv – .env dosyasından OpenAI API anahtarının yönetilmesi

CORS – Güvenli frontend–backend iletişimi için

Yarn – Paket yönetimi

PDF yükleme ve OpenAI ile tahlil yorumu alma

Sadece sağlık konularına izin veren konu filtresi

GPT-4o ile medikal veri analizi ve yanıt üretimi

Backend güvenliği için dosya boyutu ve konu kontrolü


