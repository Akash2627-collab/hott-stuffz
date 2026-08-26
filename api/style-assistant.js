export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { occasion, budget, size, productList } = req.body

  if (!occasion || !budget || !size || !productList) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const prompt = `You are a fashion stylist for Hott Stuffz, a men's fashion brand.

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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_GEMINI_APIKEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      }
    )

    const data = await response.json()

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      return res.status(500).json({ error: 'No response from AI', details: data.error })
    }

    const rawText = data.candidates[0].content.parts[0].text

    const cleanText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    return res.status(200).json({
      content: [
        { text: cleanText }
      ]
    })

  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message })
  }
}
