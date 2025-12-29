export default async function handler(req, res) {
    const { message } = JSON.parse(req.body);
    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct", {
        headers: { 
            "Authorization": `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ inputs: message }),
    });
    const data = await response.json();
    res.status(200).json(data);
}
