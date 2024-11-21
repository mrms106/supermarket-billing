import './startscreen.css'
import { useNavigate } from 'react-router-dom'

export default function Startscreen(){
    const navigate=useNavigate()
    return(
        <div className="start-screen">

            <div className='start-box' onClick={()=>navigate('/login')}>
                Continue As Owner
            </div>
            <div className='start-box' onClick={()=>navigate('/Emplogin')}>
                Continue As a Cashier
            </div>

        </div>
    )
}