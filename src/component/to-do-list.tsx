"use client"

import {ITask} from "@/types/tasks"
import React, {FormEventHandler, useState} from "react";
import {FaEdit} from "react-icons/fa";
import {FaTrashAlt} from "react-icons/fa";
import Modal from "@/component/modal";
import {useRouter} from "next/navigation";
import {deleteToDo, editToDo} from "@@/api";


export interface taskProps {
    tasks: ITask[];
}

const ToDoList: React.FC<taskProps> = ({tasks}) => {
     const router = useRouter()
    const [editModal, setEditModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [newValue, setNewValue] = useState(tasks[0]?.name ?? '');

    const editValueOfText: FormEventHandler<HTMLFormElement> = async (e) => {
       e.preventDefault()
       await editToDo({
           id: tasks[0].id,
            name: newValue
       })
        setNewValue("")
        setEditModal(false)
        router.refresh()
    }

    const handelDelete  = async (id:string) => {

        await deleteToDo(id);
        setDeleteModal(false);
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
                        <td className="w-full">{task.name}</td>
                        <td className="flex gap-4">
                            <FaEdit onClick={()=> setEditModal(true)} size={20} className="text-blue-400"/>
                            <Modal modalOpen={editModal} setModalOpen={setEditModal}>
                                <form onSubmit={editValueOfText}>
                                    <h1 className="font-bold text-lg">Edit Task</h1>
                                    <div className="modal-action">
                                        <input
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            type="text"
                                            placeholder="type and submit to edit task"
                                            className="input input-bordered w-full"/>
                                        <button type="submit" className="btn btn-primary rounded-2xl">Submit</button>
                                    </div>
                                </form>

                            </Modal>
                            <FaTrashAlt size={20} className="text-red-400" onClick={()=>setDeleteModal(true)} />
                            <Modal modalOpen={deleteModal} setModalOpen={setDeleteModal}>
                                <h1 className="text-center">Are you sure you want to delete</h1>
                                <div className="modal-action">
                                    <button className="btn btn-error" onClick={()=>handelDelete(task.id)}>Yes</button>
                                    <button className="btn btn-primary" onClick={()=>setDeleteModal(false)}>No</button>
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
