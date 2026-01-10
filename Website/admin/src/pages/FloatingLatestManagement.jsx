import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import { Save, Plus, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

const FloatingLatestManagement = () => {
    const [data, setData] = useState({ cards: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await adminAxios.get('/api/floatinglatest');
            if (response.data.success && response.data.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching FloatingLatest data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await adminAxios.post('/api/floatinglatest', data);
            if (response.data.success) {
                alert('Floating Latest updated successfully');
            }
        } catch (error) {
            console.error('Error saving FloatingLatest data:', error);
            alert('Failed to save data');
        } finally {
            setSaving(false);
        }
    };

    const addCard = () => {
        setData({
            ...data,
            cards: [...data.cards, { title: '', description: '', image: '', link: '' }]
        });
    };

    const updateCard = (index, field, value) => {
        const newCards = [...data.cards];
        newCards[index] = { ...newCards[index], [field]: value };
        setData({ ...data, cards: newCards });
    };

    const removeCard = (index) => {
        const newCards = data.cards.filter((_, i) => i !== index);
        setData({ ...data, cards: newCards });
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
                <h1 className="text-2xl font-bold text-gray-900">Floating Latest Management</h1>
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
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold text-gray-700">Resource Cards Stack</h2>
                    <button
                        onClick={addCard}
                        className="bg-orange-50 text-[#FF6600] px-3 py-1 rounded hover:bg-orange-100 flex items-center text-sm font-medium"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Card
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.cards.map((card, index) => (
                        <div key={index} className="border p-4 rounded-xl bg-gray-50 relative group">
                            <button
                                onClick={() => removeCard(index)}
                                className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-red-200"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                                {card.image ? (
                                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <ImageIcon className="w-8 h-8 mb-2" />
                                        <span className="text-xs">No Image Preview</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Title</label>
                                    <input
                                        type="text"
                                        value={card.title}
                                        onChange={(e) => updateCard(index, 'title', e.target.value)}
                                        className="w-full px-3 py-1 text-sm border rounded focus:ring-1 focus:ring-[#FF6600] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Description</label>
                                    <textarea
                                        value={card.description}
                                        onChange={(e) => updateCard(index, 'description', e.target.value)}
                                        className="w-full px-3 py-1 text-xs border rounded focus:ring-1 focus:ring-[#FF6600] outline-none"
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Image URL</label>
                                    <input
                                        type="text"
                                        value={card.image}
                                        onChange={(e) => updateCard(index, 'image', e.target.value)}
                                        className="w-full px-3 py-1 text-[10px] border rounded focus:ring-1 focus:ring-[#FF6600] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Link URL</label>
                                    <input
                                        type="text"
                                        value={card.link}
                                        onChange={(e) => updateCard(index, 'link', e.target.value)}
                                        className="w-full px-3 py-1 text-[10px] border rounded focus:ring-1 focus:ring-[#FF6600] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {data.cards.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed">
                        <p className="text-gray-500">Click "Add Card" to start building your resources stack</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FloatingLatestManagement;
