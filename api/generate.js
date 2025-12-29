export default async function handler(req, res) {
  // માત્ર POST રિક્વેસ્ટ જ સ્વીકારવી
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // લખાણ મેળવવું
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { message } = body;

    // હગિંગ ફેસ સાથે વાતચીત
    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct", {
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ inputs: message }),
    });

    const data = await response.json();
    
    // જો હગિંગ ફેસ એરર આપે તો
    if (data.error) {
        return res.status(500).json({ error: data.error });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server Error: " + error.message });
  }
}
