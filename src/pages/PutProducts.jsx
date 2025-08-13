import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PutProducts() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setTitle(data.title);
        setPrice(data.price);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product data!");
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const product = { title, price };

      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to update product");

      const data = await res.json();
      console.log("Product Updated:", data);

      toast.success("Product Updated Successfully!");
    } catch (err) {
      console.error("failed to update data:", err);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1 className="font-bold text-center text-2xl">PUT Products (API)</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto border-2 border-gray-200 p-10 shadow-2xl rounded-md w-full"
      >
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ex: T-Shirt Blue"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Price
          </label>
          <input
            type="text"
            id="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ex: 10.0"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default PutProducts;
