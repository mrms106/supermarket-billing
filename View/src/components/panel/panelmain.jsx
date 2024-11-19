import './panel.css'

export default function PanelMain(){
    return(
        <>
        <div className='dashboard-title'>
        <h3 >Admin Dashboard</h3>
        </div>
        <div className="dashboard-main">
            
           <div>
           <div className="dashboard-box">show Products </div>
           <div className="dashboard-box"> show  Employee </div>
           </div>
           <div>
           <div className="dashboard-box"> Add employees </div>
           <div className="dashboard-box"> Add Products </div>
           </div>
            <div>
            <div className="dashboard-box"> View All Receipts </div>
            <div className="dashboard-box"> View Todays Sells </div>
            </div>
        </div>
      </>
    )
}