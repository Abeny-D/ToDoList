import {ITask} from "@/types/tasks"
import React from "react";


export interface taskProps {
    tasks: ITask[];
}

const ToDoList: React.FC<taskProps> = ({tasks}) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr >
                    <th>Task</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {tasks.map((task: ITask) => (

                    <tr key={task.id} className="hover:bg-base-300">
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
};

export default ToDoList;
