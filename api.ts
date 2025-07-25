import {ITask} from "@/types/tasks"

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {

    const response = await fetch(`${baseUrl}/data`, {cache: "no-store"})
    const todos: ITask[] = await response.json()

    return todos;
}

export const addTodo = async (data: ITask): Promise<ITask[]> => {
    const response = await fetch(`${baseUrl}/data`, {
        method: 'POST',
        headers: {
            contentType: "application/json",
        },
        body: JSON.stringify({data})

    })
    const newtodo= await response.json()
    return newtodo;
}
