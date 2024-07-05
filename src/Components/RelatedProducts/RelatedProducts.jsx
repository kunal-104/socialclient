import React, { useContext } from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext';
                
const RelatedProducts = (props) => {
  const {all_product} = useContext(ShopContext);
  let y=0;
  // console.log(props.product.category);
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {all_product.map((item, i)=>{
          if(item.category === props.product.category && item.id !== props.product.id && y<=3){
            y=y+1;
              return (<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>)
          } else {
            return null;
          }

        })}
      </div>
    </div>
  )
}

export default RelatedProducts
