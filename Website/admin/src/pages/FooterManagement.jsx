import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';

const FooterManagement = () => {
    const [data, setData] = useState({
        description: '',
        socialLinks: [],
        columns: [],
        contactInfo: { address: '', email: '', phone: '' },
        legalLinks: [],
        copyright: '',
        gstin: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await adminAxios.get('/api/footer');
            if (response.data.success && response.data.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching Footer data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await adminAxios.post('/api/footer', data);
            if (response.data.success) {
                alert('Footer updated successfully');
            }
        } catch (error) {
            console.error('Error saving Footer data:', error);
            alert('Failed to save Footer data');
        } finally {
            setSaving(false);
        }
    };

    const updateContactInfo = (field, value) => {
        setData({
            ...data,
            contactInfo: { ...data.contactInfo, [field]: value }
        });
    };

    const addColumn = () => {
        setData({
            ...data,
            columns: [...data.columns, { title: '', links: [] }]
        });
    };

    const updateColumn = (index, field, value) => {
        const newColumns = [...data.columns];
        newColumns[index] = { ...newColumns[index], [field]: value };
        setData({ ...data, columns: newColumns });
    };

    const removeColumn = (index) => {
        const newColumns = data.columns.filter((_, i) => i !== index);
        setData({ ...data, columns: newColumns });
    };

    const addColumnLink = (colIndex) => {
        const newColumns = [...data.columns];
        newColumns[colIndex].links.push({ label: '', href: '' });
        setData({ ...data, columns: newColumns });
    };

    const updateColumnLink = (colIndex, linkIndex, field, value) => {
        const newColumns = [...data.columns];
        newColumns[colIndex].links[linkIndex] = { ...newColumns[colIndex].links[linkIndex], [field]: value };
        setData({ ...data, columns: newColumns });
    };

    const removeColumnLink = (colIndex, linkIndex) => {
        const newColumns = [...data.columns];
        newColumns[colIndex].links = newColumns[colIndex].links.filter((_, i) => i !== linkIndex);
        setData({ ...data, columns: newColumns });
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
                <h1 className="text-2xl font-bold text-gray-900">Footer Management</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] disabled:opacity-50 flex items-center"
                >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </button>
            </div>

            <div className="space-y-8">
                <section>
                    <h2 className="text-lg font-bold border-b mb-4">Brand Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6600] outline-none"
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
                                <input
                                    type="text"
                                    value={data.copyright}
                                    onChange={(e) => setData({ ...data, copyright: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                                <input
                                    type="text"
                                    value={data.gstin}
                                    onChange={(e) => setData({ ...data, gstin: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold border-b mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                            <textarea
                                value={data.contactInfo.address}
                                onChange={(e) => updateContactInfo('address', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg outline-none"
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                            <input
                                type="email"
                                value={data.contactInfo.email}
                                onChange={(e) => updateContactInfo('email', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                            <input
                                type="text"
                                value={data.contactInfo.phone}
                                onChange={(e) => updateContactInfo('phone', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg outline-none"
                            />
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-center border-b mb-4 pb-2">
                        <h2 className="text-lg font-bold">Footer Columns</h2>
                        <button
                            onClick={addColumn}
                            className="text-sm bg-orange-50 text-[#FF6600] px-3 py-1 rounded hover:bg-orange-100"
                        >
                            + Add Column
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.columns.map((col, colIdx) => (
                            <div key={colIdx} className="border p-4 rounded-xl relative bg-gray-50">
                                <button
                                    onClick={() => removeColumn(colIdx)}
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="mb-4 pr-10">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Column Title</label>
                                    <input
                                        type="text"
                                        value={col.title}
                                        onChange={(e) => updateColumn(colIdx, 'title', e.target.value)}
                                        className="w-full px-3 py-1 border rounded"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-400">Links</span>
                                        <button
                                            onClick={() => addColumnLink(colIdx)}
                                            className="text-[10px] bg-white border px-2 py-0.5 rounded"
                                        >
                                            + Add
                                        </button>
                                    </div>
                                    {col.links.map((link, linkIdx) => (
                                        <div key={linkIdx} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={link.label}
                                                onChange={(e) => updateColumnLink(colIdx, linkIdx, 'label', e.target.value)}
                                                className="flex-1 px-2 py-1 text-xs border rounded"
                                                placeholder="Label"
                                            />
                                            <input
                                                type="text"
                                                value={link.href}
                                                onChange={(e) => updateColumnLink(colIdx, linkIdx, 'href', e.target.value)}
                                                className="flex-1 px-2 py-1 text-xs border rounded"
                                                placeholder="URL"
                                            />
                                            <button onClick={() => removeColumnLink(colIdx, linkIdx)}>
                                                <Trash2 className="w-4 h-4 text-red-300" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FooterManagement;
