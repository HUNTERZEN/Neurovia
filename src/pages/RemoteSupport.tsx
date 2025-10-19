
import { Clock, Monitor, Video, Mic, MessageSquare, Star } from 'lucide-react';

const supportOptions = [
  {
    icon: <Video className="w-6 h-6" aria-hidden="true" />,
    title: "Video Call",
    description: "Face-to-face support with screen sharing",
    price: "$30/30min"
  },
  {
    icon: <Mic className="w-6 h-6" aria-hidden="true" />,
    title: "Voice Call",
    description: "Audio support with screen sharing",
    price: "$25/30min"
  },
  {
    icon: <MessageSquare className="w-6 h-6" aria-hidden="true" />,
    title: "Chat Support",
    description: "Text-based support with file sharing",
    price: "$20/30min"
  }
];

export function RemoteSupport() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Remote Technical Support</h1>
        <p className="text-xl text-gray-400">Get instant help from our expert technicians</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div
                className="flex items-center mb-4"
                role="img"
                aria-label={option.title + " icon"}
              >
                <div className="p-3 bg-primary/20 rounded-lg text-primary-light">
                  {option.icon}
                </div>
                <h3 className="ml-3 text-xl font-semibold">{option.title}</h3>
              </div>
              <p className="text-gray-400 mb-4">{option.description}</p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-primary-light font-semibold">{option.price}</span>
              <button
                type="button"
                className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Available Experts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((expert) => (
            <div key={expert} className="bg-gray-900 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt={`Tech Expert ${expert}`}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold">Tech Expert {expert}</h3>
                    <div className="flex items-center text-yellow-400" aria-label="5 star rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4" />
                      ))}
                      <span className="text-gray-400 ml-1">(120 reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <Monitor className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>Windows, macOS, Linux</span>
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>Available Now</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-primary hover:bg-primary-dark py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light"
              >
                Schedule Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
