
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Sellcard({search,filteredproduct,addRemoveCart}){
    return(
        <div className="sell-card-main">
        {
         search.trim() !== "" ?
         filteredproduct.map((item)=>(
             <div className="sell-card">
             <div className="sell-card-img"><img src={item.image} alt='product-image'/></div>
             <div className="sell-card-info">
                 <p className="sell-text-title">{item.name} </p>
                 <p className="sell-text-body">Brand: <i>{item.brand}</i></p>
                 <p className="sell-text-body">Stock: {item.stock}</p>
             </div>
             <div className="sell-card-footer">
             <span className="sell-text-title">₹{item.price}</span>
             <div className="sell-card-button" onClick={()=>addRemoveCart(item._id)}>
            {item.incart ? <>Remove <RemoveShoppingCartIcon/></> : <>ADD <AddShoppingCartIcon/></>} 
             </div>
             </div>
         </div>
         )) :""
        }
     </div>
    )
}