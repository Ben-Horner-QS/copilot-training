from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Base, Todo
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

app = FastAPI()


SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"


def get_db():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class TodoRequest(BaseModel):
    text: str


class TodoResponse(BaseModel):
    id: int
    text: str
    complete: bool


origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/todos")
def get_todos(db: Session = Depends(get_db)) -> list[TodoResponse]:
    todos = db.query(Todo).all()
    return todos


@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todos(todo_id: int, db: Session = Depends(get_db)) -> TodoResponse:
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    todo.complete = not todo.complete
    db.commit()
    db.refresh(todo)
    return todo


@app.post("/todos", response_model=TodoResponse)
def create_todo(todo: TodoRequest, db: Session = Depends(get_db)) -> TodoResponse:
    db_todo = Todo(text=todo.text, complete=False)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
