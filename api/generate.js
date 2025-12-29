export default async function handler(req, res) {
  // માત્ર POST રિક્વેસ્ટ સ્વીકારવી
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Vercel માં રિક્વેસ્ટ બોડી ક્યારેક સ્ટ્રિંગ હોઈ શકે છે
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { message } = body;

    if (!process.env.HF_TOKEN) {
      return res.status(500).json({ error: "HF_TOKEN is missing in Vercel Settings!" });
    }

    // Hugging Face સાથે વાતચીત
    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct", {
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: message }),
    });

    const data = await response.json();

    // જો મોડેલ લોડ થઈ રહ્યું હોય તો
    if (response.status === 503) {
      return res.status(503).json({ error: "AI is warming up... Try again in 20 seconds." });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
}
