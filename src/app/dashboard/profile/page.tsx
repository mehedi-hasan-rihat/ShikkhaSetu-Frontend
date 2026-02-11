'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { ErrorHandler } from '@/utils/errorHandler';

interface Category {
    id: string;
    name: string;
    description?: string;
}

interface TutorProfile {
    id: string;
    userId: string;
    bio?: string;
    hourlyRate: number;
    experience: number;
    subjects: string[];
    categoryId: string;
    rating: number;
    totalReviews: number;
    isAvailable: boolean;
    category: Category;
}

export default function ProfilePage() {
    const { user } = useAuth();
    const [fetchLoading, setFetchLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        hourlyRate: '',
        experience: '',
        subjects: '',
        categoryId: '',
        isAvailable: true,
        image: null as File | null
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
            
            if (user.role === 'TUTOR') {
                fetchProfile();
                fetchCategories();
            } else if (user.role === 'STUDENT') {
                fetchProfile();
            } else if (user.role === 'ADMIN') {
                fetchProfile();
            } else {
                setFetchLoading(false);
            }
        }
    }, [user]);

    const fetchCategories = async () => {
        try {
            const response = await fetchWithAuth('/admin/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchProfile = async () => {
        try {
            let endpoint = '/students/profile';
            if (user?.role === 'TUTOR') endpoint = '/tutors/profile';
            if (user?.role === 'ADMIN') endpoint = '/admin/profile';
            
            const response = await fetchWithAuth(endpoint);
            
            if (response.ok) {
                const data = await response.json();
                if (user?.role === 'STUDENT' || user?.role === 'ADMIN') {
                    setFormData(prev => ({
                        ...prev,
                        name: data.name || '',
                        phone: data.phone || ''
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        name: data.user?.name || data.name || '',
                        phone: data.user?.phone || data.phone || '',
                        bio: data.bio || '',
                        hourlyRate: data.hourlyRate?.toString() || '',
                        experience: data.experience?.toString() || '',
                        subjects: Array.isArray(data.subjects) ? data.subjects.join(', ') : '',
                        categoryId: data.categoryId || '',
                        isAvailable: data.isAvailable ?? true
                    }));
                }
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setFetchLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            let endpoint = '/students/profile';
            if (user?.role === 'TUTOR') endpoint = '/tutors/profile';
            if (user?.role === 'ADMIN') endpoint = '/admin/profile';
            
            const response = await fetchWithAuth(endpoint, {
                method: 'PUT',
                body: JSON.stringify(user?.role === 'STUDENT' || user?.role === 'ADMIN' ? {
                    name: formData.name,
                    phone: formData.phone
                } : {
                    ...formData,
                    hourlyRate: parseFloat(formData.hourlyRate),
                    experience: parseInt(formData.experience),
                    subjects: formData.subjects.split(',').map(s => s.trim()),
                    categoryId: formData.categoryId || null
                })
            });
            
            if (response.ok) {
                ErrorHandler.success('Profile updated successfully!');
            } else {
                ErrorHandler.error('Failed to update profile');
            }
        } catch (error) {
            ErrorHandler.handleApiError(error, 'Update profile');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#0AB5F8] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-600 mt-2">Update your profile information</p>
            </div>

            <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-gray-900">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled
                            />

                            {user?.role === 'TUTOR' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category
                                            </label>
                                            <select
                                                name="categoryId"
                                                value={formData.categoryId}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-end">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="isAvailable"
                                                    checked={formData.isAvailable}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                                                    className="mr-2 text-[#0AB5F8] focus:ring-[#0AB5F8]"
                                                />
                                                <span className="text-sm font-medium text-gray-700">Available for sessions</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Profile Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent resize-none"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Hourly Rate (৳)"
                                            name="hourlyRate"
                                            type="number"
                                            value={formData.hourlyRate}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                        <Input
                                            label="Experience (years)"
                                            name="experience"
                                            type="number"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                    </div>

                                    <Input
                                        label="Subjects"
                                        name="subjects"
                                        value={formData.subjects}
                                        onChange={handleChange}
                                        placeholder="Math, Physics, Chemistry"
                                        helperText="Enter subjects separated by commas"
                                    />
                                </>
                            )}

                            <Button type="submit" loading={loading} className="w-full bg-[#0AB5F8] hover:bg-[#0891b2]">
                                Update Profile
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-gray-900">Profile Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                {formData.image ? (
                                    <img 
                                        src={URL.createObjectURL(formData.image)} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{formData.name || 'Your Name'}</h3>
                            <p className="text-gray-600">{formData.email}</p>
                            {formData.phone && <p className="text-gray-600">{formData.phone}</p>}
                            {user?.role === 'TUTOR' && (
                                <div className="mt-4 space-y-2">
                                    {formData.bio && <p className="text-sm text-gray-700">{formData.bio}</p>}
                                    {formData.hourlyRate && <p className="text-sm font-medium text-[#0AB5F8]">৳{formData.hourlyRate}/hour</p>}
                                    {formData.experience && <p className="text-sm text-gray-600">{formData.experience} years experience</p>}
                                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                        formData.isAvailable ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                                    }`}>
                                        {formData.isAvailable ? 'Available' : 'Unavailable'}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}