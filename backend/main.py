from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Todo(BaseModel):
    title: str
    description: str
    id: int


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/todos/{todo_id}")
def read_todo(todo_id: int) -> dict:
    return {"todo_id": todo_id}


@app.post("/todos")
def create_todo() -> dict:
    return {"todo_id": 1}
