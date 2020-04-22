from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://quiz_app_user:password@localhost:5432/quiz_app')
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()
