from typing import List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

import models
from database import session, engine

# Creates all of the tables in the database. Not really the best approach though,
# you should really use something like Alembic, but that's a topic for another day
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


class Question(BaseModel):
    question_text: str
    correct_answer: int
    answer_one: str
    answer_two: str
    answer_three: str = None
    answer_four: str = None

class Quiz(BaseModel):
    title: str
    author: str
    questions: List[Question]


@app.get('/quizzes')
def get_all_quizzes():
    return session.query(models.Quiz).all()

@app.get('/quiz/{quiz_id}')
def get_quiz_by_id(quiz_id: int):
    quiz = session.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=400, detail=f'Quiz with id {quiz_id} does not exist')

    return quiz

@app.post('/quiz')
def create_quiz(quiz: Quiz):
    new_quiz = models.Quiz(quiz.title, quiz.author)
    session.add(new_quiz)
    session.commit()
    session.refresh(new_quiz)

    for question in quiz.questions:
        new_question = models.Question(
            new_quiz.id,
            question.question_text,
            question.correct_answer,
            question.answer_one,
            question.answer_two,
            question.answer_three,
            question.answer_four
        )

        session.add(new_question)
    session.commit()

    return new_quiz
