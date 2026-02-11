'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { ErrorHandler } from '@/utils/errorHandler';

interface AvailabilitySlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const dayDisplayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);
  const [newSlot, setNewSlot] = useState({
    dayOfWeek: 0,
    startTime: '09:00',
    endTime: '17:00'
  });

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await fetchWithAuth('/tutors/availability');
      if (response.ok) {
        const data = await response.json();
        setSlots(data);
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Load availability');
    } finally {
      setLoading(false);
    }
  };

  const addSlot = async () => {
    setSaving(true);
    try {
      const slotData = {
        dayOfWeek: dayNames[newSlot.dayOfWeek],
        startTime: newSlot.startTime,
        endTime: newSlot.endTime
      };
      const response = await fetchWithAuth('/tutors/availability', {
        method: 'POST',
        body: JSON.stringify(slotData)
      });
      if (response.ok) {
        const newSlotData = await response.json();
        setSlots(prev => [...prev, newSlotData]);
        setNewSlot({ dayOfWeek: 0, startTime: '09:00', endTime: '17:00' });
        ErrorHandler.success('Slot added successfully');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Add slot');
    } finally {
      setSaving(false);
    }
  };

  const updateSlot = async (slot: AvailabilitySlot) => {
    setSaving(true);
    try {
      const availabilitySlots = slots.map(s => 
        s.id === slot.id 
          ? { dayOfWeek: dayNames[slot.dayOfWeek], startTime: slot.startTime, endTime: slot.endTime }
          : { dayOfWeek: dayNames[s.dayOfWeek], startTime: s.startTime, endTime: s.endTime }
      );
      
      const response = await fetchWithAuth('/tutors/availability', {
        method: 'PUT',
        body: JSON.stringify({ availabilitySlots })
      });
      if (response.ok) {
        const updatedSlots = slots.map(s => 
          s.id === slot.id ? { ...s, ...slot } : s
        );
        setSlots(updatedSlots);
        setEditingSlot(null);
        ErrorHandler.success('Slot updated successfully');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Update slot');
    } finally {
      setSaving(false);
    }
  };

  const deleteSlot = async (id: string) => {
    try {
      const response = await fetchWithAuth(`/tutors/availability/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchAvailability();
        ErrorHandler.success('Slot deleted successfully');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Delete slot');
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Availability</h1>
        <p className="text-gray-600 mt-1">Set your available time slots for students to book</p>
      </div>

      {/* Add New Slot */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Time Slot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
              <select
                value={newSlot.dayOfWeek}
                onChange={(e) => setNewSlot({...newSlot, dayOfWeek: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
              >
                {dayDisplayNames.map((day, index) => (
                  <option key={index} value={index}>{day}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={newSlot.startTime}
                onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={newSlot.endTime}
                onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addSlot} disabled={saving} className="w-full bg-[#0AB5F8] hover:bg-[#0891b2]">
                {saving ? 'Adding...' : 'Add Slot'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Slots */}
      <Card>
        <CardHeader>
          <CardTitle>Current Availability</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-[#0AB5F8] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No availability slots set</p>
              <p className="text-gray-400 text-sm">Add your first time slot above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {slots.map((slot) => (
                <div key={slot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="font-medium text-gray-900 w-20">
                      {dayDisplayNames[slot.dayOfWeek]}
                    </span>
                    {editingSlot?.id === slot.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={editingSlot.startTime}
                          onChange={(e) => setEditingSlot({...editingSlot, startTime: e.target.value})}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={editingSlot.endTime}
                          onChange={(e) => setEditingSlot({...editingSlot, endTime: e.target.value})}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-600">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      slot.isAvailable ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      {slot.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {editingSlot?.id === slot.id ? (
                      <>
                        <Button
                          onClick={() => updateSlot(editingSlot)}
                          disabled={saving}
                          className="bg-[#0AB5F8] hover:bg-[#0891b2] text-white px-3 py-1 text-sm"
                        >
                          {saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          onClick={() => setEditingSlot(null)}
                          variant="outline"
                          className="px-3 py-1 text-sm"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setEditingSlot(slot)}
                          variant="outline"
                          className="text-[#0AB5F8] border-[#0AB5F8] hover:bg-[#0AB5F8] hover:text-white px-3 py-1 text-sm"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteSlot(slot.id)}
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white px-3 py-1 text-sm"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}