import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Mic,
  MessageSquare,
  Phone,
  PhoneOff,
  VideoOff,
  Settings,
  Users,
  Clock,
  Star
} from 'lucide-react';
import { CommunicationService } from '../services/communicationService';

interface Expert {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  specialties: string[];
  availability: string;
  isVerified: boolean;
  pricePerMinute: number;
}

const experts: Expert[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '/api/placeholder/60/60',
    rating: 4.9,
    reviews: 156,
    specialties: ['Windows', 'macOS', 'Linux'],
    availability: 'Available Now',
    isVerified: true,
    pricePerMinute: 30
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    avatar: '/api/placeholder/60/60',
    rating: 4.8,
    reviews: 142,
    specialties: ['Windows', 'Networking', 'Security'],
    availability: 'Available in 15 mins',
    isVerified: true,
    pricePerMinute: 35
  },
  {
    id: '3',
    name: 'Emily Watson',
    avatar: '/api/placeholder/60/60',
    rating: 4.9,
    reviews: 198,
    specialties: ['macOS', 'iOS', 'Data Recovery'],
    availability: 'Available Now',
    isVerified: true,
    pricePerMinute: 40
  }
];

export function GetRemoteHelp() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);
  const communicationService = useRef(new CommunicationService());

  const services = [
    {
      id: 'video',
      title: 'Video Call',
      icon: Video,
      description: 'Face-to-face support with screen sharing',
      price: '$30/30min',
      color: 'from-blue-600 to-purple-600',
      features: ['HD Video Quality', 'Screen Sharing', 'File Transfer', 'Session Recording']
    },
    {
      id: 'voice',
      title: 'Voice Call',
      icon: Phone,
      description: 'Audio support with screen sharing',
      price: '$25/30min',
      color: 'from-green-600 to-teal-600',
      features: ['Crystal Clear Audio', 'Screen Sharing', 'Background Noise Reduction', 'Call Recording']
    },
    {
      id: 'chat',
      title: 'Chat Support',
      icon: MessageSquare,
      description: 'Text-based support with file sharing',
      price: '$20/30min',
      color: 'from-purple-600 to-pink-600',
      features: ['Instant Messaging', 'File Sharing', 'Screenshot Tools', 'Chat History']
    }
  ];

  // Get access token from your backend
  const getAccessToken = async (identity: string, roomName: string) => {
    const response = await fetch('/api/twilio/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity, roomName })
    });
    const data = await response.json();
    return data.token;
  };

  const handleServiceSelect = async (serviceId: string, expertId: string) => {
    setSelectedService(serviceId);
    setConnectionStatus('connecting');

    try {
      // include expertId in the room name so the parameter is used (helps route or identify the session)
      const roomName = `support-${expertId || 'anon'}-${Date.now()}`;
      const identity = `user-${Date.now()}`;
      const accessToken = await getAccessToken(identity, roomName);

      if (serviceId === 'video') {
        await startVideoCall(accessToken, roomName);
      } else if (serviceId === 'voice') {
        await startVoiceCall(accessToken, roomName);
      } else if (serviceId === 'chat') {
        await startChat(accessToken);
      }

      setIsInCall(true);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Failed to connect:', error);
      setConnectionStatus('disconnected');
    }
  };

  const startVideoCall = async (accessToken: string, roomName: string) => {
    await communicationService.current.initializeVideoCall(accessToken, roomName);
    
    // Get user media and attach to local video
    if (localVideoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      localVideoRef.current.srcObject = stream;
    }
  };

  const startVoiceCall = async (accessToken: string, roomName: string) => {
    await communicationService.current.initializeVoiceCall(accessToken, roomName);
  };

  const startChat = async (accessToken: string) => {
    await communicationService.current.initializeChat(accessToken);
    // Handle chat UI separately
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Implement actual mute/unmute logic
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // Implement actual video on/off logic
  };

  const endCall = () => {
    communicationService.current.disconnect();
    setIsInCall(false);
    setSelectedService(null);
    setConnectionStatus('disconnected');
  };

  if (isInCall) {
    return (
      <div className="min-h-screen bg-black text-white relative">
        {/* Call Interface */}
        <div className="relative h-screen flex flex-col">
          {/* Video Area */}
          {selectedService === 'video' && (
            <div className="flex-1 relative bg-gray-900">
              {/* Remote Video */}
              <div id="remote-media" ref={remoteVideoRef} className="w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <Users className="w-16 h-16 mx-auto mb-4" />
                    <p>Waiting for expert to join...</p>
                  </div>
                </div>
              </div>
              
              {/* Local Video */}
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-purple-500">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Voice Call Interface */}
          {selectedService === 'voice' && (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-900/20 to-teal-900/20">
              <div className="text-center">
                <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Phone className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Voice Call Active</h2>
                <p className="text-gray-400">Connected with expert</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Clock className="w-4 h-4" />
                  <span>05:23</span>
                </div>
              </div>
            </div>
          )}

          {/* Chat Interface */}
          {selectedService === 'chat' && (
            <div className="flex-1 flex">
              <div className="w-1/3 bg-gray-900 border-r border-gray-800">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="font-semibold">Chat Support</h3>
                  <p className="text-sm text-gray-400">with Expert</p>
                </div>
                <div className="flex-1 p-4">
                  {/* Chat messages would go here */}
                  <div className="space-y-4">
                    <div className="text-sm">
                      <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                        Hello! I'm here to help with your technical issue. What seems to be the problem?
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Expert • 2 mins ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-sm"
                    />
                    <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm">
                      Send
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gray-800 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                  <p>Screen sharing area</p>
                </div>
              </div>
            </div>
          )}

          {/* Call Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-4 bg-gray-900/80 backdrop-blur-md rounded-full px-6 py-4">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full transition-colors ${
                  isMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Mic className={`w-6 h-6 ${isMuted ? 'text-white' : 'text-gray-300'}`} />
              </button>

              {selectedService === 'video' && (
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full transition-colors ${
                    isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Video className={`w-6 h-6 ${isVideoOff ? 'text-white' : 'text-gray-300'}`} />
                </button>
              )}

              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                <Settings className="w-6 h-6 text-gray-300" />
              </button>

              <button
                onClick={endCall}
                className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Connection Status */}
          <div className="absolute top-4 left-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              connectionStatus === 'connected' 
                ? 'bg-green-600/20 text-green-400' 
                : connectionStatus === 'connecting'
                ? 'bg-yellow-600/20 text-yellow-400'
                : 'bg-red-600/20 text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' 
                  ? 'bg-green-400' 
                  : connectionStatus === 'connecting'
                  ? 'bg-yellow-400 animate-pulse'
                  : 'bg-red-400'
              }`} />
              {connectionStatus === 'connected' ? 'Connected' : 
               connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Get Remote Technical Support
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with expert technicians instantly
            </p>
          </motion.div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
              
              <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 h-full">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-400">{service.price}</span>
                  <button
                    onClick={() => setSelectedService(service.id)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Select
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Available Experts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8">Available Experts</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={expert.avatar} 
                      alt={expert.name}
                      className="w-16 h-16 rounded-full"
                    />
                    {expert.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{expert.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400">{expert.rating}</span>
                      <span className="text-gray-400">({expert.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-gray-300">{expert.availability}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {expert.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-purple-400">
                    ${expert.pricePerMinute}/30min
                  </span>
                  <button
                    onClick={() => selectedService && handleServiceSelect(selectedService, expert.id)}
                    disabled={!selectedService}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default GetRemoteHelp;
