<script>
  import {Route,Router,navigate} from "svelte-routing"
  import TodoList from "./components/alltodo.svelte"
  import Error from "./components/error.svelte"
  import Login from "./components/login.svelte"
  import Signup from "./components/signup.svelte";
  import TodoDetails from "./components/todo-detailes.svelte"
  import EditModal from "./components/edit-modal.svelte"
</script>

  <Router>
  <Route path="/"><Login/></Route>
  <Route path="/signup"><Signup/></Route>
  <Route path="/todos/:id"><TodoList/></Route>
  <Route path="/edit/:id"><TodoDetails/></Route>
  <Route path="*"><Error/></Route>
</Router>
  
