import React from 'react';

interface NotificationProps {
  type?: 'success' | 'warning' | 'error';
  message: string;
}

const Notification: React.FC<NotificationProps> = ({
  type = 'success',
  message,
}) => {
  const variantClasses = {
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    error: 'bg-red-500 text-white',
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${variantClasses[type]} fixed bottom-0 left-0 w-full max-w-sm mx-auto z-50`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xl font-semibold">{message}</span>
        </div>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 ml-2"
          onClick={() => console.log('Close notification')}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
