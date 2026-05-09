import { Home } from "./pages/Home"
import { Dashbord } from "./pages/Dashboard"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Routes, Route } from "react-router-dom"
import { CreatePost } from "./pages/create"
import { SinglePost } from "./pages/SinglePost"
import { Setting } from "./pages/setting"
import  { UserProvider }  from "./UserProvider"
import  { AdminPanel } from "./pages/adminpanel"
import { ProtectedRoute } from "./compoents/ProtectedRoute"
import { AdminRoute } from "./compoents/adminRoute"


function App() {
  return (
   <UserProvider>
     <Routes>
         <Route  path="/" element={<Home />} /> 
         <Route path="/dashboard" element={<ProtectedRoute><Dashbord /></ProtectedRoute>} />
         <Route path="/createpost" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
         <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />    
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="adminpanel" element={<ProtectedRoute> <AdminRoute> <AdminPanel /></AdminRoute> </ProtectedRoute>} />
     </Routes>
   </UserProvider>
  )
}

export default App
