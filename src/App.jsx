
import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 45000, category: "Electronics", quantity: 5 },
    { id: 2, name: "Mobile", price: 20000, category: "Electronics", quantity: 10 },
    { id: 3, name: "Notebook", price: 100, category: "Stationery", quantity: 50 },
  ]);

  const [selectedId, setSelectedId] = useState("");
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });

  const [message, setMessage] = useState("");

  // Select an existing product
  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    setMessage("");

    const selectedProduct = products.find(
      (item) => item.id === Number(id)
    );

    if (selectedProduct) {
      setProduct({
        name: selectedProduct.name,
        price: String(selectedProduct.price),
        category: selectedProduct.category,
        quantity: String(selectedProduct.quantity),
      });
    } else {
      setProduct({
        name: "",
        price: "",
        category: "",
        quantity: "",
      });
    }
  };

  // Handle form inputs
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Update product details
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!selectedId) {
      setMessage("Please select a product first.");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === Number(selectedId)
          ? {
              ...item,
              ...product,
              price: Number(product.price),
              quantity: Number(product.quantity),
            }
          : item
      )
    );

    setMessage("Product updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Product Management
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Update existing product information
        </p>

        {/* Update Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Edit Product
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Select Product
              </label>

              <select
                value={selectedId}
                onChange={handleSelect}
                required
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select a product --</option>

                {products.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                disabled={!selectedId}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                  disabled={!selectedId}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  disabled={!selectedId}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  required
                  disabled={!selectedId}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedId}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Update Product
            </button>

            {message && (
              <p
                role="status"
                className={`text-center font-medium ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Product List ({products.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Quantity</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b ${
                      selectedId === String(item.id)
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
