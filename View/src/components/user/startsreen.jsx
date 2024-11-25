import './startscreen.css'
import { useNavigate } from 'react-router-dom'

export default function Startscreen(){
    const navigate=useNavigate()
    return(
        <div className="start-screen">

            <div className='start-box' onClick={()=>navigate('/dashboard')}>
                Continue As Owner
            </div>
            <div className='start-box' onClick={()=>navigate('/sell')}>
                Continue As a Cashier
            </div>

        </div>
    )
}