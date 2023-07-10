<script>
  import {Router,Route,Link,navigate} from "svelte-routing";
  import WelcomeInstagram from "./components/welcome.svelte";
  import Home from "./components/home.svelte"
  import Signup from "./components/signup.svelte"
</script>


  <Router>
  <Route path="/signup"><Signup/></Route>
  <Route path="/home"><Home/></Route>
  <Route path="/"><WelcomeInstagram/></Route>
  <Route path="*">error</Route>
</Router>
