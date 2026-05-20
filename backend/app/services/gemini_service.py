from groq import Groq

from app.config.settings import GROQ_API_KEY

client = Groq(
    api_key=GROQ_API_KEY
)

def generate_ai_response(user_message: str):

    try:

        chat_completion = client.chat.completions.create(

            messages=[
                {
                    "role": "user",
                    "content": user_message,
                }
            ],

            model="llama-3.1-8b-instant",
        )

        return chat_completion.choices[0].message.content

    except Exception as e:

        return f"Error: {str(e)}"