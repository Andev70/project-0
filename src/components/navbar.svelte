<script>
  import {navigate} from "svelte-routing";
  import profileDefault from "../assets/no-profile-pic.jpg"
</script>
<nav class="flex justify-between items-center bg-white pr-4 pl-4 shadow-lg h-14">
    <span class="flex items-center w-[42px] h-[42px] relative rounded-full px-2 py-1">
    <img class="absolute -z-0 w-full h-full rounded-full top-0 left-0" src={profileDefault} alt="PF"/>
        </span>
  <div class="container w-max  flex justify-end items-center h-full">
    <button on:click={(e)=>{
      e.preventDefault()
if(typeof localStorage!==undefined){
        localStorage.clear()
        navigate("/")
      }
    }} class="px-4 py-2 bg-blue-500 text-white rounded"> Logout </button>
  </div>
</nav>
