<script>
  import {email,password,name} from '../store/signup.js'
  let userPassword;
  let userName;
  let userEmail;
  email.subscribe(value=>userEmail=value);
  password.subscribe(value=>userPassword=value)
  name.subscribe(value=>userName=value)
import { navigate } from 'svelte-routing';
const signup =async() => {
  try {
    const res = await fetch("/api/v1/signup",{
        method:"POST",
        headers:{"Content-type":"application/json"},
          body:JSON.stringify({username:userName,password:userPassword,email:userEmail})
      })
      const data = res.json();
      return data;
  } catch (e) {
      console.log(e.message)
    
  }
}
</script>

<div
  class="pt-4 pb-4 flex items-center justify-center min-h-screen bg-gray-100"
>
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
    <h2 class="text-3xl text-center mb-8 font-bold">Sign Up</h2>
    <form>
      <div class="mb-4">
        <label for="name" class="text-gray-700 font-semibold"> Name </label>
        <input
          on:change={(e)=>{name.update(value=>value=e.target.value)}}
          type="text"
          id="name"
          class="w-full border border-gray-300 rounded-md p-2 mt-1"
          placeholder="Enter your name"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="text-gray-700 font-semibold"> Email </label>
        <input
          on:change={(e)=>{email.update(value=>value=e.target.value)}}
          type="email"
          id="email"
          class="w-full border border-gray-300 rounded-md p-2 mt-1"
          placeholder="Enter your email"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="text-gray-700 font-semibold">
          Password
        </label>
        <input
          on:change={(e)=>{password.update(value=>value=e.target.value)}}
          type="password"
          id="password"
          class="w-full border border-gray-300 rounded-md p-2 mt-1"
          placeholder="Enter your password"
        />
      </div>

      <button
        on:click="{(e) => {
          e.preventDefault();
        signup().then(res=>{
        console.log(res)
        if(res.status===`ok`){
        
          navigate(`/`)
        }
        })
        }}"
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>
