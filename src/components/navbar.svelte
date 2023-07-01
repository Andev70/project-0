<script>
  import {navigate} from "svelte-routing";
</script>
<nav class="bg-white pr-4 shadow-lg h-14">
  <div class="container mx-auto flex justify-end items-center h-full">
    <button on:click={(e)=>{
      e.preventDefault()
if(typeof localStorage!==undefined){
        localStorage.clear()
        navigate("/")
      }
    }} class="px-4 py-2 bg-blue-500 text-white rounded"> Logout </button>
  </div>
</nav>
