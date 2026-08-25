export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { occasion, budget, size, productList } = req.body

  if (!occasion || !budget || !size || !productList) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `You are a fashion stylist for Hott Stuffz, a men's fashion brand.

Customer details:
- Occasion: ${occasion}
- Budget: ₹${budget}
- Size: ${size}

Available products:
${productList}

Recommend 2-3 best matching products for this customer. Only recommend products from the list above that match their occasion and are within budget.

Respond in this exact JSON format only, no other text:
{
  "recommendations": [
    {
      "id": "product_id",
      "name": "product name",
      "price": "price",
      "reason": "one line why this suits them"
    }
  ],
  "stylistNote": "one sentence overall style advice"
}`
          }
        ]
      })
    })

    const data = await response.json()

    if (!data.content || !data.content[0]) {
      return res.status(500).json({ error: 'No response from AI', details: data.error })
    }

    return res.status(200).json(data)

  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message })
  }
}