from typing import List

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Question(BaseModel):
    correct_answer: int
    answer_zero: str
    answer_one: str
    answer_two: str = None
    answer_three: str = None 

class Quiz(BaseModel):
    title: str
    questions: List[Question]


@app.post("/quiz")
def create_quiz(quiz: Quiz):
    return { "200" }