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
        body: JSON.stringify({data}),

    })
    const newtodo= await response.json()
    return newtodo;
}

export const editToDo = async (data: ITask): Promise<ITask[]> => {
    const response = await fetch(`${baseUrl}/data/${data.id}`, {
        method: 'PUT',
        headers: {
            contentType: "application/json",
        },
        body: JSON.stringify({data}),

    })
    const updatedTodo= await response.json()
    return updatedTodo;
}


export const deleteToDo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/data/${id}`, {
        method: 'DELETE',
    })

}
