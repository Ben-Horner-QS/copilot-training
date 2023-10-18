import { ChangeEvent, KeyboardEvent } from "react";

export type Todo = {
    id: string, 
    text: string, 
    complete: boolean
}

export interface TextboxProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onEnter: (event: KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }

export interface TodoItemProps {
    todo: Todo,
    onChange: (id: string) => void;
  }

export interface TodosObject {
    [key: string]: Todo
}