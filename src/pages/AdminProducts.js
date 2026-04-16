import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    stock: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`, {
        withCredentials: true
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/admin-login');
      } else {
        toast.error('Erreur lors du chargement des produits');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image || !formData.stock) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const data = {
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
        stock: parseInt(formData.stock),
      };

      if (editingProduct) {
        await axios.put(`${API}/products/${editingProduct.id}`, data, {
          withCredentials: true
        });
        toast.success('Produit modifié avec succès');
      } else {
        await axios.post(`${API}/products`, data, {
          withCredentials: true
        });
        toast.success('Produit ajouté avec succès');
      }

      setFormData({ name: '', price: '', image: '', stock: '' });
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Erreur lors de l\'enregistrement du produit');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      stock: product.stock.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      await axios.delete(`${API}/products/${id}`, {
        withCredentials: true
      });
      toast.success('Produit supprimé');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/admin-login');
      } else {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', image: '', stock: '' });
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B] pb-24" data-testid="admin-products-page">
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
          Gestion des produits
        </h1>
      </motion.header>

      <div className="pt-24 px-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full py-4 px-6 bg-[#D4AF37] text-black font-medium rounded-full transition-all duration-300 active:scale-95 hover:bg-[#C5A028] shadow-[0_4px_14px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 font-sans text-lg mb-6"
          data-testid="add-product-btn"
        >
          <Plus size={20} />
          Ajouter un produit
        </button>

        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-[#1A1A1A] rounded-[20px] p-6 border border-white/5 mb-6 space-y-4"
            data-testid="product-form"
          >
            <h3 className="text-xl font-serif text-white mb-4">
              {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
            </h3>

            <input
              type="text"
              placeholder="Nom du produit"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0B0B0B] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              data-testid="product-name-input"
            />

            <input
              type="number"
              step="0.01"
              placeholder="Prix (€)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-[#0B0B0B] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              data-testid="product-price-input"
            />

            <input
              type="text"
              placeholder="URL de l'image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-[#0B0B0B] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              data-testid="product-image-input"
            />

            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full bg-[#0B0B0B] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              data-testid="product-stock-input"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-[#D4AF37] text-black font-medium rounded-full active:scale-95 transition-all"
                data-testid="submit-product-btn"
              >
                {editingProduct ? 'Modifier' : 'Ajouter'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 bg-transparent text-white border border-white/20 rounded-full active:scale-95 transition-all"
                data-testid="cancel-product-btn"
              >
                Annuler
              </button>
            </div>
          </motion.form>
        )}

        <div className="space-y-4" data-testid="products-list">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#1A1A1A] rounded-[20px] p-4 border border-white/5 flex gap-4"
              data-testid={`product-item-${product.id}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              
              <div className="flex-1">
                <h3 className="font-serif text-lg text-white mb-1">{product.name}</h3>
                <p className="text-[#D4AF37] text-lg font-semibold">{product.price.toFixed(2)} €</p>
                <p className="text-gray-400 text-sm">Stock: {product.stock}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] active:scale-95 transition-transform"
                  data-testid={`edit-product-${product.id}`}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 rounded-full bg-red-500/20 text-red-400 active:scale-95 transition-transform"
                  data-testid={`delete-product-${product.id}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
