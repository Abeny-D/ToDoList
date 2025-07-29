import {ITask} from "@/types/tasks"

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {

    const response = await fetch(`${baseUrl}/tasks`, {cache: "no-store"})
    const todos: ITask[] = await response.json()

    return todos;
}

export const addTodo = async (todo: { id: string; name: string }): Promise<ITask[]> => {
    const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            contentType: "application/json",
        },
        body: JSON.stringify({todo}),

    })
    const newtodo= await response.json()
    return newtodo;
}

export const editToDo = async (todo: { id: any; name: string }): Promise<ITask[]> => {
    const response = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
            contentType: "application/json",
        },
        body: JSON.stringify({todo}),

    })
    const updatedTodo= await response.json()
    return updatedTodo;
}


export const deleteToDo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE',
    })

}
