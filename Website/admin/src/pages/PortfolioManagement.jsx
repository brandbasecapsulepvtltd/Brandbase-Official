import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import {
    Plus, Search, Edit, Trash2, Eye,
    Save, X, ChevronDown, ChevronUp, Image as ImageIcon,
    Layout, Users, MessageSquare, HelpCircle, FileText, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';

const PortfolioManagement = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Edit Mode State
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [activeTab, setActiveTab] = useState('hero');

    // Initial Form State matching Schema
    const initialFormState = {
        slug: '',
        hero: {
            tagline: '',
            title: '',
            description: '',
            ctaText: 'Get Free Consultation',
            videoUrl: '',
            images: [] // Array of strings
        },
        bento: {
            mainHeading: '',
            cards: {
                conceptToReality: { title: '', imageAlt: '', imageUrl: '' },
                projectsDelivered: { count: '', label: '' },
                amazingWork: { title: '', structureImage: '', structureAlt: '' },
                showcaseStall: { imageUrl: '', alt: '', location: '' },
                citiesReach: { count: '', label: '' }
            },
            services: [] // Array of strings
        },
        clientPortfolio: [], // Array of objects
        testimonials: {
            sectionTitle: '',
            sectionDescription: '',
            testimonials: [] // Array
        },
        faqs: {
            sectionTitle: '',
            faqs: [] // Array
        },
        gallery: [], // Array of image URLs for kinetic scroll gallery
        metadata: {
            title: '',
            description: '',
            keywords: []
        }
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            setLoading(true);
            const res = await adminAxios.get('/api/portfolios');
            setPortfolios(res.data.data);
        } catch (err) {
            setError('Failed to load portfolios');
        } finally {
            setLoading(false);
        }
    };

    // --- Handlers ---

    const handleCreateNew = () => {
        setFormData(initialFormState);
        setCurrentId(null);
        setIsEditing(true);
        setActiveTab('hero');
    };

    const handleEdit = (portfolio) => {
        setFormData(portfolio);
        setCurrentId(portfolio._id);
        setIsEditing(true);
        setActiveTab('hero');
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure? This cannot be undone.")) return;
        try {
            await adminAxios.delete(`/api/portfolios/${id}`);
            setSuccessMessage('Deleted successfully');
            fetchPortfolios();
        } catch (err) {
            setError('Failed to delete');
        }
    };

    const handleSave = async () => {
        try {
            if (currentId) {
                await adminAxios.put(`/api/portfolios/${currentId}`, formData);
                setSuccessMessage('Updated successfully');
            } else {
                await adminAxios.post('/api/portfolios', formData);
                setSuccessMessage('Created successfully');
            }
            setIsEditing(false);
            fetchPortfolios();
        } catch (err) {
            console.error(err);
            setError('Failed to save. Check all fields.');
        }
    };

    // Generic Nested Change Handler
    const updateField = (path, value) => {
        setFormData(prev => {
            const newData = { ...prev };
            let current = newData;
            const keys = path.split('.');
            const lastKey = keys.pop();

            keys.forEach(key => {
                if (!current[key]) current[key] = {};
                current = current[key];
            });

            current[lastKey] = value;
            return newData;
        });
    };

    // Helper for arrays (images, services, keywords)
    const handleArrayChange = (path, index, value) => {
        setFormData(prev => {
            const newData = JSON.parse(JSON.stringify(prev)); // Deep copy
            let current = newData;
            const keys = path.split('.');
            keys.forEach(k => current = current[k]);

            current[index] = value;
            return newData;
        });
    };

    const addArrayItem = (path, defaultValue = "") => {
        setFormData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData;
            const keys = path.split('.');
            keys.forEach(k => current = current[k]);
            current.push(defaultValue);
            return newData;
        });
    };

    const removeArrayItem = (path, index) => {
        setFormData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData;
            const keys = path.split('.');
            keys.forEach(k => current = current[k]);
            current.splice(index, 1);
            return newData;
        });
    };

    // --- Render Functions for Tabs ---

    const renderHeroTab = () => (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Page Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>Slug (URL Identifier)</label>
                    <input className="w-full border p-2 rounded" value={formData.slug} onChange={e => updateField('slug', e.target.value)} placeholder="e.g., video-production" />
                </div>
                <div>
                    <label>Category (for filtering)</label>
                    <select className="w-full border p-2 rounded" value={formData.category || 'other'} onChange={e => updateField('category', e.target.value)}>
                        <option value="web-development">Web Development</option>
                        <option value="app-development">App Development</option>
                        <option value="branding">Branding</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="exhibition-stalls">Exhibition Stalls</option>
                        <option value="video-production">Video Production</option>
                        <option value="content-writing">Content Writing</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <h3 className="font-bold text-lg mt-6">Hero Section</h3>
            <div className="grid grid-cols-2 gap-4">
                <div><label>Tagline</label><input className="w-full border p-2 rounded" value={formData.hero.tagline} onChange={e => updateField('hero.tagline', e.target.value)} /></div>
                <div><label>Title</label><input className="w-full border p-2 rounded" value={formData.hero.title} onChange={e => updateField('hero.title', e.target.value)} /></div>
            </div>
            <div><label>Description</label><textarea className="w-full border p-2 rounded" rows={3} value={formData.hero.description} onChange={e => updateField('hero.description', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
                <div><label>CTA Text</label><input className="w-full border p-2 rounded" value={formData.hero.ctaText} onChange={e => updateField('hero.ctaText', e.target.value)} /></div>
                <div><label>Video URL</label><input className="w-full border p-2 rounded" value={formData.hero.videoUrl} onChange={e => updateField('hero.videoUrl', e.target.value)} /></div>
            </div>

            <div>
                <label>Hero Images (URLs)</label>
                {formData.hero.images.map((img, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input className="flex-1 border p-2 rounded" value={img} onChange={e => handleArrayChange('hero.images', i, e.target.value)} />
                        <button onClick={() => removeArrayItem('hero.images', i)} className="text-red-500"><X size={16} /></button>
                    </div>
                ))}
                <button onClick={() => addArrayItem('hero.images')} className="text-blue-500 text-sm flex items-center"><Plus size={14} /> Add Image</button>
            </div>
        </div>
    );

    const renderBentoTab = () => (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Bento Grid Section</h3>
            <div><label>Main Heading</label><input className="w-full border p-2 rounded" value={formData.bento.mainHeading} onChange={e => updateField('bento.mainHeading', e.target.value)} /></div>

            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded">
                <div>
                    <h4 className="font-semibold mb-2">Card: Concept To Reality</h4>
                    <input className="w-full border p-2 mb-2" placeholder="Title" value={formData.bento.cards.conceptToReality.title} onChange={e => updateField('bento.cards.conceptToReality.title', e.target.value)} />
                    <input className="w-full border p-2 mb-2" placeholder="Image URL" value={formData.bento.cards.conceptToReality.imageUrl} onChange={e => updateField('bento.cards.conceptToReality.imageUrl', e.target.value)} />
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Card: Projects Delivered</h4>
                    <input className="w-full border p-2 mb-2" placeholder="Count (e.g. 450+)" value={formData.bento.cards.projectsDelivered.count} onChange={e => updateField('bento.cards.projectsDelivered.count', e.target.value)} />
                    <input className="w-full border p-2 mb-2" placeholder="Label" value={formData.bento.cards.projectsDelivered.label} onChange={e => updateField('bento.cards.projectsDelivered.label', e.target.value)} />
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Card: Amazing Work</h4>
                    <input className="w-full border p-2 mb-2" placeholder="Title" value={formData.bento.cards.amazingWork.title} onChange={e => updateField('bento.cards.amazingWork.title', e.target.value)} />
                    <input className="w-full border p-2 mb-2" placeholder="Image URL" value={formData.bento.cards.amazingWork.structureImage} onChange={e => updateField('bento.cards.amazingWork.structureImage', e.target.value)} />
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Card: Showcase Stall/Project</h4>
                    <input className="w-full border p-2 mb-2" placeholder="Location" value={formData.bento.cards.showcaseStall.location} onChange={e => updateField('bento.cards.showcaseStall.location', e.target.value)} />
                    <input className="w-full border p-2 mb-2" placeholder="Image URL" value={formData.bento.cards.showcaseStall.imageUrl} onChange={e => updateField('bento.cards.showcaseStall.imageUrl', e.target.value)} />
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Card: Cities/Global Reach</h4>
                    <input className="w-full border p-2 mb-2" placeholder="Count" value={formData.bento.cards.citiesReach.count} onChange={e => updateField('bento.cards.citiesReach.count', e.target.value)} />
                    <input className="w-full border p-2 mb-2" placeholder="Label" value={formData.bento.cards.citiesReach.label} onChange={e => updateField('bento.cards.citiesReach.label', e.target.value)} />
                </div>
            </div>

            <div>
                <label className="font-medium">Services List</label>
                {formData.bento.services.map((svc, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input className="flex-1 border p-2 rounded" value={svc} onChange={e => handleArrayChange('bento.services', i, e.target.value)} />
                        <button onClick={() => removeArrayItem('bento.services', i)} className="text-red-500"><X size={16} /></button>
                    </div>
                ))}
                <button onClick={() => addArrayItem('bento.services')} className="text-blue-500 text-sm flex items-center"><Plus size={14} /> Add Service</button>
            </div>
        </div>
    );

    const renderClientPortfolioTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Client Case Studies</h3>
                <button onClick={() => addArrayItem('clientPortfolio', {
                    imagePosition: 'right', logo: '', companyName: '', industry: '',
                    projectTitle: '', projectDescription: '', servicesProvided: [],
                    results: [], mediaItems: [], testimonial: { clientName: '', position: '', quote: '', clientImage: '' }
                })} className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center"><Plus size={16} /> Add Case Study</button>
            </div>

            {formData.clientPortfolio.map((client, index) => (
                <div key={index} className="border rounded-lg p-6 bg-gray-50 space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h4 className="font-bold text-md text-blue-700">Case Study #{index + 1}</h4>
                        <button onClick={() => removeArrayItem('clientPortfolio', index)} className="text-red-600 font-medium hover:bg-red-50 px-2 py-1 rounded">Remove Case Study</button>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-600">Company Name</label>
                            <input className="w-full border p-2 rounded" placeholder="Company Name" value={client.companyName} onChange={e => handleArrayChange('clientPortfolio', index, { ...client, companyName: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-600">Industry</label>
                            <input className="w-full border p-2 rounded" placeholder="Industry" value={client.industry} onChange={e => handleArrayChange('clientPortfolio', index, { ...client, industry: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-600">Project Title</label>
                            <input className="w-full border p-2 rounded" placeholder="Project Title" value={client.projectTitle} onChange={e => handleArrayChange('clientPortfolio', index, { ...client, projectTitle: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-600">Logo URL</label>
                            <input className="w-full border p-2 rounded" placeholder="Logo URL" value={client.logo} onChange={e => handleArrayChange('clientPortfolio', index, { ...client, logo: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-600">Image Position</label>
                            <select className="w-full border p-2 rounded" value={client.imagePosition || 'right'} onChange={e => handleArrayChange('clientPortfolio', index, { ...client, imagePosition: e.target.value })}>
                                <option value="right">Right</option>
                                <option value="left">Left</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600">Project Description</label>
                        <textarea className="w-full border p-2 rounded" placeholder="Project Description" rows={3} value={client.projectDescription} onChange={e => handleArrayChange('clientPortfolio', index, { ...client, projectDescription: e.target.value })} />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600">Services Provided (Comma separated)</label>
                        <input className="w-full border p-2 rounded"
                            value={client.servicesProvided?.join(', ') || ''}
                            onChange={e => handleArrayChange('clientPortfolio', index, { ...client, servicesProvided: e.target.value.split(',') })}
                        />
                    </div>

                    {/* Results Section */}
                    <div className="bg-white p-4 rounded border">
                        <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-sm text-gray-700">Key Results/Stats</h5>
                            <button
                                onClick={() => {
                                    const updated = { ...client, results: [...(client.results || []), { value: '', label: '' }] };
                                    handleArrayChange('clientPortfolio', index, updated);
                                }}
                                className="text-xs text-blue-600 font-medium flex items-center"
                            >
                                <Plus size={12} className="mr-1" /> Add Result
                            </button>
                        </div>
                        {client.results?.map((res, rIndex) => (
                            <div key={rIndex} className="flex gap-2 mb-2 items-center">
                                <input className="w-1/3 border p-1 rounded text-sm" placeholder="Value (e.g. 500%)" value={res.value}
                                    onChange={e => {
                                        const newResults = [...client.results];
                                        newResults[rIndex] = { ...res, value: e.target.value };
                                        handleArrayChange('clientPortfolio', index, { ...client, results: newResults });
                                    }}
                                />
                                <input className="flex-1 border p-1 rounded text-sm" placeholder="Label (e.g. Traffic Growth)" value={res.label}
                                    onChange={e => {
                                        const newResults = [...client.results];
                                        newResults[rIndex] = { ...res, label: e.target.value };
                                        handleArrayChange('clientPortfolio', index, { ...client, results: newResults });
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        const newResults = client.results.filter((_, i) => i !== rIndex);
                                        handleArrayChange('clientPortfolio', index, { ...client, results: newResults });
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Media Items Section */}
                    <div className="bg-white p-4 rounded border">
                        <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-sm text-gray-700">Media Gallery</h5>
                            <button
                                onClick={() => {
                                    const updated = { ...client, mediaItems: [...(client.mediaItems || []), { type: 'image', url: '', alt: '', title: '' }] };
                                    handleArrayChange('clientPortfolio', index, updated);
                                }}
                                className="text-xs text-blue-600 font-medium flex items-center"
                            >
                                <Plus size={12} className="mr-1" /> Add Media
                            </button>
                        </div>
                        {client.mediaItems?.map((media, mIndex) => (
                            <div key={mIndex} className="border p-2 rounded mb-2 bg-gray-50 flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <select
                                        className="border p-1 rounded text-sm w-24"
                                        value={media.type}
                                        onChange={e => {
                                            const newMedia = [...client.mediaItems];
                                            newMedia[mIndex] = { ...media, type: e.target.value };
                                            handleArrayChange('clientPortfolio', index, { ...client, mediaItems: newMedia });
                                        }}
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                    <input className="flex-1 border p-1 rounded text-sm" placeholder="Media URL" value={media.url}
                                        onChange={e => {
                                            const newMedia = [...client.mediaItems];
                                            newMedia[mIndex] = { ...media, url: e.target.value };
                                            handleArrayChange('clientPortfolio', index, { ...client, mediaItems: newMedia });
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            const newMedia = client.mediaItems.filter((_, i) => i !== mIndex);
                                            handleArrayChange('clientPortfolio', index, { ...client, mediaItems: newMedia });
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <input className="flex-1 border p-1 rounded text-sm" placeholder="Alt Text" value={media.alt}
                                        onChange={e => {
                                            const newMedia = [...client.mediaItems];
                                            newMedia[mIndex] = { ...media, alt: e.target.value };
                                            handleArrayChange('clientPortfolio', index, { ...client, mediaItems: newMedia });
                                        }}
                                    />
                                    <input className="flex-1 border p-1 rounded text-sm" placeholder="Title/Caption" value={media.title}
                                        onChange={e => {
                                            const newMedia = [...client.mediaItems];
                                            newMedia[mIndex] = { ...media, title: e.target.value };
                                            handleArrayChange('clientPortfolio', index, { ...client, mediaItems: newMedia });
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial Section */}
                    <div className="bg-white p-4 rounded border">
                        <h5 className="font-semibold text-sm text-gray-700 mb-2">Client Testimonial</h5>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <input className="border p-2 rounded text-sm" placeholder="Client Name" value={client.testimonial?.clientName || ''}
                                onChange={e => handleArrayChange('clientPortfolio', index, { ...client, testimonial: { ...(client.testimonial || {}), clientName: e.target.value } })}
                            />
                            <input className="border p-2 rounded text-sm" placeholder="Position" value={client.testimonial?.position || ''}
                                onChange={e => handleArrayChange('clientPortfolio', index, { ...client, testimonial: { ...(client.testimonial || {}), position: e.target.value } })}
                            />
                        </div>
                        <div className="mb-2">
                            <input className="w-full border p-2 rounded text-sm mb-2" placeholder="Client Image URL" value={client.testimonial?.clientImage || ''}
                                onChange={e => handleArrayChange('clientPortfolio', index, { ...client, testimonial: { ...(client.testimonial || {}), clientImage: e.target.value } })}
                            />
                            <textarea className="w-full border p-2 rounded text-sm" placeholder="Quote" rows={2} value={client.testimonial?.quote || ''}
                                onChange={e => handleArrayChange('clientPortfolio', index, { ...client, testimonial: { ...(client.testimonial || {}), quote: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderTestimonialsTab = () => (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Testimonials Section</h3>
            <input className="w-full border p-2 rounded" placeholder="Section Title" value={formData.testimonials.sectionTitle} onChange={e => updateField('testimonials.sectionTitle', e.target.value)} />
            <input className="w-full border p-2 rounded" placeholder="Section Description" value={formData.testimonials.sectionDescription} onChange={e => updateField('testimonials.sectionDescription', e.target.value)} />

            <h4 className="font-semibold mt-4">Testimonials List</h4>
            {formData.testimonials.testimonials.map((t, i) => (
                <div key={i} className="border p-3 rounded mb-2 bg-gray-50">
                    <div className="flex gap-2 mb-2">
                        <input className="flex-1 border p-2" placeholder="Name" value={t.name} onChange={e => handleArrayChange('testimonials.testimonials', i, { ...t, name: e.target.value })} />
                        <input className="flex-1 border p-2" placeholder="Role" value={t.role} onChange={e => handleArrayChange('testimonials.testimonials', i, { ...t, role: e.target.value })} />
                        <button onClick={() => removeArrayItem('testimonials.testimonials', i)}><X size={16} /></button>
                    </div>
                    <textarea className="w-full border p-2" placeholder="Text" rows={2} value={t.text} onChange={e => handleArrayChange('testimonials.testimonials', i, { ...t, text: e.target.value })} />
                </div>
            ))}
            <button onClick={() => addArrayItem('testimonials.testimonials', { name: '', role: '', text: '', image: '' })} className="text-blue-500 flex items-center mt-2"><Plus size={16} /> Add Testimonial</button>
        </div>
    );

    const renderFaqsTab = () => (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">FAQs Section</h3>
            <input className="w-full border p-2 rounded" placeholder="Section Title" value={formData.faqs.sectionTitle} onChange={e => updateField('faqs.sectionTitle', e.target.value)} />

            {formData.faqs.faqs.map((f, i) => (
                <div key={i} className="border p-3 rounded mb-2 bg-gray-50">
                    <input className="w-full border p-2 mb-2" placeholder="Question" value={f.question} onChange={e => handleArrayChange('faqs.faqs', i, { ...f, question: e.target.value })} />
                    <textarea className="w-full border p-2" placeholder="Answer" rows={2} value={f.answer} onChange={e => handleArrayChange('faqs.faqs', i, { ...f, answer: e.target.value })} />
                    <button onClick={() => removeArrayItem('faqs.faqs', i)} className="text-red-500 text-sm mt-2">Remove</button>
                </div>
            ))}
            <button onClick={() => addArrayItem('faqs.faqs', { question: '', answer: '' })} className="text-blue-500 flex items-center mt-2"><Plus size={16} /> Add FAQ</button>
        </div>
    );

    const renderGalleryTab = () => (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Gallery Images</h3>
            <p className="text-sm text-gray-600">Add image URLs for the kinetic scroll gallery section. These images will be displayed below the bento grid.</p>

            <div>
                <label className="font-medium">Gallery Images (URLs)</label>
                {formData.gallery?.map((img, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input className="flex-1 border p-2 rounded" value={img} onChange={e => handleArrayChange('gallery', i, e.target.value)} placeholder="Image URL" />
                        <button onClick={() => removeArrayItem('gallery', i)} className="text-red-500 hover:bg-red-50 px-2 rounded"><X size={16} /></button>
                    </div>
                ))}
                <button onClick={() => addArrayItem('gallery')} className="text-blue-500 text-sm flex items-center mt-2"><Plus size={14} /> Add Image</button>
            </div>
        </div>
    );

    const renderMetadataTab = () => (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Metadata (SEO)</h3>
            <div><label>Meta Title</label><input className="w-full border p-2 rounded" value={formData.metadata.title} onChange={e => updateField('metadata.title', e.target.value)} /></div>
            <div><label>Meta Description</label><textarea className="w-full border p-2 rounded" rows={3} value={formData.metadata.description} onChange={e => updateField('metadata.description', e.target.value)} /></div>
            <div><label>Keywords (comma separated)</label><input className="w-full border p-2 rounded" value={formData.metadata.keywords.join(', ')} onChange={e => updateField('metadata.keywords', e.target.value.split(','))} /></div>
        </div>
    );

    if (loading && !isEditing) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-blue-500 w-8 h-8" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Portfolio & Service Pages</h1>
                    <p className="text-gray-600">Manage detailed content for service category pages.</p>
                </div>
                {!isEditing && (
                    <button onClick={handleCreateNew} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                        <Plus size={20} /> Create New Page
                    </button>
                )}
            </div>

            {successMessage && <div className="bg-green-100 text-green-800 p-4 rounded mb-6 flex items-center"><CheckCircle className="mr-2" /> {successMessage}</div>}
            {error && <div className="bg-red-100 text-red-800 p-4 rounded mb-6 flex items-center"><AlertCircle className="mr-2" /> {error}</div>}

            {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolios.map(item => (
                        <div key={item._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                            <h3 className="text-xl font-bold mb-2">{item.hero.title}</h3>
                            <div className="text-sm text-gray-500 mb-4">Slug: /{item.slug}</div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm font-medium">Delete</button>
                            </div>
                        </div>
                    ))}
                    {portfolios.length === 0 && <p className="text-gray-500 italic">No pages found. Create one to get started.</p>}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Tabs Header */}
                    <div className="flex border-b bg-gray-50 overflow-x-auto">
                        {['hero', 'bento', 'clientPortfolio', 'testimonials', 'faqs', 'gallery', 'metadata'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        {activeTab === 'hero' && renderHeroTab()}
                        {activeTab === 'bento' && renderBentoTab()}
                        {activeTab === 'clientPortfolio' && renderClientPortfolioTab()}
                        {activeTab === 'testimonials' && renderTestimonialsTab()}
                        {activeTab === 'faqs' && renderFaqsTab()}
                        {activeTab === 'gallery' && renderGalleryTab()}
                        {activeTab === 'metadata' && renderMetadataTab()}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-gray-50 border-t flex justify-end gap-3 sticky bottom-0">
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                        <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center"><Save className="w-4 h-4 mr-2" /> Save Page</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioManagement;
