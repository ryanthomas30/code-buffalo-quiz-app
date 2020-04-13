from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Quiz(Base):
    __tablename__ = 'quizzes'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    author = Column(String)
    questions = relationship('Question', backref='parent', passive_deletes=True)

    def __init__(self, title: str, author: str):
        self.title = title
        self.author = author

class Question(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True)
    quiz_id = Column(Integer, ForeignKey('quizzes.id', ondelete='CASCADE'))

    question_text = Column(String)
    correct_answer = Column(Integer)
    answer_one = Column(String)
    answer_two = Column(String)
    answer_three = Column(String, nullable=True)
    answer_four = Column(String, nullable=True)

    def __init__(
        self,
        quiz_id: int,
        question_text: str,
        correct_answer: int,
        answer_one: str,
        answer_two: str,
        answer_three: str,
        answer_four: str
    ):
        self.quiz_id = quiz_id
        self.question_text = question_text
        self.correct_answer = correct_answer
        self.answer_one = answer_one
        self.answer_two = answer_two
        self.answer_three = answer_three
        self.answer_four = answer_four
