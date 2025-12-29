export default async function handler(req, res) {
  try {
    const { message } = req.body;

    // હગિંગ ફેસનું નવું 'Router' URL જે ૨૦૨૫ માં ફરજિયાત છે
    const response = await fetch("https://router.huggingface.co/hf-chat/v1/chat/completions", {
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.3", // આ મોડેલ સૌથી સ્ટેબલ છે
        messages: [{ role: "user", content: message }],
        max_tokens: 800
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
