<script>
  import avatar from "../soflex-assets/images/avatar/01.jpg"
</script>
<style>
  .hamburger{
    font-size:20px;
  }

  .all-nav-btns{
    column-gap: 8px;
  }

  .logo-parent{
    font-size:24px;
  }
</style>

<nav class="w-full h-[56px] bg-white px-3 flex justify-between items-center">
<!-- logo here start -->
   <span class="logo-parent w-10 h-10  rounded-[6.4px]">
<button class="logo-button w-full h-full rounded-[6.4px] flex justify-center items-center">
  <i class="bi bi-megaphone-fill text-blue-500 "></i>
    </button>
  </span>
  <!-- logo finished -->

  <!-- other nav icons or buttons -->
  <div class="all-nav-btns h-full flex items-center w-max">
<!-- messagebird -->
    <button class=" flex justify-center items-center w-10 h-10 rounded-[6.4px] bg-[#eef0f2]">
      <i class="bi bi-messenger text-gray-700"></i>
    </button>

<!-- notifications -->
    <button class=" flex justify-center  items-center w-10 h-10 rounded-[6.4px] bg-[#eef0f2]">
      <i class="bi bi-bell-fill text-gray-700"></i>
    </button>
       <!-- profile -->
    <button class=" flex justify-center items-center w-10 h-10 rounded-[6.4px] bg-[#eef0f2]">
      <i class="bi bi-list hamburger text-gray-700" ></i>
    </button>

  </div>
<!-- other nav icons finished -->
</nav>

