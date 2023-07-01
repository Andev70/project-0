<script>
  import axios from "axios"
import { todoTitle,todoStatus } from '../store/addtodo.js';
import Navbar from './navbar.svelte';
import { navigate } from 'svelte-routing';
import { onMount } from 'svelte';
import { todos} from '../store/data.js';
let allTodos;
let title;
let status;

todoStatus.subscribe(value=>status=value);
todoTitle.subscribe((value) => (title = value));
todos.subscribe((value) => (allTodos = value));
onMount(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/');
  }
  const getTodos = async () => {
    try {
      const res = await fetch('/api/v1/todos', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          authorization: token,
        },
      });
      const data = res.json();
      return data;
    } catch (e) {
      console.log(e.message);
    }
  };
  getTodos().then((res) => {
    
    todos.update((value) => (value = res.todos));
  });
});
</script>

<main>
  <Navbar />
  <div class="container mx-auto px-4 py-8">
    <div
      class="mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:w-[90%] sm:w-5/6"
    >
      <div class="bg-gray-200 px-4 py-6">
        <h1 class="text-2xl text-gray-800 font-bold">Todo List</h1>
      </div>
      <div class="bg-white px-4 py-6">
        <form class="mb-4">
          <div class="flex items-center border-b border-gray-200 pb-2">
            <input
              on:change={(e) => {
                todoTitle.update((value) => (value = e.target.value));
              }}
              type="text"
              class="flex-grow outline-none px-2 py-1 text-gray-700"
              placeholder="Add a task..."
            />
            <button
              on:click={(e) => {
                e.preventDefault();
                if (typeof localStorage !== undefined) {
                  const token = localStorage.getItem('token');
                  // add todo
                  const addTodo = async () => {
                    try {
                      const res = await fetch('/api/v1/add/todo', {
                        method: 'POST',
                        headers: {
                          'Content-type': 'application/json',
                          authorization: token,
                        },
                        body: JSON.stringify({ title: title,timestamp:Date.now() }),
                      });
                      const data = res.json();
                      return data;
                    } catch (e) {
                      console.log(e.message);
                    }
                  };
                  //add todo
                  addTodo().then(res=>{
                    if(res.status==="ok"){

                  todos.update(value=>value=[...value,res.todo])
                    }
                  })
                  //then end
                }
              }}
              type="submit"
              class="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
        <ul class="space-y-4">
          {#each allTodos as todo}
        
            <li
              class="todo-item flex items-center justify-between px-2 py-2 bg-white border-b border-gray-200"
            >
            
              <div class="flex items-center">
                
                <input on:click={(e)=>{
                  e.preventDefault();
                if(typeof localStorage !==undefined){
                    const token = localStorage.getItem("token")
              const statusUpdate = async()=>{
                      try {
                        const res = await fetch(`/api/v1/status`,{
                          method:"PATCH",
                        headers:{
                        "Content-type":"application/json",
                        authorization:token
                      },
                          body:JSON.stringify({todoId:todo._id,status:e.target.checked})

                        })
                        const data = res.json();
                        return data;
                      } catch (e) {
                        console.log(e.message)
                      }
                    }

                    statusUpdate().then(res=>{
                    todos.update(value=>value=res.todos)
                    
                    })

                  }
                }} checked={todo.status} type="checkbox" class="mr-2" />

                <span class="text-gray-800">{todo.title}</span>
              </div>
              <div>
                <button on:click={(e)=>{
                  e.preventDefault()
                  if(typeof localStorage !== undefined){
                 localStorage.setItem("todoId",e.target.value)
                    navigate(`/edit/${todo._id}`)
                  }
                }} value={todo._id} class="text-gray-500 mr-2">Edit</button>
                <button
                  value={todo._id}
                   on:click={(e)=>{
                   //local
                    if(typeof localStorage!==undefined){
                       const token = localStorage.getItem("token")
                       // fun
                          const delTodo=async() => {
                            try {
                              const res= await fetch("/api/v1/delete",{
                             method:"DELETE",
                             headers:{
                               "Content-type":"application/json",
                               id:e.target.value,
                               authorization:token,
                               
                             }
                           })
                           const data = res.json()
                           return data;
                            } catch (e) {
                              console.log(e.message)
                            }
                          }
                       delTodo().then(res=>{
                         if(res.status==="ok"){
                           todos.update(value=>value=res.todos)
                         }
                       })
                       //fun
                     }


                     //local
                   }}
                  class="text-gray-500">Delete</button>
              </div>
            </li>
            <!-- content here -->
          {/each}
        </ul>
      </div>
    </div>
  </div>
</main>
;
