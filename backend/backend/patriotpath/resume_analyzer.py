import openai
from django.conf import settings
import json
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv("AZURE_OPENAI_API_KEY")  # Use environment variable
openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")  # Use environment variable
openai.api_type = 'azure'
openai.api_version = '2024-04-09'

def analyze_resume(resume_data):
    sections = json.loads(resume_data['sections'])
    entries = json.loads(resume_data['entries'])
    header_info = json.loads(resume_data['header'])

    prompt = f"""
    Analyze the following resume data and provide a maximum of five one-line, actionable feedback suggestions for improvement in each category.

    Header Information: {header_info}
    Sections: {sections}
    Entries: {entries}

    Checklist Requirements: 
    Formatting:
    - Ensure all required header fields are present.
    - Suggest specific improvements for clarity and readability.
    Sections:
    - Check for presence and order of required sections.
    Delivery:
    - Ensure STAR method is applied, providing specific improvements.

    Provide feedback categorized into Formatting Changes, Section Changes, and Entry Changes, limiting to five suggestions per category. Reference specific lines or aspects (e.g., "second line of the experience 'Software Engineer Intern' entry"):
    """

    response = openai.Completion.create(
        engine="gpt-4 (version:turbo-2024-04-09)",
        prompt=prompt,
        max_tokens=1000
    )

    result = response.choices[0].text.strip()
    print("LLM Response:", result)  # Log the response for debugging
    return result


