from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import HumanMessagePromptTemplate, ChatPromptTemplate
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.schema import Document
from transformers import pipeline
import datetime
import random
import json
from dotenv import load_dotenv


load_dotenv()

start_date = datetime.datetime(2020, 1, 1)
end_date = datetime.datetime(2024, 1, 1)

def random_date(start_date, end_date):
    """
    Generate a random date between start_date and end_date.
    
    :param start_date: The start date (datetime object)
    :param end_date: The end date (datetime object)
    :return: Random date between start_date and end_date (string in mm/dd/yyyy format)
    """
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return random_date.strftime("%m/%d/%Y")



class JournalProcessor:
    def __init__(self, journal_text, chunk_size=500, chunk_overlap=0):
        self.journal_text = journal_text
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.docs = self.split_text()

    def split_text(self):
        text_splitter = CharacterTextSplitter(
            separator="-",
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap
        )
        return text_splitter.split_documents([Document(page_content=self.journal_text)])
    

class EmotionClassifier:
    def __init__(self):
        self.classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=True)

    def classify(self, text):
        results = self.classifier(text)
        return {result['label']: result['score'] for result in results[0]}

class EmotionJournal:
    def __init__(self, chunk_size=1000, chunk_overlap=0):
        #self.journal_processor = JournalProcessor(journal_text, chunk_size, chunk_overlap)
        self.emotion_classifier = EmotionClassifier()
        self.chat = ChatOpenAI()
        self.llm_chain = self.create_llm_chain()
        self.emotion_dict = {}

    def new_journal_entry(self, journal_text):
        entry_date = random_date(start_date, end_date)
        emotions = self.emotion_classifier.classify(journal_text)
        self.emotion_dict[f"{entry_date}"] = {
            "date": entry_date,
            "title": self.gen_ai_title(journal_text),
            "text": journal_text,
            "emotions": emotions
        }
        return 
        
    def create_llm_chain(self):
        prompt = ChatPromptTemplate(
            input_variables=["content", "messages"],
            messages=[
                HumanMessagePromptTemplate.from_template("{content}")
            ]
        )
        return LLMChain(llm=self.chat, prompt=prompt)


    def display_emotion_dictionary(self):
        for entry, data in self.emotion_dict.items():
            print(f"{entry}:")
            print(f"Text: {data['text']}")
            print(f"Emotions: {data['emotions']}")
            print("\n")

    def get_insights(self, entry_key, prompt_text):
        if entry_key in self.emotion_dict:
            journal_entry = self.emotion_dict[entry_key]['text']
            response = self.llm_chain({"content": prompt_text + journal_entry})
            return response['text']
        else:
            return "Invalid entry key."
        
    def gen_ai_title(self, journal_entry):
        prompt_text = "Make a short title, less than 7 words, describing the following journal entry"
        response = self.llm_chain({"content": prompt_text + journal_entry})
        return response['text']
    
    def gen_tags(self, journal_entry):
        prompt_text = "Make a short title, less than 7 words, describing the following journal entry"
        response = self.llm_chain({"content": prompt_text + journal_entry})
        return response['text']
    
    def get_insights_custom(self, entry_key, prompt_text,emotion):
        if entry_key in self.emotion_dict:
            journal_entry = self.emotion_dict[entry_key]['text']
            journal_entry_happy = self.emotion_dict[entry_key]['emotions'][emotion]
            print(journal_entry_happy)
            response = self.llm_chain({"content": str(journal_entry_happy) + prompt_text + journal_entry})
            return response['text']
        else:
            return "Invalid entry key."
    
    def get_insights_custom_top(self, emotion):
        if emotion in self.emotion_dict["1"]["emotions"]:
            response = self.llm_chain({"content": "Here are 3 diary entries, provide in one short sentence one activity what I can do from these days to have similiar " 
                                       + emotion + "in the future:" + self.get_concatenated_top_entries_text_by_emotion(emotion)})
            return response['text']
        else:
            return "Invalid entry key."
        
    def get_top_entries_by_emotion(self, emotion, top_n=3):
        entries_with_scores = [
            (entry, data['emotions'].get(emotion, 0))
            for entry, data in self.emotion_dict.items()
        ]
        # Sort entries by the emotion score in descending order
        sorted_entries = sorted(entries_with_scores, key=lambda x: x[1], reverse=True)
        top_entries = sorted_entries[:top_n]
        return top_entries
    
    def get_concatenated_top_entries_text_by_emotion(self, emotion, top_n=3):
        top_entries = self.get_top_entries_by_emotion(emotion, top_n)
        concatenated_text = " ".join([self.emotion_dict[entry]['text'] for entry, _ in top_entries])
        return concatenated_text
        
    def to_json(self):
        return json.dumps(self.emotion_dict, indent=4)
    
    def save_to_json_file(self, file_name):
        with open(file_name, 'w') as json_file:
            json.dump(self.emotion_dict, json_file, indent=4)

# Initialize the EmotionJournal instance
emotion_journal = EmotionJournal()
emotion_journal.new_journal_entry("**Day 1: Monday** I'm so excited to start this new chapter in my life! I've been living in this city for a week now, and I'm still trying to get used to the new rhythm. I finally got my new apartment all sorted out and moved in all my stuff. The complex is pretty nice, but I'm still getting used to the noise from the highway outside. I started my new job at a tech firm downtown. The commute is a bit of a pain, but the views of the city from the train are worth it. My job as a software engineer is pretty demanding, but I'm excited to learn and take on new challenges. After work, I stopped by the grocery store to grab some essentials. I'm still trying to figure out the city's public transportation system, and it took me a while to get back to my place. I ended up walking the last mile or so, which was nice but also exhausting.")
emotion_journal.new_journal_entry("""**Day 2: Tuesday**
Today was a struggle. I woke up late and had to rush to get ready for work. I was running so late that I had to skip breakfast and just grab a coffee on the go. My code didn't quite work as planned, and I had to spend some extra time debugging.
After work, I finally got a chance to explore my new neighborhood. I walked around and found some cute cafes and shops. I stumbled upon a small bookstore and browsed through their selection for a while. It felt nice to take a break from the hustle and bustle of city life.
""")
emotion_journal.new_journal_entry("""**Day 3: Wednesday**
I had a meeting with my team today, and it was awesome to finally meet everyone in person. We went over the project details and discussed our goals for the next quarter. I'm feeling a bit overwhelmed still, but my coworkers are super helpful and supportive.

On my way home, I stopped by a nearby park and did a quick 20-minute workout to clear my head. It's been tough adjusting to my new surrounding without my usual fitness routine. I need to get back into the swing of things.
""")



# Display the emotion dictionary
emotion_journal.display_emotion_dictionary()

# Get insights from a specific journal entry
entry_key = "1"  # Example entry key
# prompt_text = "is the value of happiness for the following journal entry, please give insights"
# insights = emotion_journal.get_insights_custom(entry_key, prompt_text, 'joy')
emotion_journal.save_to_json_file('test')
# print(f"Insights for {entry_key}: {insights}")
# print(emotion_journal.get_concatenated_top_entries_text_by_emotion('joy'))
# print(emotion_journal.get_insights_custom_top('joy'))
#print(emotion_journal.emotion_dict)

