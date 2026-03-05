import React, { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SubscriberStatus = () => {
  const [subscriberInfo, setSubscriberInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const info = localStorage.getItem('subscriberInfo');
    if (info) {
      setSubscriberInfo(JSON.parse(info));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('subscriberInfo');
    setSubscriberInfo(null);
    navigate('/subscription-verification');
  };

  if (!subscriberInfo?.verified) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-1 text-crec-gold">
        <User size={16} />
        <span>{subscriberInfo.name}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="h-6 px-2 text-gray-500 hover:text-red-500"
      >
        <LogOut size={14} />
      </Button>
    </div>
  );
};

export default SubscriberStatus;
