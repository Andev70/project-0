<script>
import Post from './posts.svelte';
import Navbar from "./navbar.svelte"

import Postpublish from "./post-area.svelte"

</script>

<!-- navbar is starting -->

<Navbar/>

<!-- navbar is ending -->


<!--post section is starting-->
<section
  class="wrapper overflow-hidden bg-background-100 w-screen h-screen"
>
  <div class="w-full h-full overflow-scroll">

<!-- publish-posts -->

<Postpublish/>

<!-- publish post ends -->

    <Post />
    <Post />
    <Post />
  </div>
</section>

  <!-- all post section is finished -->
