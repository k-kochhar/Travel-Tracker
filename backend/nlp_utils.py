import spacy

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

#Extract entities from the text using spaCy
def extract_entities(text):
    doc = nlp(text)
    entities = [ent.text for ent in doc.ents if ent.label_ == "GPE"]

    return entities