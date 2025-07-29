"use client"

import {ITask} from "@/types/tasks"
import React, {FormEventHandler, useState} from "react";
import {FaEdit} from "react-icons/fa";
import {FaTrashAlt} from "react-icons/fa";
import Modal from "@/component/modal";
import {useRouter} from "next/navigation";
import {addTodo, deleteToDo, editToDo} from "@@/api";
import {v4 as uuidv4} from "uuid";


export interface todoListTask {
    tasks: ITask[];
}


const ToDoList: React.FC<todoListTask> = ({tasks}) => {
    const router = useRouter()
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);


    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const selectedTask = tasks.find(task => task.id === selectedTaskId);
    const [editTask, setEditTask] = useState<string>("");
    const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);


    const handleEditClick = (taskId: string, currentName: string) => {
        setSelectedTaskId(taskId);
        setEditTask(currentName);
        setOpenEditModal(true);
    };


    const editValueOfText: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editToDo({id: selectedTaskId!, name: editTask})

        setEditTask("")
        setOpenEditModal(false)
        router.refresh()
        handleModalClose()
    }

    const handleModalClose = () => {
        setSelectedTaskId(null);
        setEditTask("");
        setOpenEditModal(false);
    };

    const handelDelete = async (id: string) => {

        await deleteToDo(id)
        setDeleteModal(false)
        router.refresh()

    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th className="w-full">Task</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {tasks.map((task: ITask) => (

                    <tr key={task.id} className="hover:bg-base-300">
                        <td className="w-full">{task.todo.name}</td>
                        <td className="flex gap-4">
                            <FaEdit onClick={() => handleEditClick(task.id, task.todo.name)} size={20}
                                    className="text-blue-400"/>
                            <Modal modalOpen={openEditModal} setModalOpen={setOpenEditModal}>
                                <form onSubmit={(event) => {
                                    editValueOfText(event)
                                }}>
                                    <h1 className="font-bold text-lg">Edit Task</h1>
                                    <div className="modal-action">
                                        <input
                                            value={editTask}
                                            onChange={(e) => setEditTask(e.target.value)}
                                            type="text"
                                            placeholder="type and submit to edit task"
                                            className="input input-bordered w-full"/>
                                        <button type="submit" className="btn btn-primary rounded-2xl">Submit</button>
                                    </div>
                                </form>

                            </Modal>
                            <FaTrashAlt size={20} className="text-red-400" onClick={() => {
                                setTaskIdToDelete(task.id);
                                setDeleteModal(true);
                            }}/>
                            <Modal modalOpen={deleteModal} setModalOpen={setDeleteModal}>
                                <h1 className="text-center">Are you sure you want to delete</h1>
                                <div className="modal-action">
                                    <button className="btn btn-error" onClick={() => handelDelete(taskIdToDelete!)}>Yes</button>
                                    <button className="btn btn-primary" onClick={() => setDeleteModal(false)}>No
                                    </button>
                                </div>
                            </Modal>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
};

export default ToDoList;
