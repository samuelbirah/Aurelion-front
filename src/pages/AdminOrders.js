import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders`, {
        withCredentials: true
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/admin-login');
      } else {
        toast.error('Erreur lors du chargement des commandes');
      }
    }
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B] pb-24" data-testid="admin-orders-page">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full max-w-md z-50 flex items-center gap-4 px-6 py-4 glass-effect border-b border-white/5"
      >
        <button
          onClick={() => navigate('/admin')}
          className="p-2 rounded-full bg-[#1A1A1A] text-white border border-white/10 active:scale-95 transition-transform"
          data-testid="back-btn"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-light tracking-tight text-white font-serif">
          Commandes
        </h1>
      </motion.header>

      <div className="pt-24 px-6">
        {orders.length === 0 ? (
          <div className="text-center py-20" data-testid="no-orders">
            <p className="text-gray-400 text-lg">Aucune commande</p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="orders-list">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#1A1A1A] rounded-[20px] border border-white/5 overflow-hidden"
                data-testid={`order-item-${order.id}`}
              >
                <button
                  onClick={() => toggleOrder(order.id)}
                  className="w-full p-4 flex items-center justify-between active:bg-[#0B0B0B]/50 transition-colors"
                  data-testid={`order-toggle-${order.id}`}
                >
                  <div className="text-left">
                    <p className="text-white font-serif text-lg mb-1">
                      {order.client_name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[#D4AF37] font-bold text-lg">
                      {order.total.toFixed(2)} €
                    </span>
                    {expandedOrder === order.id ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 p-4 space-y-3"
                    data-testid={`order-details-${order.id}`}
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#D4AF37] mb-1">
                        Contact
                      </p>
                      <p className="text-white">{order.email}</p>
                      <p className="text-white">{order.phone}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#D4AF37] mb-1">
                        Adresse
                      </p>
                      <p className="text-white">{order.address}</p>
                      <p className="text-white">{order.city}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#D4AF37] mb-2">
                        Produits
                      </p>
                      <div className="space-y-2">
                        {order.products.map((product, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-white bg-[#0B0B0B] rounded-lg p-2"
                          >
                            <span>
                              {product.name} x{product.quantity}
                            </span>
                            <span className="text-[#D4AF37]">
                              {(product.price * product.quantity).toFixed(2)} €
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
