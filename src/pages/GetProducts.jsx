import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GetProducts() {
  const [getData, setGetData] = useState(null);

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
    console.log(getData, "Data");
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Get Products (API)
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {getData?.length > 0 &&
            getData.map((items, index) => (
              <Link
                to={`/product/${items.id}`}
                key={index}
                className="group relative"
              >
                <img
                  src={items.image}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 truncate w-50">
                      {items.title}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {items.price}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default GetProducts;
