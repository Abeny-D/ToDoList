"use client"

import {FaPlus} from "react-icons/fa";
import Modal from "@/component/modal";
import {FormEventHandler, useState} from "react";
import {addTodo} from "@@/api";
import {useRouter} from "next/navigation";
import { v4 as uuidv4 } from 'uuid';


const AddTask = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [newTextValue, setNewTextValue] = useState<string>('')
    const router = useRouter()

    const addNewValue: FormEventHandler<HTMLFormElement> = async (e) => {
     e.preventDefault();
      await addTodo({ id: uuidv4(), name: newTextValue })

        setModalOpen(false)
        router.refresh()
        setNewTextValue('')
    }
    return (
        <div>
            <button className="btn btn-primary w-full rounded-2xl" onClick={() => {
                setModalOpen(true)
            }}>Add new task <FaPlus/>
            </button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={addNewValue}>
                    <h1 className="font-bold text-lg">Add new task</h1>
                    <div className="modal-action">
                        <input
                            value={newTextValue}
                            onChange={(e) => setNewTextValue(e.target.value)}
                            type="text"
                            placeholder="What's on your new task"
                            className="input input-bordered w-full"/>
                        <button type="submit" className="btn btn-primary rounded-2xl">Submit</button>
                    </div>
                </form>

            </Modal>
        </div>
    );
};

export default AddTask;
