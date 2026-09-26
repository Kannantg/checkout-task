import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setData(data.products);
        setProdLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const handleClick = (id) => {
    window.checkout.open({
      productId: id,
      onSuccess: ({ sessionId }) => {
        console.log(sessionId, "Merchant Site");
      }
    });
  };

  return (
    <section className="w-full max-w-[1240px] mx-auto py-5 px-5 xl:px-0">
      <h2 className="text-[30px] text-black font-medium">Product Page</h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-300">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="border border-slate-300 bg-slate-100 p-2 text-left">Title</th>
              <th className="border border-slate-300 bg-slate-100 p-2 text-left">Price</th>
              <th className="border border-slate-300 bg-slate-100 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item) => (
                <tr>
                  <td className="border border-slate-300 p-2">{item.title}</td>
                  <td className="border border-slate-300 p-2">{item.price}</td>
                  <td className="border border-slate-300 p-2">
                    <button type="button" className="text-[16px] text-[#fff] bg-[#3da3ff] py-[5px] px-[20px] rounded-[5px] border border-[#3da3ff] cursor-pointer font-medium" onClick={() => handleClick(item.id)}>Buy</button>
                  </td>
                </tr>
              ))
            }
            <tr></tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default App
