import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, ExternalLink, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useUpcomingEvents } from '@/hooks/useEvents';
import { formatEventDate } from '@/types/events';

const EventPopup = () => {
    const { data: upcomingEvents = [], isLoading } = useUpcomingEvents();
    const [isVisible, setIsVisible] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<any>(null);

    useEffect(() => {
        if (!isLoading && upcomingEvents.length > 0) {
            const latestEvent = upcomingEvents[0];
            const dismissedEventId = localStorage.getItem('dismissed_event_id');
            const dismissedAt = localStorage.getItem('dismissed_event_time');
            
            // Si c'est un nouvel événement OU si on a fermé il y a plus de 24h
            const isDifferentEvent = dismissedEventId !== latestEvent.id?.toString();
            const isOldDismissal = dismissedAt && (new Date().getTime() - parseInt(dismissedAt)) > 24 * 60 * 60 * 1000;

            if (isDifferentEvent || isOldDismissal) {
                // Petit délai pour ne pas agresser l'utilisateur tout de suite au chargement
                const timer = setTimeout(() => {
                    setCurrentEvent(latestEvent);
                    setIsVisible(true);
                }, 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [upcomingEvents, isLoading]);

    const handleClose = () => {
        setIsVisible(false);
        if (currentEvent) {
            localStorage.setItem('dismissed_event_id', currentEvent.id.toString());
            localStorage.setItem('dismissed_event_time', new Date().getTime().toString());
        }
    };

    if (!currentEvent) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    className="fixed bottom-6 right-6 z-[100] max-w-sm w-full p-1"
                >
                    <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-blue-900/10">
                        {/* Barre d'accentuation en haut */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-crec-gold via-amber-400 to-crec-gold" />
                        
                        <div className="p-5">
                            {/* Bouton de fermeture */}
                            <button 
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100/50 text-slate-500 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <div className="flex items-start gap-4">
                                <div className="bg-crec-lightgold/30 p-2.5 rounded-xl text-crec-gold shrink-0">
                                    <Bell className="h-6 w-6 animate-pulse" />
                                </div>
                                
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold tracking-widest text-crec-gold uppercase mb-1">
                                        Nouvel événement
                                    </p>
                                    <h3 className="font-bold text-slate-900 leading-tight mb-2 line-clamp-2">
                                        {currentEvent.title}
                                    </h3>
                                    
                                    <div className="space-y-1 mb-4">
                                        <div className="flex items-center text-xs text-slate-500 gap-2">
                                            <Calendar className="h-3 w-3 text-crec-gold" />
                                            <span>{formatEventDate(currentEvent)}</span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500 gap-2">
                                            <MapPin className="h-3 w-3 text-crec-gold" />
                                            <span className="line-clamp-1">{currentEvent.location}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <Button
                                            asChild
                                            size="sm"
                                            className="flex-1 bg-crec-darkblue hover:bg-blue-900 text-white text-xs font-semibold py-1 rounded-lg"
                                        >
                                            <Link to="/events" onClick={() => setIsVisible(false)}>
                                                Détails <ExternalLink className="ml-1.5 h-3 w-3" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleClose}
                                            className="text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 text-xs"
                                        >
                                            Plus tard
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Décoration subtile en arrière-plan */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-crec-gold/5 rounded-full blur-2xl" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EventPopup;
