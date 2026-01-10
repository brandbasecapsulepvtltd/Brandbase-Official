import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import {
    Save, Loader2, CheckCircle, AlertCircle, RefreshCw,
    Sparkles, Users, Target, Eye, Calendar, TrendingUp, Lightbulb,
    Plus, Trash2, Image as ImageIcon, Link, FileText,
    ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';

// Input component - defined outside to prevent re-creation
const InputField = ({ label, value, onChange, type = 'text', placeholder, rows }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
        {rows ? (
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
        ) : (
            <input
                type={type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
        )}
    </div>
);

// Image preview component - defined outside to prevent re-creation
const ImagePreview = ({ url, alt }) => (
    url && (
        <div className="mt-2 relative group">
            <img
                src={url}
                alt={alt || 'Preview'}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                onError={(e) => e.target.style.display = 'none'}
            />
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ExternalLink className="w-4 h-4 text-gray-600" />
            </a>
        </div>
    )
);

const AboutSectionManagement = () => {
    // State
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [activeSection, setActiveSection] = useState('hero');
    const [hasChanges, setHasChanges] = useState(false);

    // Section configuration
    const sections = [
        { id: 'hero', name: 'Hero', icon: Sparkles, color: 'blue' },
        { id: 'aboutSection', name: 'About', icon: Users, color: 'green' },
        { id: 'mission', name: 'Mission', icon: Target, color: 'purple' },
        { id: 'vision', name: 'Vision', icon: Eye, color: 'indigo' },
        { id: 'timeline', name: 'Timeline', icon: Calendar, color: 'yellow' },
        { id: 'impact', name: 'Impact', icon: TrendingUp, color: 'pink' },
        { id: 'principles', name: 'Principles', icon: Lightbulb, color: 'orange' }
    ];

    // Fetch content on mount
    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await adminAxios.get('/api/about-section');
            setContent(response.data.data);
        } catch (err) {
            setError('Failed to fetch content. Please check your connection.');
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    // Save all content
    const saveContent = async () => {
        try {
            setSaving(true);
            setError(null);
            await adminAxios.put('/api/about-section', content);
            setSuccessMessage('Content saved successfully!');
            setHasChanges(false);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save content.');
            console.error('Error saving content:', err);
        } finally {
            setSaving(false);
        }
    };

    // Reset to defaults
    const resetToDefaults = async () => {
        if (!window.confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
            return;
        }
        try {
            setLoading(true);
            await adminAxios.post('/api/about-section/initialize');
            await fetchContent();
            setSuccessMessage('Content reset to defaults!');
            setHasChanges(false);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to reset content.');
            console.error('Error resetting content:', err);
        } finally {
            setLoading(false);
        }
    };

    // Update nested field
    const updateField = (section, path, value) => {
        setContent(prev => {
            const newContent = { ...prev };
            const keys = path.split('.');
            let current = newContent[section] = { ...prev[section] };

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;

            return newContent;
        });
        setHasChanges(true);
    };

    // Update array item
    const updateArrayItem = (section, arrayPath, index, value) => {
        setContent(prev => {
            const newContent = { ...prev };
            const keys = arrayPath.split('.');
            let current = newContent[section] = { ...prev[section] };

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }

            const lastKey = keys[keys.length - 1];
            current[lastKey] = [...current[lastKey]];
            current[lastKey][index] = value;

            return newContent;
        });
        setHasChanges(true);
    };

    // Add array item
    const addArrayItem = (section, arrayPath, defaultValue) => {
        setContent(prev => {
            const newContent = { ...prev };
            const keys = arrayPath.split('.');
            let current = newContent[section] = { ...prev[section] };

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }

            const lastKey = keys[keys.length - 1];
            current[lastKey] = [...(current[lastKey] || []), defaultValue];

            return newContent;
        });
        setHasChanges(true);
    };

    // Remove array item
    const removeArrayItem = (section, arrayPath, index) => {
        setContent(prev => {
            const newContent = { ...prev };
            const keys = arrayPath.split('.');
            let current = newContent[section] = { ...prev[section] };

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }

            const lastKey = keys[keys.length - 1];
            current[lastKey] = current[lastKey].filter((_, i) => i !== index);

            return newContent;
        });
        setHasChanges(true);
    };

    // Add milestone
    const addMilestone = () => {
        const year = new Date().getFullYear();
        setContent(prev => ({
            ...prev,
            timeline: {
                ...prev.timeline,
                milestones: {
                    ...prev.timeline.milestones,
                    [year]: {
                        title: year.toString(),
                        text: 'New milestone description',
                        img: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg'
                    }
                }
            }
        }));
        setHasChanges(true);
    };

    // Remove milestone
    const removeMilestone = (year) => {
        setContent(prev => {
            const newMilestones = { ...prev.timeline.milestones };
            delete newMilestones[year];
            return {
                ...prev,
                timeline: {
                    ...prev.timeline,
                    milestones: newMilestones
                }
            };
        });
        setHasChanges(true);
    };

    // Update milestone
    const updateMilestone = (year, field, value) => {
        setContent(prev => ({
            ...prev,
            timeline: {
                ...prev.timeline,
                milestones: {
                    ...prev.timeline.milestones,
                    [year]: {
                        ...prev.timeline.milestones[year],
                        [field]: value
                    }
                }
            }
        }));
        setHasChanges(true);
    };


    // Render hero section form
    const renderHeroForm = () => (
        <div className="space-y-4">
            <InputField
                label="Title"
                value={content?.hero?.title}
                onChange={(v) => updateField('hero', 'title', v)}
                placeholder="e.g., Brandbase Capsule"
            />
            <InputField
                label="Heading"
                value={content?.hero?.heading}
                onChange={(v) => updateField('hero', 'heading', v)}
                placeholder="e.g., Pioneering Digital Excellence"
            />
            <InputField
                label="Highlighted Text"
                value={content?.hero?.highlighted}
                onChange={(v) => updateField('hero', 'highlighted', v)}
                placeholder="e.g., Since 2018"
            />
            <InputField
                label="Description"
                value={content?.hero?.description}
                onChange={(v) => updateField('hero', 'description', v)}
                rows={4}
                placeholder="Main hero description..."
            />
        </div>
    );

    // Render about section form
    const renderAboutForm = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Basic Info
                </h3>
                <InputField
                    label="Title"
                    value={content?.aboutSection?.title}
                    onChange={(v) => updateField('aboutSection', 'title', v)}
                />
                <InputField
                    label="Description 1"
                    value={content?.aboutSection?.description1}
                    onChange={(v) => updateField('aboutSection', 'description1', v)}
                    rows={3}
                />
                <InputField
                    label="Description 2"
                    value={content?.aboutSection?.description2}
                    onChange={(v) => updateField('aboutSection', 'description2', v)}
                    rows={3}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" /> Image
                </h3>
                <InputField
                    label="Image URL"
                    value={content?.aboutSection?.image}
                    onChange={(v) => updateField('aboutSection', 'image', v)}
                    type="url"
                />
                <ImagePreview url={content?.aboutSection?.image} />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Link className="w-5 h-5" /> Social Links
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Facebook"
                        value={content?.aboutSection?.socials?.facebook}
                        onChange={(v) => updateField('aboutSection', 'socials.facebook', v)}
                        type="url"
                    />
                    <InputField
                        label="Instagram"
                        value={content?.aboutSection?.socials?.instagram}
                        onChange={(v) => updateField('aboutSection', 'socials.instagram', v)}
                        type="url"
                    />
                    <InputField
                        label="LinkedIn"
                        value={content?.aboutSection?.socials?.linkedin}
                        onChange={(v) => updateField('aboutSection', 'socials.linkedin', v)}
                        type="url"
                    />
                    <InputField
                        label="YouTube"
                        value={content?.aboutSection?.socials?.youtube}
                        onChange={(v) => updateField('aboutSection', 'socials.youtube', v)}
                        type="url"
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Years"
                        value={content?.aboutSection?.stats?.years}
                        onChange={(v) => updateField('aboutSection', 'stats.years', v)}
                        placeholder="e.g., 10+"
                    />
                    <InputField
                        label="Projects Delivered"
                        value={content?.aboutSection?.stats?.projectsDelivered}
                        onChange={(v) => updateField('aboutSection', 'stats.projectsDelivered', v)}
                        placeholder="e.g., 1000+"
                    />
                    <InputField
                        label="Projects"
                        value={content?.aboutSection?.stats?.projects}
                        onChange={(v) => updateField('aboutSection', 'stats.projects', v)}
                        placeholder="e.g., 500+"
                    />
                    <InputField
                        label="Satisfaction"
                        value={content?.aboutSection?.stats?.satisfaction}
                        onChange={(v) => updateField('aboutSection', 'stats.satisfaction', v)}
                        placeholder="e.g., 98%"
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> Call to Action
                </h3>
                <InputField
                    label="CTA Title"
                    value={content?.aboutSection?.cta?.title}
                    onChange={(v) => updateField('aboutSection', 'cta.title', v)}
                />
                <InputField
                    label="CTA Subtitle"
                    value={content?.aboutSection?.cta?.subtitle}
                    onChange={(v) => updateField('aboutSection', 'cta.subtitle', v)}
                />
                <InputField
                    label="CTA Text"
                    value={content?.aboutSection?.cta?.text}
                    onChange={(v) => updateField('aboutSection', 'cta.text', v)}
                    rows={3}
                />
                <InputField
                    label="Button Text"
                    value={content?.aboutSection?.cta?.buttonText}
                    onChange={(v) => updateField('aboutSection', 'cta.buttonText', v)}
                />
                <InputField
                    label="Button Link"
                    value={content?.aboutSection?.cta?.buttonLink}
                    onChange={(v) => updateField('aboutSection', 'cta.buttonLink', v)}
                    placeholder="/services"
                />
            </div>
        </div>
    );

    // Render mission/vision form
    const renderMissionVisionForm = (sectionId) => {
        const sectionData = content?.[sectionId];
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Info</h3>
                    <InputField
                        label="Title"
                        value={sectionData?.title}
                        onChange={(v) => updateField(sectionId, 'title', v)}
                    />
                    <InputField
                        label="Subheading"
                        value={sectionData?.subheading}
                        onChange={(v) => updateField(sectionId, 'subheading', v)}
                    />
                    <InputField
                        label="Description"
                        value={sectionData?.description}
                        onChange={(v) => updateField(sectionId, 'description', v)}
                        rows={3}
                    />
                    {sectionId === 'mission' && (
                        <InputField
                            label="Highlight"
                            value={sectionData?.highlight}
                            onChange={(v) => updateField(sectionId, 'highlight', v)}
                        />
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Key Points</h3>
                        <button
                            type="button"
                            onClick={() => addArrayItem(sectionId, 'points', 'New point')}
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" /> Add Point
                        </button>
                    </div>
                    <div className="space-y-3">
                        {sectionData?.points?.map((point, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                                    {index + 1}
                                </div>
                                <textarea
                                    value={point}
                                    onChange={(e) => updateArrayItem(sectionId, 'points', index, e.target.value)}
                                    rows={2}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem(sectionId, 'points', index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" /> Image
                    </h3>
                    <InputField
                        label="Image URL"
                        value={sectionData?.image?.url}
                        onChange={(v) => updateField(sectionId, 'image.url', v)}
                        type="url"
                    />
                    <ImagePreview url={sectionData?.image?.url} alt={sectionData?.image?.alt} />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <InputField
                            label="Alt Text"
                            value={sectionData?.image?.alt}
                            onChange={(v) => updateField(sectionId, 'image.alt', v)}
                        />
                        <InputField
                            label="Caption Title"
                            value={sectionData?.image?.captionTitle}
                            onChange={(v) => updateField(sectionId, 'image.captionTitle', v)}
                        />
                    </div>
                    <InputField
                        label="Caption Text"
                        value={sectionData?.image?.captionText}
                        onChange={(v) => updateField(sectionId, 'image.captionText', v)}
                    />
                </div>
            </div>
        );
    };

    // Render timeline form
    const renderTimelineForm = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Info</h3>
                <InputField
                    label="Title"
                    value={content?.timeline?.title}
                    onChange={(v) => updateField('timeline', 'title', v)}
                />
                <InputField
                    label="Subtitle"
                    value={content?.timeline?.subtitle}
                    onChange={(v) => updateField('timeline', 'subtitle', v)}
                />
                <InputField
                    label="Description"
                    value={content?.timeline?.description}
                    onChange={(v) => updateField('timeline', 'description', v)}
                    rows={2}
                />
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Milestones</h3>
                    <button
                        type="button"
                        onClick={addMilestone}
                        className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm hover:bg-yellow-200 transition-colors flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add Year
                    </button>
                </div>
                <div className="space-y-4">
                    {content?.timeline?.milestones && Object.entries(content.timeline.milestones)
                        .sort(([a], [b]) => Number(a) - Number(b))
                        .map(([year, milestone]) => (
                            <div key={year} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg font-bold text-lg">
                                            {year}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeMilestone(year)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <InputField
                                        label="Title"
                                        value={milestone.title}
                                        onChange={(v) => updateMilestone(year, 'title', v)}
                                    />
                                    <InputField
                                        label="Description"
                                        value={milestone.text}
                                        onChange={(v) => updateMilestone(year, 'text', v)}
                                        rows={3}
                                    />
                                    <InputField
                                        label="Image URL"
                                        value={milestone.img}
                                        onChange={(v) => updateMilestone(year, 'img', v)}
                                        type="url"
                                    />
                                    <ImagePreview url={milestone.img} />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );

    // Render impact form
    const renderImpactForm = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Info</h3>
                <InputField
                    label="Title"
                    value={content?.impact?.title}
                    onChange={(v) => updateField('impact', 'title', v)}
                />
                <InputField
                    label="Subheading"
                    value={content?.impact?.subheading}
                    onChange={(v) => updateField('impact', 'subheading', v)}
                />
                <InputField
                    label="Description"
                    value={content?.impact?.description}
                    onChange={(v) => updateField('impact', 'description', v)}
                    rows={3}
                />
                <InputField
                    label="Body"
                    value={content?.impact?.body}
                    onChange={(v) => updateField('impact', 'body', v)}
                    rows={3}
                />
                <InputField
                    label="Tagline"
                    value={content?.impact?.tagline}
                    onChange={(v) => updateField('impact', 'tagline', v)}
                />
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Button Text"
                        value={content?.impact?.impactButtonText}
                        onChange={(v) => updateField('impact', 'impactButtonText', v)}
                        placeholder="Start Your Project"
                    />
                    <InputField
                        label="Button Link"
                        value={content?.impact?.impactButtonLink}
                        onChange={(v) => updateField('impact', 'impactButtonLink', v)}
                        placeholder="/appointment"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Statistics</h3>
                    <button
                        type="button"
                        onClick={() => addArrayItem('impact', 'stats', 'New statistic')}
                        className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg text-sm hover:bg-pink-200 transition-colors flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add Stat
                    </button>
                </div>
                <div className="space-y-3">
                    {content?.impact?.stats?.map((stat, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-medium flex-shrink-0">
                                {index + 1}
                            </div>
                            <input
                                type="text"
                                value={stat}
                                onChange={(e) => updateArrayItem('impact', 'stats', index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('impact', 'stats', index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Render principles form
    const renderPrinciplesForm = () => {
        const addPrinciple = () => {
            const newId = (content?.principles?.items?.length || 0) + 1;
            addArrayItem('principles', 'items', {
                id: newId,
                do: { title: 'New Do', text: 'Description', src: '' },
                dont: { title: 'New Don\'t', text: 'Description', src: '' }
            });
        };

        const updatePrincipleField = (index, type, field, value) => {
            const items = [...content.principles.items];
            items[index] = {
                ...items[index],
                [type]: { ...items[index][type], [field]: value }
            };
            setContent(prev => ({
                ...prev,
                principles: { ...prev.principles, items }
            }));
            setHasChanges(true);
        };

        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Info</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="Subtitle (appears first)"
                            value={content?.principles?.subtitle}
                            onChange={(v) => updateField('principles', 'subtitle', v)}
                            placeholder="e.g., OUR"
                        />
                        <InputField
                            label="Title (appears second)"
                            value={content?.principles?.title}
                            onChange={(v) => updateField('principles', 'title', v)}
                            placeholder="e.g., PRINCIPLES"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Principles List</h3>
                        <button
                            type="button"
                            onClick={addPrinciple}
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition-colors flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" /> Add Principle
                        </button>
                    </div>
                    <div className="space-y-4">
                        {content?.principles?.items?.map((item, index) => (
                            <div key={item.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-lg font-bold">
                                        Principle #{index + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('principles', 'items', index)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Do Card */}
                                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <span className="font-medium text-green-800">DO</span>
                                        </div>
                                        <InputField
                                            label="Title"
                                            value={item.do?.title}
                                            onChange={(v) => updatePrincipleField(index, 'do', 'title', v)}
                                        />
                                        <InputField
                                            label="Text"
                                            value={item.do?.text}
                                            onChange={(v) => updatePrincipleField(index, 'do', 'text', v)}
                                        />
                                        <InputField
                                            label="Image URL"
                                            value={item.do?.src}
                                            onChange={(v) => updatePrincipleField(index, 'do', 'src', v)}
                                            type="url"
                                        />
                                        <ImagePreview url={item.do?.src} />
                                    </div>
                                    {/* Don't Card */}
                                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                            <span className="font-medium text-red-800">DON'T</span>
                                        </div>
                                        <InputField
                                            label="Title"
                                            value={item.dont?.title}
                                            onChange={(v) => updatePrincipleField(index, 'dont', 'title', v)}
                                        />
                                        <InputField
                                            label="Text"
                                            value={item.dont?.text}
                                            onChange={(v) => updatePrincipleField(index, 'dont', 'text', v)}
                                        />
                                        <InputField
                                            label="Image URL"
                                            value={item.dont?.src}
                                            onChange={(v) => updatePrincipleField(index, 'dont', 'src', v)}
                                            type="url"
                                        />
                                        <ImagePreview url={item.dont?.src} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Render active section content
    const renderSectionContent = () => {
        switch (activeSection) {
            case 'hero': return renderHeroForm();
            case 'aboutSection': return renderAboutForm();
            case 'mission': return renderMissionVisionForm('mission');
            case 'vision': return renderMissionVisionForm('vision');
            case 'timeline': return renderTimelineForm();
            case 'impact': return renderImpactForm();
            case 'principles': return renderPrinciplesForm();
            default: return null;
        }
    };

    // Loading state
    if (loading && !content) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
                    <p className="mt-4 text-gray-600">Loading content...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">About Us Content</h1>
                            <p className="text-sm text-gray-500 mt-0.5">Manage your About Us page content</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {hasChanges && (
                                <span className="text-sm text-amber-600 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                                    Unsaved changes
                                </span>
                            )}
                            <button
                                onClick={resetToDefaults}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Reset
                            </button>
                            <button
                                onClick={saveContent}
                                disabled={saving || !hasChanges}
                                className={`px-5 py-2 rounded-lg flex items-center gap-2 transition-all ${saving || !hasChanges
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                    }`}
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="max-w-7xl mx-auto px-6 pt-4">
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-green-700">{successMessage}</span>
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                        <span className="text-red-700">{error}</span>
                        <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
                            ×
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex gap-6">
                    {/* Sidebar Navigation */}
                    <div className="w-56 flex-shrink-0">
                        <nav className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full px-4 py-3 flex items-center gap-3 transition-all text-left border-l-4 ${isActive
                                            ? `bg-${section.color}-50 border-${section.color}-500 text-${section.color}-700`
                                            : 'border-transparent text-gray-600 hover:bg-gray-50'
                                            }`}
                                        style={{
                                            backgroundColor: isActive ? `var(--${section.color}-50, #EFF6FF)` : undefined,
                                            borderLeftColor: isActive ? `var(--${section.color}-500, #3B82F6)` : 'transparent',
                                            color: isActive ? `var(--${section.color}-700, #1D4ED8)` : undefined
                                        }}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? '' : 'text-gray-400'}`} />
                                        <span className="font-medium">{section.name}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                                {(() => {
                                    const section = sections.find(s => s.id === activeSection);
                                    const Icon = section?.icon;
                                    return (
                                        <>
                                            <div className={`w-10 h-10 rounded-lg bg-${section?.color}-100 flex items-center justify-center`}
                                                style={{ backgroundColor: `var(--${section?.color}-100, #DBEAFE)` }}>
                                                {Icon && <Icon className="w-5 h-5" style={{ color: `var(--${section?.color}-600, #2563EB)` }} />}
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">{section?.name} Section</h2>
                                                <p className="text-sm text-gray-500">Edit the content for this section</p>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                            {renderSectionContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSectionManagement;
