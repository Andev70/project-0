<script>
  import {Router,Route,Link,navigate} from "svelte-routing";
  import WelcomeInstagram from "./components/welcome.svelte";
  import Home from "./components/home.svelte"
  import Skull from "./components/skull.svelte"
</script>


  <Router>
  <Route path="/skull"><Skull/></Route>
  <Route path="/home"><Home/></Route>
  <Route path="/"><WelcomeInstagram/></Route>
  <Route path="*">error</Route>
</Router>
