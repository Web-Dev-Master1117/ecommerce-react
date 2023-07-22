// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
   const response = await fetch('http://localhost:8080/products')
   const data = await response.json()
   resolve({data})
  }
  );
}

export function createProduct(product){
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products',{
      method: 'POST',
      body: JSON.stringify(product),
      headers: {'content-type': 'json/application'},
    })
    const data = await response.json();
    resolve({data});
  })
}




export function updateProduct(update){
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {'content-type':'application/json'},
    })
    const data = await response.json();
    resolve({data})
  })
}














export function fetchProductById(id){
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+id)
    const data = await response.json()
    resolve({data})
  });
}


export function fetchProductsByFilters(filter,sort,pagination) {

  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length > 0){
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) =>{
   const response = await fetch('http://localhost:8080/products?'+queryString)
   const data = await response.json()
   const totalItems = await response.headers.get('X-Total-Count')
   resolve({data:{products:data, totalItems:totalItems}})
  }
  );
}


export function fetchCategories(){
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json()
    resolve({data})
  })
}

export function fetchBrands(){
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({data})
  })
}