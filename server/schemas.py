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

class QuizBase(BaseModel):
    title: str
    author: str

class CreateQuizRequest(QuizBase):
    questions: List[Question]

class QuizResponse(QuizBase):
    id: int

    class Config:
        orm_mode = True

class SingleQuizResponse(QuizResponse):
    questions: List[Question]
