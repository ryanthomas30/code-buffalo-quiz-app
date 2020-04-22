from typing import List
from pydantic import BaseModel


class Question(BaseModel):
    question_text: str
    correct_answer: int
    answer_one: str
    answer_two: str
    answer_three: str = None
    answer_four: str = None

    class Config:
        orm_mode = True

class Quiz(BaseModel):
    title: str
    author: str

class CreateQuizRequest(Quiz):
    questions: List[Question]

class QuizResponse(Quiz):
    id: int

    class Config:
        orm_mode = True

class SingleQuizResponse(QuizResponse):
    questions: List[Question]
