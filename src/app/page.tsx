import AddTask from "@/component/add-task";
import ToDoList from "@/component/to-do-list";


export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="text-center flex flex-col gap-4 my-5">
      <h1 className="text-2xl font-bold">To Do List</h1>
        <AddTask />
      </div>
        <ToDoList />
    </div>
  );
}
