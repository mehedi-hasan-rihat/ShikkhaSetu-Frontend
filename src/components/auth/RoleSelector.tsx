interface RoleSelectorProps {
    role: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RoleSelector({ role, onChange }: RoleSelectorProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to join as a
            </label>
            <div className="grid grid-cols-2 gap-3">
                <label className={`
                    relative flex cursor-pointer rounded-lg border p-3 focus:outline-none
                    ${role === 'student' ? 'border-[#0AB5F8] bg-blue-50' : 'border-gray-300'}
                `} onClick={() => onChange({ target: { name: 'role', value: 'student' } } as any)}>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-6 h-6 mb-1 bg-[#0AB5F8] rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium">Student</span>
                    </div>
                </label>

                <label className={`
                    relative flex cursor-pointer rounded-lg border p-3 focus:outline-none
                    ${role === 'tutor' ? 'border-[#0AB5F8] bg-blue-50' : 'border-gray-300'}
                `} onClick={() => onChange({ target: { name: 'role', value: 'tutor' } } as any)}>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-6 h-6 mb-1 bg-[#0AB5F8] rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium">Tutor</span>
                    </div>
                </label>
            </div>
        </div>
    );
}