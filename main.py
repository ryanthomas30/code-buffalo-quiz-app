from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import models
import schemas

from database import session, engine

# Creates all of the tables in the database. Not really the best approach though,
# you should really use something like Alembic, but that's a topic for another day
models.Base.metadata.create_all(bind=engine)

# Initializes the FastAPI application
app = FastAPI()

# Just disabling CORS to allow for any hosts to connect - just for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/quizzes', response_model=List[schemas.QuizResponse])
def get_all_quizzes():
    """Get all of the quizzes
    """
    return session.query(models.Quiz).all()

@app.get('/quiz/{quiz_id}', response_model=schemas.SingleQuizResponse)
def get_quiz_by_id(quiz_id: int):
    """Get a specific quiz by its id
    """
    quiz = session.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=400, detail=f'Quiz with id {quiz_id} does not exist')

    return quiz

@app.post('/quiz', response_model=schemas.QuizResponse)
def create_quiz(quiz: schemas.CreateQuizRequest):
    """Create a new quiz
    """
    new_quiz = models.Quiz(quiz.title, quiz.author)
    session.add(new_quiz)
    session.commit()

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
    session.refresh(new_quiz)

    return new_quiz

@app.delete('/quiz/{quiz_id}', response_model=schemas.QuizResponse)
def delete_quiz_by_id(quiz_id: int):
    """Delete a specific quiz by its id
    """
    quiz = session.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=400, detail=f'Quiz with id {quiz_id} does not exist')

    session.delete(quiz)
    session.commit()

    return quiz
