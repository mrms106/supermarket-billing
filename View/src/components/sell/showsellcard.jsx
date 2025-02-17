import { useState ,useEffect} from "react";
import { generateCartReceipt } from "./reciept";
import './sells.css'

export default function ShowSellscard({type}){
    
    let[selldata,setselldata]=useState([])
    const sellData=async()=>{
        try{
            const responce=await fetch(`http://localhost:8080/api/${type}`,{
                credentials:"include"
            })
            if(responce.ok){
            const data = await responce.json();
            setselldata(data.sells)
            }else{
                alert("error in fetch sell data")
            }
        }catch(err){
            console.log(err)
        }
      }
      useEffect(()=>{
        sellData()
      },[])
    return(
        <>
           <div className="main-selldisplay">
        {selldata.length ?
        selldata.map((sell)=>(
             <div className="col-sm-6 sell-show">
             <div className="card ">
               <div className="card-body">
                 <h5 className="card-title">Buyer-Name: {sell.customerName}</h5>
                 <p className="card-text">Buy-Date:{sell.date}</p>             
                 <button href="#" className="btn btn-primary"  onClick={() => generateCartReceipt(sell)}>Print receipt </button>
               </div>
             </div>
             </div>
        )):<p>No Sells are available</p>}
        </div>
        </>
    )
}