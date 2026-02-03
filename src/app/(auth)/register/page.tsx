'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { authClient } from '@/lib/auth-client';
import { useAuth } from '@/providers/AuthProvider';
import RoleSelector from '@/components/auth/RoleSelector';
import TutorFields from '@/components/auth/TutorFields';

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const roleParam = searchParams.get('role');
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: roleParam === 'tutor' ? 'tutor' : 'student',
        bio: '',
        hourlyRate: '',
        experience: '',
        subjects: '',
        categoryId: '',
        availabilitySlots: [{
            dayOfWeek: '',
            startTime: '',
            endTime: '',
        }],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'role') {
            const params = new URLSearchParams(searchParams.toString());
            if (value === 'tutor') {
                params.set('role', 'tutor');
            } else {
                params.delete('role');
            }
            router.replace(`/register?${params.toString()}`);
        }

        if (['dayOfWeek', 'startTime', 'endTime'].includes(name)) {
            setFormData(prev => ({
                ...prev,
                availabilitySlots: [{
                    ...prev.availabilitySlots[0],
                    [name]: value
                }]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                role: formData.role,
                ...(formData.role === 'tutor' && {
                    bio: formData.bio,
                    hourlyRate: parseFloat(formData.hourlyRate),
                    experience: parseInt(formData.experience),
                    subjects: formData.subjects,
                    categoryId: formData.categoryId,
                    availabilitySlots: formData.availabilitySlots.map(slot => ({
                        dayOfWeek: parseInt(slot.dayOfWeek),
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                    })),
                } as any)
            });

            if (data) {
                router.push('/dashboard');
            } else {
                setError(error?.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
            <div className={`mx-auto ${formData.role === 'tutor' ? 'max-w-4xl' : 'max-w-md'}`}>
                <div className="text-center mb-4 space-y-2">
                    <h1 className="text-3xl font-bold text-[#0AB5F8]">SkillBridge</h1>
                    <h2 className="text-xl font-semibold text-gray-900">Create your account</h2>
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-[#0AB5F8] hover:text-[#0891b2] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Join SkillBridge</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <div className={`${formData.role === 'tutor' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}`}>
                                <div className="space-y-4">
                                    <RoleSelector role={formData.role} onChange={handleChange} />

                                    <Input
                                        label="Full name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="name"
                                    />

                                    <Input
                                        label="Email address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                    />

                                    <Input
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        autoComplete="new-password"
                                        helperText="Must be at least 8 characters"
                                    />

                                    <Input
                                        label="Confirm password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>

                                {formData.role === 'tutor' && (
                                    <TutorFields 
                                        formData={{
                                            ...formData,
                                            dayOfWeek: formData.availabilitySlots[0].dayOfWeek,
                                            startTime: formData.availabilitySlots[0].startTime,
                                            endTime: formData.availabilitySlots[0].endTime,
                                        }} 
                                        onChange={handleChange} 
                                    />
                                )}
                            </div>

                            <Button type="submit" loading={loading} className="w-full">
                                Create account
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-4 text-center">
                    <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}