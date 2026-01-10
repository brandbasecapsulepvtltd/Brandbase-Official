import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';

const TopBarManagement = () => {
    const [data, setData] = useState({ offers: [], email: '', locations: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await adminAxios.get('/api/topbar');
            if (response.data.success && response.data.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching TopBar data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await adminAxios.post('/api/topbar', data);
            if (response.data.success) {
                alert('Top Bar updated successfully');
            }
        } catch (error) {
            console.error('Error saving TopBar data:', error);
            alert('Failed to save Top Bar data');
        } finally {
            setSaving(false);
        }
    };

    const updateOffer = (index, value) => {
        const newOffers = [...data.offers];
        newOffers[index] = value;
        setData({ ...data, offers: newOffers });
    };

    const addOffer = () => {
        setData({ ...data, offers: [...data.offers, ''] });
    };

    const removeOffer = (index) => {
        const newOffers = data.offers.filter((_, i) => i !== index);
        setData({ ...data, offers: newOffers });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#FF6600]" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Top Bar Management</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] disabled:opacity-50 flex items-center"
                >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={data.email || ''}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6600] outline-none"
                        placeholder="e.g. info@brandbasecapsule.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Locations Display Text</label>
                    <input
                        type="text"
                        value={data.locations || ''}
                        onChange={(e) => setData({ ...data, locations: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6600] outline-none"
                        placeholder="e.g. Serving: USA, UK, Europe..."
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Offers Carousel Items</label>
                        <button
                            onClick={addOffer}
                            className="text-sm text-[#FF6600] hover:text-[#E55A00] flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Offer
                        </button>
                    </div>
                    <div className="space-y-3">
                        {data.offers.map((offer, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={offer}
                                    onChange={(e) => updateOffer(index, e.target.value)}
                                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6600] outline-none"
                                    placeholder={`Offer ${index + 1}`}
                                />
                                <button
                                    onClick={() => removeOffer(index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {data.offers.length === 0 && (
                            <p className="text-sm text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg">No offers added yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBarManagement;
