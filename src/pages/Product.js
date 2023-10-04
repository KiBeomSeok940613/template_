import React, { memo } from 'react'



const Product = memo(function(){
  // 재렌더링이 필요없을때 사용하면 새로고침 할때 한번만 사용 가능. memo 를 사용 하는 이유는 성능 개선을 위해 사용.



  console.log("product 실행")

  
  return (
    <div>Product</div>
  )
})

export default Product