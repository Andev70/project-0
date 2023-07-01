<script>
  import {modal,todo } from "../store/edit.js"

</script>
<style>
  .edit-modal{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

</style>
<div class="bg-white  mt-4 edit-modal rounded w-5/6 shadow-lg p-4 sm:w-96 md:w-2/3 lg:w-4/5 xl:w-3/4 2xl:w-1/2">
      <h2 class="text-2xl font-semibold mb-4 text-center">Edit Todo</h2>
      <form>
        <div class="mb-4">
          <label for="title" class="block font-medium text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            class="w-full border rounded p-2"
            placeholder="Todo title"
          />
        </div>
        <div class="mb-4">
          <label for="title" class="block font-medium text-lg mb-2">
            Status
          </label>
          <input
            type="text"
            id="status"
            class="w-full border rounded p-2"
            placeholder="eg: true or false"
          />
        </div>
        <div class="mb-4">
          <label
            for="description"
            placeholder="Todo description"
            class="block font-medium text-lg mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            class="w-full border rounded p-2"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button on:click={(e)=>{
            e.preventDefault()
          modal.update(value=>value=false)
          }} type="button" class="mr-2 bg-gray-200 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            type="button"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
