import { KeyboardEvent, useEffect, useState } from "react";
import { Textbox } from "../components/input/Input";
import { TodoItem } from "../components/todo/Todo";
import { Todo, TodosObject } from "../constants";

export function Todos() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodosObject>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const put = async (id: string) => {
    const apiUrl = `http://localhost:8000/todos/${id}`;
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setTodos({ ...todos, [responseData.id]: responseData });
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const get = async () => {
    const apiUrl = "http://localhost:8000/todos";
    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      const todosObject: TodosObject = responseData.reduce(
        (acc: TodosObject, todo: Todo) => {
          const id = todo.id.toString();
          const newTodo = { ...todo, id: id };
          acc[id] = newTodo;
          return acc;
        },
        {}
      );
      setTodos(todosObject);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const post = async () => {
    const apiUrl = "http://localhost:8000/todos";
    const postData = {
      text: todo,
    };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      const id = responseData.id.toString();
      const newTodo = {
        [id]: {
          id: id,
          text: responseData.text,
          complete: false,
        },
      };
      setTodos({ ...todos, ...newTodo });
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && todo !== "") {
      post();
      setTodo("");
    }
  };

  useEffect(() => {
    get();
  }, []);

  const handleTodoCheck = (id: string) => {
    put(id);
  };

  return (
    <>
      <div>Todos</div>
      <Textbox
        value={todo}
        onChange={onChange}
        placeholder="Add a Todo..."
        onEnter={handleKeyDown}
      />
      {Object.values(todos).map(
        (oldTodo, index) =>
          !oldTodo.complete && (
            <TodoItem key={index} todo={oldTodo} onChange={handleTodoCheck} />
          )
      )}
    </>
  );
}
