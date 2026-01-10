import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import { Save, Plus, Trash2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

const NavbarManagement = () => {
    const [data, setData] = useState({
        logoLight: '',
        logoDark: '',
        services: [],
        directLinkServices: [],
        mainLinks: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await adminAxios.get('/api/navbar');
            if (response.data.success && response.data.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching Navbar data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await adminAxios.post('/api/navbar', data);
            if (response.data.success) {
                alert('Navbar updated successfully');
            }
        } catch (error) {
            console.error('Error saving Navbar data:', error);
            alert('Failed to save Navbar data');
        } finally {
            setSaving(false);
        }
    };

    // Service Categories
    const addServiceCategory = () => {
        setData({
            ...data,
            services: [...data.services, { category: '', categoryLink: '', items: [] }]
        });
    };

    const updateServiceCategory = (index, field, value) => {
        const newServices = [...data.services];
        newServices[index] = { ...newServices[index], [field]: value };
        setData({ ...data, services: newServices });
    };

    const removeServiceCategory = (index) => {
        const newServices = data.services.filter((_, i) => i !== index);
        setData({ ...data, services: newServices });
    };

    // Service Items inside Category
    const addServiceItem = (catIndex) => {
        const newServices = [...data.services];
        newServices[catIndex].items.push({ name: '', link: '' });
        setData({ ...data, services: newServices });
    };

    const updateServiceItem = (catIndex, itemIndex, field, value) => {
        const newServices = [...data.services];
        newServices[catIndex].items[itemIndex] = { ...newServices[catIndex].items[itemIndex], [field]: value };
        setData({ ...data, services: newServices });
    };

    const removeServiceItem = (catIndex, itemIndex) => {
        const newServices = [...data.services];
        newServices[catIndex].items = newServices[catIndex].items.filter((_, i) => i !== itemIndex);
        setData({ ...data, services: newServices });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#FF6600]" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Navbar Management</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] disabled:opacity-50 flex items-center"
                >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo Light (URL)</label>
                    <input
                        type="text"
                        value={data.logoLight || ''}
                        onChange={(e) => setData({ ...data, logoLight: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#FF6600]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo Dark (URL)</label>
                    <input
                        type="text"
                        value={data.logoDark || ''}
                        onChange={(e) => setData({ ...data, logoDark: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#FF6600]"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-semibold">Services Dropdown</h2>
                    <button
                        onClick={addServiceCategory}
                        className="bg-orange-50 text-[#FF6600] px-3 py-1 rounded-lg text-sm font-medium flex items-center hover:bg-orange-100"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Category
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {data.services.map((cat, catIdx) => (
                        <div key={catIdx} className="bg-gray-50 p-4 rounded-xl relative border">
                            <button
                                onClick={() => removeServiceCategory(catIdx)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Name</label>
                                    <input
                                        type="text"
                                        value={cat.category}
                                        onChange={(e) => updateServiceCategory(catIdx, 'category', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg outline-none"
                                        placeholder="e.g. Website Development"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Link</label>
                                    <input
                                        type="text"
                                        value={cat.categoryLink}
                                        onChange={(e) => updateServiceCategory(catIdx, 'categoryLink', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg outline-none"
                                        placeholder="e.g. /services/website-development"
                                    />
                                </div>
                            </div>

                            <div className="pl-6 border-l-2 border-orange-200 space-y-3">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-bold text-gray-600">Sub-Services</h4>
                                    <button
                                        onClick={() => addServiceItem(catIdx)}
                                        className="text-xs text-[#FF6600] border border-[#FF6600] px-2 py-1 rounded hover:bg-orange-50"
                                    >
                                        + Add Item
                                    </button>
                                </div>
                                {cat.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => updateServiceItem(catIdx, itemIdx, 'name', e.target.value)}
                                            className="flex-1 px-3 py-1 text-sm border rounded outline-none"
                                            placeholder="Service Name"
                                        />
                                        <input
                                            type="text"
                                            value={item.link}
                                            onChange={(e) => updateServiceItem(catIdx, itemIdx, 'link', e.target.value)}
                                            className="flex-1 px-3 py-1 text-sm border rounded outline-none"
                                            placeholder="Service Link"
                                        />
                                        <button
                                            onClick={() => removeServiceItem(catIdx, itemIdx)}
                                            className="text-red-400 hover:text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavbarManagement;
