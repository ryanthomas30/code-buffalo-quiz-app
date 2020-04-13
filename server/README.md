# How to Run
```
python3 -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

you also need postgress installed - do that and then run
create database quiz_app;
```