<script>
  import {navigate} from "svelte-routing";
import Editmadal from "./edit-modal.svelte"
import {modal,isLoading,todo} from "../store/edit.js"
  let isModal;
  let loading;
  isLoading.subscribe(value=>loading=value);
  modal.subscribe(value=>isModal=value);
  
let singleTodo;
todo.subscribe(value=>singleTodo=value)
// fun
if(typeof localStorage !== undefined){

const token = localStorage.getItem("token")
const todoId = localStorage.getItem("todoId")
    if(!token && !todoId){
      navigate("/")
    }
  
const getTodo = async()=>{
  try {
    const res = await fetch(`/api/v1/${todoId}`,{
        method:"GET",
        headers:{
         "Content-type":"application/json",
          authorization:token,
        }
      })
      const data = res.json();
      return data;
  } catch (e) {
    console.log(e.message)
  }
}
  getTodo().then(res=>{
      
    if(res.status==="ok" ){
      todo.update(value=>value=res.todo)
        isLoading.update(value=>value=false)
        console.log(singleTodo)
     //todo.update(value=>value=res.todo)   
        
        
      }
  })
}

//fn
</script>

<div class="container mx-auto p-4 relative">
  <div class="bg-white rounded-lg shadow p-8">
    <div class="border-b mb-4 pb-3">
      <h2 class="text-2xl font-semibold text-gray-800">Todo Details</h2>
    </div>
    <div class="mb-4">
      <label for="title" class="block font-medium text-gray-700 mb-1">
        Title
      </label>
      <input
        disabled
        value={loading?`loading...`:singleTodo.title}
        type="text"
        id="title"
        class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block font-medium text-gray-700 mb-1">
        description
      </label>
      <textarea
        disabled
        value={loading?`loading...`:singleTodo.description}
        id="description"
        class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="due-date" class="block font-medium text-gray-700 mb-1">
        Due Date
      </label>
      <input
        disabled
        value={loading?`loading...`:singleTodo.timestamp}
        type="text"
        id="due-date"
        class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800"
      />
    </div>
    <div class="mb-4">
      <label for="edit-status" class="block font-medium text-gray-700 mb-1">
        Edit status
      </label>
      <input
        value={loading?`loading...`:singleTodo.__v}
        disabled
        type="text"
        id="edit-status"
        class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800"
      />
    </div>
    <div class="mb-4">
      <label for="due-date" class="block font-medium text-gray-700 mb-1">
        Status
      </label>
      <input
        disabled
        value={loading?`loading...`:singleTodo.status}
        type="text"
        id="status"
        class="w-full px-4 py-2 border rounded bg-gray-100 text-gray-800"
      />
    </div>

    <div class="flex justify-end">
      <button
        on:click={(e)=>{
          e.preventDefault()
          modal.update(value=>isModal=true)
        }}
        type="button"
        class="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
    </div>
  </div>
  
  {#if isModal}
     <!-- content here -->
    <Editmadal/>
  {/if}

</div>

