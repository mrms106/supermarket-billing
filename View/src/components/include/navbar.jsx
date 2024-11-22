import './navbar.css'
import logo from '../../assets/logo.jpg'
export default function Navbar({isloggedIn,isowner}){

  const logout=async()=>{
    const response=await fetch("http://localhost:8080/api/logout",{
      credentials:'include'
    })
    if(!response.ok){
      alert("problem in logout")
      return
    }
    alert("user logout succesfull")
  }
    return(
        <>
   <div className="navmain">
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><img src={logo}/> </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="/">Home</a>
        <a className="nav-link" href={isowner=== "owner" ? "/dashboard" : "/sell"}>Dashboard</a>
        <a className="nav-link" href="" onClick={logout}>{isloggedIn ? "log-Out" : null}</a>
      </div>
    </div>
  </div>
</nav>
<hr></hr>
   </div>
        </>
    )
}