import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const params = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
 useEffect(()=>{
  getProductDetails()
 },[])
  const getProductDetails=async()=>{
    let result= await fetch(`http://localhost:4000/findProduct/${params.id}`);
    result= await result.json();
    setName(result.name);
    setCategory(result.category);
    setCompany(result.company);
    setPrice(result.price);
  }
  const updateData = async () => {
    if (name && price && company && category) {
      let result = await fetch(`http://localhost:4000/update/${params.id}`, {
        method: "put",
        body: JSON.stringify({ name, price, company, category }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      alert(`${name} updated successfully`);
      setError(false);
      navigate('/')
    } else {
      setError(true);
      return false;
    }
  }
  return (
    <div>
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span className="invalidInput">Enter Valid Name</span>}
      <input
        type="text"
        placeholder="Enter Price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && (
        <span className="invalidInput">Enter Valid Price</span>
      )}
      <input
        type="text"
        placeholder="Enter Company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && (
        <span className="invalidInput">Enter Valid Company</span>
      )}
      <select
        className="inputBox"
        name="category"
        id="category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="">Choose a Category</option>
        <option value="mobile">Mobile</option>
        <option value="grocery">Grocery</option>
        <option value="electronics">Electronics</option>
        <option value="vegetables">Vegetable</option>
        <option value="fruit">Fruit</option>
        <option value="cloth">Cloth</option>
        <option value="shoe">Shoe</option>
      </select>
      {error && !category && (
        <span className="invalidInput">Enter Valid category</span>
      )}
      <button  className="updateButton" onClick={updateData}>
        Update
      </button>
    </div>
  );
};

export default UpdateProduct;
