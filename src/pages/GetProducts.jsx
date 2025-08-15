import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GetProducts() {
  const [getData, setGetData] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // Track which product is deleting

  useEffect(() => {
    getApi();
  }, []);

  async function getApi() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setGetData(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      await res.json();

      setGetData((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Get Products (API)
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {getData?.length > 0 &&
            getData.map((item) => (
              <div
                key={item.id}
                className="group relative border p-2 rounded-lg shadow-md"
              >
                <Link to={`/product/${item.id}`} className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <h3 className="text-sm text-gray-700 truncate w-50">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-900">
                      ${item.price}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="mt-3 w-full bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 disabled:bg-red-300"
                >
                  {deletingId === item.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default GetProducts;
