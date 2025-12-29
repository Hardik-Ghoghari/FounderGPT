export default async function handler(req, res) {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { message } = body;

    // આપણે હવે Mistral વાપરીશું જે વધુ ઝડપી છે
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3", {
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ 
        inputs: message,
        parameters: { max_new_tokens: 500 }
      }),
    });

    const data = await response.json();

    // જો હજુ પણ સર્વર લોડ થતું હોય તો
    if (response.status === 503) {
      return res.status(503).json({ error: "AI is waking up... Try one last time in 10 seconds." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
