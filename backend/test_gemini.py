# backend/test_gemini.py
import os
import sys
import logging
from dotenv import load_dotenv
# from google.generativeai import GenerativeModel

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Import your GenAIService
from app.services.genai_services import GenAIService

# 


class GenAIService:
    def __init__(self, api_key):
        # Initialize Google GenAI client
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        
        # Initialize the model
        self.model = GenerativeModel('gemini-pro')

        
      
    def test_connection(self):
        # Test connection using the model
        response = self.models.generate_content("Hello, world!")
        return response