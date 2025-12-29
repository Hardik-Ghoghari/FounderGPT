export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // આ સૌથી લેટેસ્ટ અને ચાલતું સરનામું છે
    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct", {
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
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
