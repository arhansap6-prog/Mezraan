import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  Package,
  MapPin,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Plus,
  Trash2,
  Phone,
  Mail,
  Crown,
  X
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const {
    currentUser,
    orders,
    logoutUser,
    setCurrentPage,
    addSavedAddress,
    removeSavedAddress,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 bg-[#080808] text-white">
        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold text-white uppercase tracking-wider">
            Customer Portal
          </h2>
          <p className="text-xs text-neutral-400">
            Please log in or create an account to view your past orders and saved shipping addresses.
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('auth')}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl cursor-pointer"
        >
          Login / Register
        </button>
      </div>
    );
  }

  const userOrders = orders.filter(
    (o) => o.customerId === currentUser.uid || o.customerEmail === currentUser.email
  );

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.address || !newAddress.pincode) return;
    await addSavedAddress(newAddress);
    setShowAddressModal(false);
    setNewAddress({ name: '', mobile: '', address: '', city: '', state: '', pincode: '' });
    showToast('New shipping address saved!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#080808] text-white font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Welcome Card */}
      <div className="bg-[#121212] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl border border-amber-500/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-amber-400 font-bold font-serif text-xl">
              {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : 'M'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                VERIFIED VIP PATRON
              </span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold">
              {currentUser.fullName}
            </h1>
            <p className="text-xs text-neutral-400 font-mono">
              {currentUser.email} • {currentUser.mobile}
            </p>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-900 pb-3 text-xs uppercase tracking-wider font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          My Orders ({userOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'addresses'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          Saved Addresses
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="text-center py-16 bg-[#121212] rounded-3xl border border-neutral-800 p-8 space-y-4">
              <Package className="w-12 h-12 text-neutral-500 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-white">No Orders Placed Yet</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Explore our signature collection of pure attars, French perfumes, and wedding specials.
              </p>
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-[#121212] rounded-2xl border border-amber-500/20 p-5 sm:p-6 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-neutral-800 pb-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-amber-400 text-sm">
                        Order #{ord.orderId}
                      </span>
                      <span className="text-neutral-400 text-[11px] block">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {ord.status}
                      </span>
                      <span className="font-serif text-base font-bold text-white">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-10 h-12 object-cover rounded-lg bg-[#0a0a0a] border border-neutral-800 shrink-0 p-1"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-white block">{it.name}</span>
                          <span className="text-neutral-400 text-[11px]">
                            {it.volume} • Qty: {it.quantity}
                          </span>
                        </div>
                        <span className="font-mono font-semibold text-amber-400">
                          ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address & Tracking info */}
                  {ord.trackingNumber && (
                    <div className="bg-neutral-900 border border-amber-500/30 rounded-xl p-3 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-300">
                        <Truck className="w-4 h-4 text-amber-400" />
                        <span>Courier: <strong>{ord.courierCompany || 'Bluedart'}</strong> Tracking: <strong>{ord.trackingNumber}</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-white">Saved Addresses</h3>
            <button
              onClick={() => setShowAddressModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentUser.savedAddresses?.map((addr) => (
              <div
                key={addr.id}
                className="bg-[#121212] rounded-2xl border border-neutral-800 p-5 space-y-2 relative shadow-lg"
              >
                <button
                  onClick={() => removeSavedAddress(addr.id)}
                  className="absolute top-4 right-4 text-neutral-500 hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className="font-bold text-xs text-white block">{addr.name}</span>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <span className="text-[11px] font-mono text-amber-400 block pt-1">
                  📞 {addr.mobile}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#141414] text-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-amber-500/30 shadow-2xl">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">Add Shipping Address</h3>
              <button onClick={() => setShowAddressModal(false)} className="text-neutral-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Receiver Name"
                required
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-3 py-2 text-white"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                required
                value={newAddress.mobile}
                onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
              />
              <textarea
                placeholder="Full Street Address"
                required
                rows={2}
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-3 py-2 text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <input
                type="text"
                placeholder="Pincode"
                required
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
              />

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
