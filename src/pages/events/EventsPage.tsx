import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const events = [
	{
		id: 1,
		title: "Journée Portes Ouvertes",
		date: "2024-04-15",
		time: "10:00 - 17:00",
		location: "Campus Principal",
		description: "Découvrez nos formations et rencontrez nos équipes pédagogiques",
		type: "upcoming",
		image: "/img/events/open-day.jpg",
	},
	{
		id: 2,
		title: "Conférence sur l'IA",
		date: "2024-04-20",
		time: "14:00 - 16:00",
		location: "Amphithéâtre A",
		description: "Les dernières avancées en Intelligence Artificielle",
		type: "upcoming",
		image: "/img/events/ai-conference.jpg",
	},
	{
		id: 3,
		title: "Workshop Web Development",
		date: "2024-03-15",
		time: "09:00 - 17:00",
		location: "Salle Informatique",
		description: "Apprenez les bases du développement web moderne",
		type: "past",
		image: "/img/events/web-workshop.jpg",
	},
];

const EventsPage = () => {
	const upcomingEvents = events.filter((event) => event.type === "upcoming");
	const pastEvents = events.filter((event) => event.type === "past");

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
			{/* Hero Section - Style ContactPage */}
			<section className="relative w-full overflow-hidden">
				{/* Background with parallax effect */}
				<div className="absolute inset-0 bg-[url('/img/actualite.png')] bg-cover bg-center" />
				<div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/80 via-crec-darkblue/60 to-crec-darkblue/90 backdrop-blur-[2px]" />
				
				{/* Accent elements */}
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.15 }}
					transition={{ duration: 1.5 }}
					className="absolute top-20 right-20 w-64 h-64 rounded-full bg-crec-gold blur-3xl"
				/>
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.1 }}
					transition={{ duration: 1.5, delay: 0.3 }}
					className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl"
				/>
				
				{/* Content */}
				<div className="min-h-[350px] md:min-h-[400px] flex flex-col items-center justify-center text-center relative z-10 text-white p-6 md:p-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="max-w-4xl mx-auto"
					>
						<motion.div 
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8 }}
							className="mb-4 inline-flex px-4 py-2 rounded-full items-center bg-white/10 backdrop-blur-md border border-white/20"
						>
							<motion.div 
								animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, repeatType: "reverse", duration: 1.5 } }}
								className="w-2 h-2 rounded-full bg-crec-gold mr-2" 
							/>
							<span className="text-sm font-medium">Agenda du CREC</span>
						</motion.div>
						
						<h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
							Événements
						</h1>
						<p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
							Découvrez nos événements à venir et revivez les moments forts
						</p>
					</motion.div>
				</div>
				
				{/* Wave divider */}
				<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]" fill="#ffffff">
						<path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
					</svg>
				</div>
			</section>

			{/* Upcoming Events Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8">Événements à venir</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{upcomingEvents.map((event) => (
							<Card key={event.id} className="overflow-hidden">
								<div className="aspect-video relative">
									<img
										src={event.image}
										alt={event.title}
										className="w-full h-full object-cover"
									/>
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-bold mb-2">{event.title}</h3>
									<p className="text-gray-600 mb-4">{event.description}</p>

									<div className="space-y-2 mb-6">
										<div className="flex items-center text-sm text-gray-500">
											<Calendar className="w-4 h-4 mr-2" />
											<span>{new Date(event.date).toLocaleDateString()}</span>
										</div>
										<div className="flex items-center text-sm text-gray-500">
											<Clock className="w-4 h-4 mr-2" />
											<span>{event.time}</span>
										</div>
										<div className="flex items-center text-sm text-gray-500">
											<MapPin className="w-4 h-4 mr-2" />
											<span>{event.location}</span>
										</div>
									</div>

									<Button
										asChild
										className="w-full bg-crec-gold hover:bg-crec-lightgold text-white"
									>
										<Link to={`/events/${event.id}`}>En savoir plus</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Past Events Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8">Événements passés</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{pastEvents.map((event) => (
							<Card key={event.id} className="overflow-hidden">
								<div className="aspect-video relative">
									<img
										src={event.image}
										alt={event.title}
										className="w-full h-full object-cover"
									/>
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-bold mb-2">{event.title}</h3>
									<p className="text-gray-600 mb-4">{event.description}</p>

									<div className="space-y-2 mb-6">
										<div className="flex items-center text-sm text-gray-500">
											<Calendar className="w-4 h-4 mr-2" />
											<span>{new Date(event.date).toLocaleDateString()}</span>
										</div>
										<div className="flex items-center text-sm text-gray-500">
											<Clock className="w-4 h-4 mr-2" />
											<span>{event.time}</span>
										</div>
										<div className="flex items-center text-sm text-gray-500">
											<MapPin className="w-4 h-4 mr-2" />
											<span>{event.location}</span>
										</div>
									</div>

									<Button asChild variant="outline" className="w-full">
										<Link to={`/events/${event.id}`}>Voir les photos</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-crec-darkblue text-white">
				<div className="max-w-3xl mx-auto text-center px-4">
					<h2 className="text-3xl font-bold mb-4">
						Vous souhaitez organiser un événement ?
					</h2>
					<p className="text-xl mb-8">Contactez-nous pour discuter de votre projet</p>
					<Button asChild className="bg-crec-gold hover:bg-crec-lightgold text-white">
						<Link to="/contact">Nous contacter</Link>
					</Button>
				</div>
			</section>
		</div>
	);
};

export default EventsPage;
