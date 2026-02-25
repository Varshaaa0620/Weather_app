import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="backdrop-blur-md bg-dark-glass-200 border-t border-glass-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h3 className="text-lg font-bold text-cyan-300 mb-2">WeatherInsight</h3>
            <p className="text-slate-400 text-sm">
              Real-time weather intelligence powered by WeatherStack API
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://docs.apilayer.com/weatherstack/docs/api-documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://weatherstack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  WeatherStack
                </a>
              </li>
              <li>
                <a
                  href="https://apilayer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  APILayer
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4">Built with</h4>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>React</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Tailwind</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-glass-300 my-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-slate-400 text-sm">
          <p>
            © {currentYear} WeatherInsight. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://github.com"
              className="hover:text-cyan-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
            </a>
            <span className="flex items-center gap-1 text-xs">
              Made with <Heart className="w-4 h-4 text-rose-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
