import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import {
    Save,
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    Shield,
    FileText,
    AlertCircle,
    Settings,
    Info,
    Layers,
    Layout,
    Contact,
    AlertTriangle,
    List as ListIcon,
    Type
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const iconOptions = [
    'Shield', 'Lock', 'Eye', 'Globe', 'Scale', 'AlertCircle', 'FileText', 'Mail', 'Phone', 'MapPin'
];

const PolicyManagement = () => {
    const [activeTab, setActiveTab] = useState('privacy-policy');
    const [loading, setLoading] = useState(false);
    const [policyData, setPolicyData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchPolicy();
    }, [activeTab]);

    const fetchPolicy = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/policies/${activeTab}`);
            if (response.data.success) {
                setPolicyData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching policy:', error);
            toast.error('Failed to load policy data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await axios.put(`/api/policies/${activeTab}`, policyData);
            if (response.data.success) {
                toast.success('Policy updated successfully');
            }
        } catch (error) {
            console.error('Error saving policy:', error);
            toast.error('Failed to save policy');
        } finally {
            setIsSaving(false);
        }
    };

    const addSection = () => {
        const newSection = {
            heading: 'New Section',
            iconName: 'Shield',
            content: [
                { type: 'paragraph', text: 'New content paragraph.' }
            ]
        };
        setPolicyData({
            ...policyData,
            sections: [...policyData.sections, newSection]
        });
    };

    const deleteSection = (index) => {
        const updatedSections = policyData.sections.filter((_, i) => i !== index);
        setPolicyData({ ...policyData, sections: updatedSections });
    };

    const updateSection = (index, field, value) => {
        const updatedSections = [...policyData.sections];
        updatedSections[index] = { ...updatedSections[index], [field]: value };
        setPolicyData({ ...policyData, sections: updatedSections });
    };

    const addContentBlock = (sectionIndex) => {
        const updatedSections = [...policyData.sections];
        updatedSections[sectionIndex].content.push({ type: 'paragraph', text: '' });
        setPolicyData({ ...policyData, sections: updatedSections });
    };

    const deleteContentBlock = (sectionIndex, blockIndex) => {
        const updatedSections = [...policyData.sections];
        updatedSections[sectionIndex].content = updatedSections[sectionIndex].content.filter((_, i) => i !== blockIndex);
        setPolicyData({ ...policyData, sections: updatedSections });
    };

    const updateContentBlock = (sectionIndex, blockIndex, field, value) => {
        const updatedSections = [...policyData.sections];
        updatedSections[sectionIndex].content[blockIndex] = {
            ...updatedSections[sectionIndex].content[blockIndex],
            [field]: value
        };
        setPolicyData({ ...policyData, sections: updatedSections });
    };

    const addListItem = (sectionIndex, blockIndex) => {
        const updatedSections = [...policyData.sections];
        if (!updatedSections[sectionIndex].content[blockIndex].items) {
            updatedSections[sectionIndex].content[blockIndex].items = [];
        }
        updatedSections[sectionIndex].content[blockIndex].items.push({ text: '', term: '', definition: '' });
        setPolicyData({ ...policyData, sections: updatedSections });
    };

    const updateListItem = (sectionIndex, blockIndex, itemIndex, field, value) => {
        const updatedSections = [...policyData.sections];
        updatedSections[sectionIndex].content[blockIndex].items[itemIndex][field] = value;
        setPolicyData({ ...policyData, sections: updatedSections });
    };

    if (loading && !policyData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-zinc-950 min-h-screen text-white pt-24">
            <Toaster position="top-right" />

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Shield className="text-orange-500" />
                            Policy Management
                        </h1>
                        <p className="text-zinc-400 mt-1">Manage Privacy Policy and Terms & Conditions content</p>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-orange-950/20"
                    >
                        {isSaving ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        ) : (
                            <Save size={20} />
                        )}
                        Save All Changes
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 p-1 bg-zinc-900 rounded-xl mb-8 w-fit border border-zinc-800">
                    <button
                        onClick={() => setActiveTab('privacy-policy')}
                        className={`px-6 py-2 rounded-lg transition-all ${activeTab === 'privacy-policy'
                                ? 'bg-orange-600 text-white shadow-lg'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                            }`}
                    >
                        Privacy Policy
                    </button>
                    <button
                        onClick={() => setActiveTab('terms-and-conditions')}
                        className={`px-6 py-2 rounded-lg transition-all ${activeTab === 'terms-and-conditions'
                                ? 'bg-orange-600 text-white shadow-lg'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                            }`}
                    >
                        Terms & Conditions
                    </button>
                </div>

                {policyData && (
                    <div className="space-y-8">
                        {/* General Info */}
                        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-orange-500">
                                <Info size={20} />
                                General Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Page Title</label>
                                    <input
                                        type="text"
                                        value={policyData.title}
                                        onChange={(e) => setPolicyData({ ...policyData, title: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Last Updated</label>
                                    <input
                                        type="text"
                                        value={policyData.lastUpdated}
                                        onChange={(e) => setPolicyData({ ...policyData, lastUpdated: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Intro Text</label>
                                    <textarea
                                        rows={3}
                                        value={policyData.intro}
                                        onChange={(e) => setPolicyData({ ...policyData, intro: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold flex items-center gap-2 text-orange-500">
                                    <Layers size={20} />
                                    Content Sections
                                </h2>
                                <button
                                    onClick={addSection}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all border border-zinc-700"
                                >
                                    <Plus size={18} />
                                    Add Section
                                </button>
                            </div>

                            {policyData.sections.map((section, sIndex) => (
                                <div key={sIndex} className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden">
                                    <div className="p-6 bg-zinc-900/50 border-b border-zinc-800 flex justify-between items-start gap-4">
                                        <div className="flex-1 grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Heading</label>
                                                <input
                                                    type="text"
                                                    value={section.heading}
                                                    onChange={(e) => updateSection(sIndex, 'heading', e.target.value)}
                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Icon Name (Lucide-React)</label>
                                                <select
                                                    value={section.iconName || ''}
                                                    onChange={(e) => updateSection(sIndex, 'iconName', e.target.value)}
                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                                >
                                                    <option value="">No Icon</option>
                                                    {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteSection(sIndex)}
                                            className="text-zinc-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-all mt-6"
                                            title="Delete Section"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* Content Blocks */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-semibold text-zinc-400">Content Blocks</label>
                                                <button
                                                    onClick={() => addContentBlock(sIndex)}
                                                    className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-md border border-zinc-700 flex items-center gap-1.5 transition-all"
                                                >
                                                    <Plus size={14} />
                                                    Add Block
                                                </button>
                                            </div>

                                            {section.content.map((block, bIndex) => (
                                                <div key={bIndex} className="p-4 bg-zinc-800/30 rounded-xl border border-zinc-800 relative group">
                                                    <div className="grid grid-cols-12 gap-4 mb-4">
                                                        <div className="col-span-3">
                                                            <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Type</label>
                                                            <select
                                                                value={block.type}
                                                                onChange={(e) => updateContentBlock(sIndex, bIndex, 'type', e.target.value)}
                                                                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1.5 text-xs focus:ring-1 focus:ring-orange-500 outline-none"
                                                            >
                                                                <option value="paragraph">Paragraph</option>
                                                                <option value="subheading">Subheading</option>
                                                                <option value="list">List</option>
                                                                <option value="warning">Warning/Alert</option>
                                                                <option value="contact">Contact Details</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-span-8">
                                                            {(block.type === 'paragraph' || block.type === 'subheading' || block.type === 'warning') && (
                                                                <>
                                                                    <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Content</label>
                                                                    <textarea
                                                                        value={block.text || ''}
                                                                        onChange={(e) => updateContentBlock(sIndex, bIndex, 'text', e.target.value)}
                                                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-orange-500 outline-none min-h-[60px]"
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="col-span-1 flex justify-end items-start mt-4">
                                                            <button
                                                                onClick={() => deleteContentBlock(sIndex, bIndex)}
                                                                className="text-zinc-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* List Type Expansion */}
                                                    {block.type === 'list' && (
                                                        <div className="pl-4 border-l-2 border-zinc-700 ml-2 space-y-3 mt-4">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-[10px] font-bold text-zinc-500 uppercase">List Items</span>
                                                                <button
                                                                    onClick={() => addListItem(sIndex, bIndex)}
                                                                    className="text-[10px] bg-zinc-800 px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-700 text-zinc-400"
                                                                >
                                                                    + Add Item
                                                                </button>
                                                            </div>
                                                            {block.items?.map((item, iIndex) => (
                                                                <div key={iIndex} className="space-y-2 pb-2 border-b border-zinc-800/50 last:border-0 relative group/item">
                                                                    {policyData.type === 'privacy-policy' ? (
                                                                        <input
                                                                            type="text"
                                                                            placeholder="List Item Text"
                                                                            value={item.text}
                                                                            onChange={(e) => updateListItem(sIndex, bIndex, iIndex, 'text', e.target.value)}
                                                                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none"
                                                                        />
                                                                    ) : (
                                                                        <div className="grid grid-cols-2 gap-2">
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Term (e.g. Website)"
                                                                                value={item.term}
                                                                                onChange={(e) => updateListItem(sIndex, bIndex, iIndex, 'term', e.target.value)}
                                                                                className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none font-bold"
                                                                            />
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Definition"
                                                                                value={item.definition}
                                                                                onChange={(e) => updateListItem(sIndex, bIndex, iIndex, 'definition', e.target.value)}
                                                                                className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none"
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    <button
                                                                        onClick={() => {
                                                                            const updatedSections = [...policyData.sections];
                                                                            updatedSections[sIndex].content[bIndex].items = updatedSections[sIndex].content[bIndex].items.filter((_, i) => i !== iIndex);
                                                                            setPolicyData({ ...policyData, sections: updatedSections });
                                                                        }}
                                                                        className="absolute -right-6 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-red-500 opacity-0 group-hover/item:opacity-100"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Contact Type Expansion */}
                                                    {block.type === 'contact' && (
                                                        <div className="pl-4 border-l-2 border-zinc-700 ml-2 grid md:grid-cols-2 gap-4 mt-4">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Company Name</label>
                                                                <input
                                                                    type="text"
                                                                    value={block.contactDetails?.company || ''}
                                                                    onChange={(e) => updateContentBlock(sIndex, bIndex, 'contactDetails', { ...block.contactDetails, company: e.target.value })}
                                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Tagline</label>
                                                                <input
                                                                    type="text"
                                                                    value={block.contactDetails?.tagline || ''}
                                                                    onChange={(e) => updateContentBlock(sIndex, bIndex, 'contactDetails', { ...block.contactDetails, tagline: e.target.value })}
                                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Email</label>
                                                                <input
                                                                    type="text"
                                                                    value={block.contactDetails?.email || ''}
                                                                    onChange={(e) => updateContentBlock(sIndex, bIndex, 'contactDetails', { ...block.contactDetails, email: e.target.value })}
                                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Privacy Email</label>
                                                                <input
                                                                    type="text"
                                                                    value={block.contactDetails?.privacyEmail || ''}
                                                                    onChange={(e) => updateContentBlock(sIndex, bIndex, 'contactDetails', { ...block.contactDetails, privacyEmail: e.target.value })}
                                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Website</label>
                                                                <input
                                                                    type="text"
                                                                    value={block.contactDetails?.website || ''}
                                                                    onChange={(e) => updateContentBlock(sIndex, bIndex, 'contactDetails', { ...block.contactDetails, website: e.target.value })}
                                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Phone</label>
                                                                <input
                                                                    type="text"
                                                                    value={block.contactDetails?.phone || ''}
                                                                    onChange={(e) => updateContentBlock(sIndex, bIndex, 'contactDetails', { ...block.contactDetails, phone: e.target.value })}
                                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Address</label>
                                                                <textarea
                                                                    rows={2}
                                                                    value={block.contactDetails?.address || ''}
                                                                    onChange={(e) => updateContentBlock(sIndex, bIndex, 'contactDetails', { ...block.contactDetails, address: e.target.value })}
                                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Section Note */}
                                        <div className="pt-4 border-t border-zinc-800">
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">Section Note (Optional HTML allowed)</label>
                                            <textarea
                                                rows={2}
                                                value={section.note || ''}
                                                onChange={(e) => updateSection(sIndex, 'note', e.target.value)}
                                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none resize-none text-sm"
                                                placeholder="e.g. Note about data rights..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PolicyManagement;
