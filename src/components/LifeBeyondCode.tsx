import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Camera, Gamepad2, Music, Palette, Plane, Dumbbell, Users, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const stats = [
  { value: '21+', label: 'Gaming Accounts', icon: Gamepad2 },
  { value: '6+', label: 'Years of Hobbies', icon: Heart },
  { value: '100+', label: ' Photos Captured (NATURE)', icon: Camera },
  { value: '12+', label: 'Events Co-ordinated', icon: Users },
];

// Gallery images for each interest
const galleryImages = {
  gaming: [
    '/LIFE BEYONDCODE/GAME 1.jpg',
    '/LIFE BEYONDCODE/GAME 2.jpg',
    '/LIFE BEYONDCODE/GAME 3.jpg',
    '/LIFE BEYONDCODE/GAME 4.jpg',
    '/LIFE BEYONDCODE/GAME 5.jpg',
    '/LIFE BEYONDCODE/GAME 6.jpg',
    '/LIFE BEYONDCODE/GAME 7.jpg'
  ],
  music: [
    '/LIFE BEYONDCODE/MUSIC 1.jpg',
    '/LIFE BEYONDCODE/MUSIC 2.jpg'
  ],
  art: [
    '/LIFE BEYONDCODE/ART 1.jpg',
    '/LIFE BEYONDCODE/ART 2.jpg',
    '/LIFE BEYONDCODE/ART 3.jpg',
    '/LIFE BEYONDCODE/ART 4.jpg',
    '/LIFE BEYONDCODE/ART 5.jpg',
    '/LIFE BEYONDCODE/ART 6.jpg',
    '/LIFE BEYONDCODE/ART 7.jpg',
    '/LIFE BEYONDCODE/ART 8.jpg',
    '/LIFE BEYONDCODE/ART 9.jpg'
  ],
  photography: [
    '/LIFE BEYONDCODE/PHOTOGRPHY 1.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 2.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 3.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 4.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 5.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 6.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 7.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 8.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 9.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 10.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 11.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 12.jpg',
    '/LIFE BEYONDCODE/PHOTOGRPHY 13.jpg'
  ],
  travel: [
    '/LIFE BEYONDCODE/TRAVEL 1.jpg',
    '/LIFE BEYONDCODE/TRAVEL 2.jpg',
    '/LIFE BEYONDCODE/TRAVEL 3.jpg',
    '/LIFE BEYONDCODE/TRAVEL 4.jpg',
    '/LIFE BEYONDCODE/TRAVEL 5.jpg',
    '/LIFE BEYONDCODE/TRAVEL 6.jpg',
    '/LIFE BEYONDCODE/TRAVEL 7.jpg',
    '/LIFE BEYONDCODE/TRAVEL 8.jpg',
    '/LIFE BEYONDCODE/TRAVEL 9.jpg',
    '/LIFE BEYONDCODE/TRAVEL 10.jpg'
  ]
};

const interests = [
  {
    title: 'Gaming & Esports',
    description: 'Time Pass with gaming and esport tournaments',
    image: 'https://images.unsplash.com/photo-1725272463030-2e21e5d459d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBlc3BvcnRzJTIwY29tcHV0ZXIlMjBzZXR1cHxlbnwxfHx8fDE3NTcxMjg1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Gamepad2,
    color: 'from-blue-500/20 to-purple-500/20',
    galleryKey: 'gaming',
  },
  {
    title: 'Music Production',
    description: 'Boys Party While Cooking For Any Feast ',
    image: 'https://images.unsplash.com/photo-1642177398844-06d28a8f973a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y3Rpb24lMjBzdHVkaW8lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc1NzEyODU2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Music,
    color: 'from-green-500/20 to-teal-500/20',
    galleryKey: 'music',
  },
  {
    title: 'My Drawings',
    description: 'I love to draw anime ,portraits and characters',
    image: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzU3MTI4NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Palette,
    color: 'from-pink-500/20 to-rose-500/20',
    galleryKey: 'art',
  },
  {
    title: 'Photography',
    description: 'Nature, street, and event photography collection',
    image: 'https://images.unsplash.com/photo-1541558842254-7529cd42152e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGNhbWVyYSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTcxMjg1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Camera,
    color: 'from-yellow-500/20 to-orange-500/20',
    galleryKey: 'photography',
  },
  {
    title: 'Travel & Adventure',
    description: 'Boys Trip To Any Place Make it Spacial AND Memorable',
    image: 'https://images.unsplash.com/photo-1609373066983-cee8662ea93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NTcwOTcwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Plane,
    color: 'from-cyan-500/20 to-blue-500/20',
    galleryKey: 'travel',
  },

];

const LifeBeyondCode = () => {
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (galleryKey: string) => {
    setSelectedGallery(galleryKey);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedGallery) {
      const images = galleryImages[selectedGallery as keyof typeof galleryImages];
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedGallery) {
      const images = galleryImages[selectedGallery as keyof typeof galleryImages];
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-purple-500" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Life Beyond Code
          </h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Visual stories from my diverse interests - from gaming achievements to creative
          projects, fitness milestones to community involvement.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-6 text-center group hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex justify-center mb-3">
              <stat.icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Interest Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {interests.map((interest, index) => (
          <motion.div
            key={interest.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -10 }}
            className="group relative overflow-hidden rounded-2xl glass hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={interest.image}
                alt={interest.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${interest.color} to-transparent`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Image count badge */}
              <div className="flex items-center gap-2 self-start">
               
                <div className="p-2 rounded-lg glass">
                  <interest.icon className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Title and button section */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {interest.title}
                  </h3>
                </div>
                <p className="text-sm text-white/90 group-hover:text-white transition-colors duration-300 mb-4">
                  {interest.description}
                </p>
                
                {/* View Gallery Button */}
                <Button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    openGallery(interest.galleryKey);
                  }}
                  className="glass hover:glass bg-white/10 hover:bg-white/20 text-white border-0 h-10 px-4 transition-all duration-300 opacity-90 hover:opacity-100 relative z-10"
                >
                  <Play className="w-4 h-4 mr-2" />
                  View Gallery
                </Button>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple-400/30 transition-colors duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                onClick={closeGallery}
                className="absolute top-4 right-4 z-10 glass hover:glass bg-black/20 hover:bg-black/40 text-white border-0 rounded-full w-10 h-10 p-0"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass hover:glass bg-black/20 hover:bg-black/40 text-white border-0 rounded-full w-12 h-12 p-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 glass hover:glass bg-black/20 hover:bg-black/40 text-white border-0 rounded-full w-12 h-12 p-0"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl glass">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    src={galleryImages[selectedGallery as keyof typeof galleryImages][currentImageIndex]}
                    alt={`Gallery image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full">
                  <span className="text-white text-sm">
                    {currentImageIndex + 1} / {galleryImages[selectedGallery as keyof typeof galleryImages].length}
                  </span>
                </div>

                {/* Gallery Title */}
                <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full">
                  <span className="text-white font-medium">
                    {interests.find(i => i.galleryKey === selectedGallery)?.title} Gallery
                  </span>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center mt-4 gap-2 overflow-x-auto pb-2">
                {galleryImages[selectedGallery as keyof typeof galleryImages].map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex ? 'border-purple-400' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LifeBeyondCode;