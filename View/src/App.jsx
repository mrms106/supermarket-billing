import { useEffect, useState } from 'react'
import Navbar from './components/include/navbar'
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Login from './components/user/login';
import Signup from './components/user/signup';
import Startscreen from './components/user/startsreen';
import PanelMain from './components/panel/panelmain';
import Showproduct from './components/product/showproduct';
import UpdateProduct from './components/product/updateproduct';
import Addproduct from './components/product/addproduct';
import AddEmployee from './components/employee/createemplyee';
import Showemployee from './components/employee/showemployee';
import EmpLogin from './components/user/emplogin';
import Sellmain from './components/sell/sellmain';
import IsOwner from './owner';
import IsEmp from './isemp';
import ShowSells from './components/sell/showsales';

function App() {
  const [isloggedIn, setisloggedIn] = useState(null); 
  const [isowner,setisowener]=useState(null)
    // Fetch authentication status  
  const fetchAuth = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/user", {
            credentials: "include",
        });
        if (!response.ok) {
            console.log("Owner authentication failed.");
            setisloggedIn(false);
            setisowener(null)
            return;
        }
        const data = await response.json();
        setisloggedIn(true);
        setisowener(data.owner)
    } catch (err) {
        console.error("Error fetching owner authentication:", err);
        setisloggedIn(false);
        setisowener(null)
    }
};

    useEffect(()=>{
      fetchAuth()
    },[])
console.log(isowner)
  if (isloggedIn === null && isowner === null) {
    return <p>Loading...</p>; 
}
console.log(isloggedIn)
  return (
    <>
   <Router>
    <Navbar/>
    <Routes>

        <Route path='/' element={<Startscreen/>} />
        
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          {isloggedIn && isowner==="owner" ? (
          <Route element={<IsOwner isowner={isowner} isloggedIn={isloggedIn} />}>
            <Route path='/dashboard' element={<PanelMain/>} />
            <Route path='/allproducts' element={<Showproduct/>} />
            <Route path='/updateproduct/:id' element={<UpdateProduct/>} />
            <Route path='/addproduct' element={<Addproduct/>} />
            <Route path='/addemployee' element={<AddEmployee/>} />
            <Route path='/showemployee' element={<Showemployee/>} />
            <Route path='/allsales' element={<ShowSells/>} />
            <Route path='/todaysells' element={<ShowSells/>} />
          </Route>
): (
  <Route path="*" element={<Navigate to="/login" />} />
)}  
          <Route path='/Emplogin' element={<EmpLogin/>} />
          <Route element={<IsEmp isowner={isowner} isloggedIn={isloggedIn} />}>
            <Route path='/sell' element={<Sellmain/>} />
          </Route>
    </Routes>
   </Router>
    </>
  )
}

export default App
