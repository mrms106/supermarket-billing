import { useNavigate } from 'react-router-dom'
import './panel.css'

export default function PanelMain(){
  const navigate=useNavigate()
    return(
        <>
        <div className='dashboard-title'>
        <h3 >Admin Dashboard</h3>
        </div>
        <div className="dashboard-main">
            
           <div>
           <div className="dashboard-box" onClick={()=>navigate('/allproducts')}>show Products </div>
           <div className="dashboard-box" onClick={()=>navigate('/showemployee')}> show  Employee </div>
           </div>
           <div>
           <div className="dashboard-box"onClick={()=>navigate('/addemployee')}> Add employees </div>
           <div className="dashboard-box"  onClick={()=>navigate('/addproduct')}> Add Products </div>
           </div>
            <div>
            <div className="dashboard-box"> View All Receipts </div>
            <div className="dashboard-box"> View Todays Sells </div>
            </div>
        </div>
      </>
    )
}