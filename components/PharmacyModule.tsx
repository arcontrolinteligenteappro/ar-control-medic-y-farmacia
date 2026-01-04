import React, { useState } from 'react';
import { PharmacyTab, Product, CartItem } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { 
  ScanBarcode, 
  ShoppingCart, 
  Package, 
  Search, 
  Plus, 
  Minus, 
  Trash2,
  CreditCard,
  Banknote,
  Receipt
} from 'lucide-react';

const PharmacyModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PharmacyTab>(PharmacyTab.POS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16; // 16% VAT assumption
  const total = subtotal + tax;

  const renderTabs = () => (
    <div className="flex gap-2 mb-6 border-b border-slate-200 pb-2">
      <button
        onClick={() => setActiveTab(PharmacyTab.POS)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === PharmacyTab.POS ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-100'}`}
      >
        <ShoppingCart size={16} /> Point of Sale
      </button>
      <button
        onClick={() => setActiveTab(PharmacyTab.INVENTORY)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === PharmacyTab.INVENTORY ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-100'}`}
      >
        <Package size={16} /> Inventory
      </button>
    </div>
  );

  const renderPOS = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Product Selection */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search by name or SKU..." 
            className="flex-1 bg-transparent focus:outline-none text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <ScanBarcode size={16} /> Scan
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pb-4">
          {MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
            <div 
              key={product.id} 
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
              onClick={() => addToCart(product)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-slate-400 bg-slate-50 px-1 rounded">{product.sku}</span>
                <span className={`w-2 h-2 rounded-full ${product.stock < 50 ? 'bg-red-500' : 'bg-green-500'}`}></span>
              </div>
              <h4 className="font-bold text-slate-800 mb-1 truncate">{product.name}</h4>
              <p className="text-xs text-slate-500 mb-3">{product.category}</p>
              <div className="flex justify-between items-end">
                <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Checkout */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <ShoppingCart size={18} className="text-blue-600" /> Current Sale
          </h3>
          <span className="text-xs text-slate-500">{cart.length} Items</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
              <ScanBarcode size={48} className="mb-2" />
              <p className="text-sm">Scan items to begin sale</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1">
                   <p className="text-sm font-bold text-slate-800 truncate w-32">{item.name}</p>
                   <p className="text-xs text-slate-500">${item.price.toFixed(2)} / unit</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-red-500"><Minus size={14}/></button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-green-500"><Plus size={14}/></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3 rounded-b-2xl">
          <div className="flex justify-between text-sm text-slate-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>Tax (16%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-slate-800 pt-2 border-t border-slate-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
             <button className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
                <Banknote size={20} className="mb-1" />
                <span className="text-xs font-bold">Cash</span>
             </button>
             <button className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
                <CreditCard size={20} className="mb-1" />
                <span className="text-xs font-bold">Card</span>
             </button>
          </div>

          <button 
            disabled={cart.length === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
             <Receipt size={18} /> Process Payment
          </button>
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Master Product Catalog</h3>
        <button className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium">Add Product</button>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-500 font-medium">
          <tr>
            <th className="px-6 py-3">SKU</th>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Expiry</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {MOCK_PRODUCTS.map((prod) => (
            <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-mono text-slate-500 text-xs">{prod.sku}</td>
              <td className="px-6 py-4 font-medium text-slate-800">{prod.name}</td>
              <td className="px-6 py-4 text-slate-500">{prod.category}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${prod.stock < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {prod.stock} Units
                </span>
              </td>
              <td className="px-6 py-4 font-medium text-slate-800">${prod.price.toFixed(2)}</td>
              <td className="px-6 py-4 text-slate-500">{prod.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="h-full">
      {renderTabs()}
      {activeTab === PharmacyTab.POS && renderPOS()}
      {activeTab === PharmacyTab.INVENTORY && renderInventory()}
    </div>
  );
};

export default PharmacyModule;
