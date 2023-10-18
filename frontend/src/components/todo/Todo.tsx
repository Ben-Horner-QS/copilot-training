import { FC } from "react";
import { TodoItemProps } from "../../constants";

export const TodoItem: FC<TodoItemProps> = ({ todo, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => onChange(todo.id)}
      />
      <span style={{ textDecoration: todo.complete ? "line-through" : "none" }}>
        {todo.text}
      </span>
    </div>
  );
};
