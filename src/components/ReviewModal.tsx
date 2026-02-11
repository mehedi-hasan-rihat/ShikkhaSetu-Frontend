'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { ErrorHandler } from '@/utils/errorHandler';

interface ReviewModalProps {
  bookingId: string;
  tutorName: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ReviewModal({ bookingId, tutorName, isOpen, onClose, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          bookingId,
          rating,
          comment
        })
      });
      
      if (response.ok) {
        ErrorHandler.success('Review submitted successfully');
        onSubmit();
        onClose();
        setRating(0);
        setComment('');
      } else {
        ErrorHandler.error('Failed to submit review');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Submit review');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Review {tutorName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0AB5F8]"
              rows={4}
              placeholder="Share your experience..."
            />
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={submitReview} 
              disabled={rating === 0 || loading}
              className="flex-1 bg-[#0AB5F8] hover:bg-[#0891b2]"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}