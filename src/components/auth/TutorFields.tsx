import { Input } from '@/components/ui/Input';
import { useState, useEffect } from 'react';

interface Category {
    id: string;
    name: string;
    description?: string;
}

interface TutorFieldsProps {
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function TutorFields({ formData, onChange }: TutorFieldsProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
s
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories`);
                const data = await response.json();
                console.log('Fetched Categories:', data);
                
                // Ensure data is an array
                const categoriesArray = Array.isArray(data) ? data : [];
                
                setCategories(categoriesArray);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, []);
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                </label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={onChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent text-sm"
                    placeholder="Tell us about yourself..."
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Hourly Rate (৳)"
                    name="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={onChange}
                    required
                    min="0"
                    step="0.01"
                />
                <Input
                    label="Experience (years)"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={onChange}
                    required
                    min="0"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
                >
                    <option value="">Select a category</option>
                    {Array.isArray(categories) && categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <Input
                label="Subjects"
                name="subjects"
                type="text"
                value={formData.subjects}
                onChange={onChange}
                required
                placeholder="Math, Physics, Chemistry"
                helperText="Enter subjects separated by commas"
            />

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Day of Week
                    </label>
                    <select
                        name="dayOfWeek"
                        value={formData.dayOfWeek}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
                    >
                        <option value="">Select Day</option>
                        <option value="1">Saturday</option>
                        <option value="2">Sunday</option>
                        <option value="3">Monday</option>
                        <option value="4">Tuesday</option>
                        <option value="5">Wednesday</option>
                        <option value="6">Thursday</option>
                        <option value="7">Friday</option>
                    </select>
                </div>
                <Input
                    label="Start Time"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={onChange}
                    required
                />
                <Input
                    label="End Time"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    );
}