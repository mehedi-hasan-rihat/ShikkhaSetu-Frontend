'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (data) {
                router.push('/dashboard');
            } else {
                setError(error?.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center mb-4 space-y-2">
                    <h1 className="text-3xl font-bold text-[#0AB5F8]">SkillBridge</h1>
                    <h2 className="text-xl font-semibold text-gray-900">Sign in to your account</h2>
                    <p className="text-sm text-gray-600">
                        Or{' '}
                        <Link href="/register" className="font-medium text-[#0AB5F8] hover:text-[#0891b2] hover:underline">
                            create a new account
                        </Link>
                    </p>
                </div>

                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Welcome back</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <Input
                                label="Email address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />

                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />

                            <Button type="submit" loading={loading} className="w-full">
                                Sign in
                            </Button>
                        </form>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setEmail('student@example.com');
                                    setPassword('password');
                                }}
                                className="w-full"
                            >
                                Demo Student
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setEmail('tutor@example.com');
                                    setPassword('password');
                                }}
                                className="w-full"
                            >
                                Demo Tutor
                            </Button>
                        </div>
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