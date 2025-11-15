import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App(){

  const [tasks, setTask] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // API EXAMPLE
  // useEffect(() => {
  //   async function fetchTasks(){
  //   const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {method:'GET'});
  //   const data = await response.json();
  //   setTask(data)
  //   };
  //   // se quiser, pode usar uma api para chamar tarefas iniciais
  //   //fetchTasks();
  // }, []);

  function onAddTaskClick(title, description){
    const newTask = {
      id: v4(),
      title, // same as title: title
      description: description, 
      isCompleted: false
    };
    setTask([...tasks, newTask]);
  }

  function onTaskClick(taskId){
    const updatedTasks = tasks.map((task) => {
      if(task.id === taskId){
        return {
          ...task, isCompleted: !task.isCompleted}
        }
        return task;
      })
      setTask(updatedTasks);
  } 

  function onDeleteTaskClick(taskId){
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTask(updatedTasks);
  }
      
   return (
    <div className="w-screen h-screen bg-fuchsia-950 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskClick={onAddTaskClick}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
      </div>
    </div>
  );
}

export default App