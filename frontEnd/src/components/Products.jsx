import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem("user");
  const userId = JSON.parse(auth)._id;
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch(`http://localhost:4000/products/${userId}`)
    // header={
    //   authorization:JSON.parse(localStorage.getItem('token'))
    // });
    result = await result.json();
    console.warn(result)
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:4000/delete/${id}`, {
      method: "Delete",
    });
    alert("Product delete successfull");
    getProducts();
  };
  const searchHandle = async (e) => {
    if (e.target.value) {
      let result = await fetch(
        `http://localhost:4000/search/${e.target.value}`
      );
      result = await result.json();
      if (result) {
        let arr= [];
        result.map((item)=>{
          if(item.userId==userId){
            arr.push(item);
          }
          setProducts(arr);
        })
      }
    } else {
      getProducts();
    }
  };
  return (
    <div>
      <h1>Product List</h1>
      <input type="text" placeholder="Search Product" onChange={searchHandle}  className="searchInputBox"/>
      <ul className="table">
        <li>Serial Number</li>
        <li>Product Name</li>
        <li>Price</li>
        <li>Company</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length>0?products.map((item, index) => (
        <ul className="table" key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li> ${item.price}</li>
          <li>{item.company}</li>
          <li>{item.category}</li>
          <li>
            <button
              className="deleteButton"
              onClick={() => deleteProduct(item._id)}
            >
              Delete
            </button>
            <Link to={`update/${item._id}`}>Update</Link>
          </li>
        </ul>
      )):
      <h1>No results Found</h1>}
    </div>
  );
};

export default Products;
