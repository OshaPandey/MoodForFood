import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('userEmail'));
    await fetch("https://moodforfood-backend.onrender.com/api/myOrderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    }).then(async (res) => {
      let response = await res.json();
      setOrderData(response.orderData.order_data); // Adjusted line
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <div className='row'>
          {orderData.map((item) => (
            <div key={item.Order_date}> {/* Added key attribute */}
              <div className='m-auto mt-5'>
                <h3>{item.Order_date}</h3>
                <hr />
              </div>
              {item.order_data.map((arrayData) => (
                <div key={arrayData.id}> {/* Added key attribute */}
                  <div className='col-12 col-md-6 col-lg-3'>
                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                    
                      {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                      <div className="card-body">
                        <h5 className="card-title">{arrayData.name}</h5>
                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                          <span className='m-1'>{arrayData.qty}</span>
                          <span className='m-1'>{arrayData.size}</span>
                          <span className='m-1'>{item.Order_date}</span> {/* Adjusted line */}
                          <div className='d-inline ms-2 h-100 w-20 fs-5'>
                            ₹{arrayData.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
