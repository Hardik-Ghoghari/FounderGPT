export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://router.huggingface.co/hf-chat/v1/chat/completions", {
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        messages: [{ role: "user", content: message }],
        max_tokens: 500
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
