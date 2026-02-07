'use client';

import { useState, useEffect } from 'react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

let toastId = 0;

class ErrorHandler {
  private static toasts: Toast[] = [];
  private static listeners: ((toasts: Toast[]) => void)[] = [];

  static addToast(type: Toast['type'], message: string) {
    const toast: Toast = {
      id: (++toastId).toString(),
      type,
      message
    };
    
    this.toasts.push(toast);
    this.notifyListeners();
    
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 5000);
  }

  static removeToast(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notifyListeners();
  }

  static subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private static notifyListeners() {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  static handleApiError(error: any, context?: string) {
    let message = 'An unexpected error occurred';
    
    if (error?.response?.data?.message) {
      message = error.response.data.message;
    } else if (error?.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    
    if (context) {
      message = `${context}: ${message}`;
    }
    
    this.addToast('error', message);
    console.error('API Error:', error);
  }

  static success(message: string) {
    this.addToast('success', message);
  }

  static error(message: string) {
    this.addToast('error', message);
  }

  static warning(message: string) {
    this.addToast('warning', message);
  }

  static info(message: string) {
    this.addToast('info', message);
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return ErrorHandler.subscribe(setToasts);
  }, []);

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'bg-green-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      case 'warning': return 'bg-yellow-500 text-white';
      case 'info': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg max-w-sm ${getToastStyles(toast.type)}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => ErrorHandler.removeToast(toast.id)}
              className="ml-3 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ErrorHandler };