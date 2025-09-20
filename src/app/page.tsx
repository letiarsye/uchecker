'use client';

import { useState } from 'react';
import { Search, CheckCircle, XCircle, Loader2, ExternalLink, Filter } from 'lucide-react';
import { socialPlatforms, type SocialPlatform } from '@/lib/social';

interface PlatformResult {
  platform: SocialPlatform;
  available: boolean | null;
  loading: boolean;
  url: string;
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState<PlatformResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState<'all' | 'available' | 'unavailable'>('all');

  const checkUsername = async (platform: SocialPlatform): Promise<boolean> => {
    try {
      const response = await fetch(`/api/check-username?platform=${platform.name}&username=${username}`);
      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error(`Error checking ${platform.displayName}:`, error);
      return false;
    }
  };

  const handleSearch = async () => {
    if (!username.trim()) return;

    setIsSearching(true);
    
    const initialResults = socialPlatforms.map(platform => ({
      platform,
      available: null,
      loading: true,
      url: platform.baseUrl + username
    }));
    setResults(initialResults);

    // Her platform için ayrı ayrı kontrol et ve anında güncelle
    socialPlatforms.forEach(async (platform, index) => {
      try {
        const available = await checkUsername(platform);
        
        // Sonucu anında güncelle
        setResults(prevResults => 
          prevResults.map((result, i) => 
            i === index 
              ? { ...result, available, loading: false }
              : result
          )
        );
      } catch (error) {
        console.error(`Error checking ${platform.displayName}:`, error);
        
        // Hata durumunda da güncelle
        setResults(prevResults => 
          prevResults.map((result, i) => 
            i === index 
              ? { ...result, available: false, loading: false }
              : result
          )
        );
      }
    });

    // Tüm kontroller tamamlandığında searching durumunu kapat
    setTimeout(() => {
      setIsSearching(false);
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true;
    if (filter === 'available') return result.available === true;
    if (filter === 'unavailable') return result.available === false;
    return true;
  });

  const availableCount = results.filter(r => r.available === true).length;
  const unavailableCount = results.filter(r => r.available === false).length;
  const completedCount = results.filter(r => !r.loading).length;
  const totalCount = results.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#ffffff', fontFamily: 'Consolas, monospace' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block p-4 mb-6" style={{ backgroundColor: '#1a1a1a', border: '2px solid #333' }}>
            <Search className="h-8 w-8" style={{ color: '#ffffff' }} />
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>USERNAME CHECKER</h1>
          <p className="text-lg" style={{ color: '#888888' }}>
            Check if your username is available on social media platforms
          </p>
        </header>

        {/* Search Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#666666' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="username"
                className="w-full pl-12 pr-4 py-4 text-lg border-2 focus:outline-none transition-all"
                style={{ 
                  backgroundColor: '#1a1a1a', 
                  borderColor: '#333333',
                  color: '#ffffff',
                  fontFamily: 'Consolas, monospace'
                }}
                onFocus={(e) => e.target.style.borderColor = '#555555'}
                onBlur={(e) => e.target.style.borderColor = '#333333'}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!username.trim() || isSearching}
              className="px-8 py-4 text-lg font-bold border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: '#0a0a0a', 
                borderColor: '#ffffff',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#0a0a0a';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#0a0a0a';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                'CHECK'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#ffffff' }}>RESULTS</h2>
              <p className="text-lg mb-4" style={{ color: '#888888' }}>
                {results.length} platforms checked for {username}
              </p>
              
              {/* Progress Bar */}
              {isSearching && (
                <div className="max-w-md mx-auto mb-4">
                  <div className="flex justify-between text-sm mb-2" style={{ color: '#888888' }}>
                    <span>Progress</span>
                    <span>{completedCount}/{totalCount}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Filter Section */}
            <div className="mb-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`flex items-center gap-2 px-4 py-2 border-2 transition-all ${
                  filter === 'all' ? 'bg-white text-black' : 'bg-transparent text-white'
                }`}
                style={{ borderColor: '#ffffff' }}
              >
                <Filter className="h-4 w-4" />
                All ({results.length})
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`flex items-center gap-2 px-4 py-2 border-2 transition-all ${
                  filter === 'available' ? 'bg-green-600 text-white' : 'bg-transparent text-green-400'
                }`}
                style={{ borderColor: '#00ff00' }}
              >
                <CheckCircle className="h-4 w-4" />
                Available ({availableCount})
              </button>
              <button
                onClick={() => setFilter('unavailable')}
                className={`flex items-center gap-2 px-4 py-2 border-2 transition-all ${
                  filter === 'unavailable' ? 'bg-red-600 text-white' : 'bg-transparent text-red-400'
                }`}
                style={{ borderColor: '#ff0000' }}
              >
                <XCircle className="h-4 w-4" />
                Unavailable ({unavailableCount})
              </button>
            </div>

            {/* All results in single list */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredResults.map((result, index) => {
                  const IconComponent = result.platform.icon;
                  return (
                    <div
                      key={result.platform.id}
                      className="flex items-center justify-between p-3 border transition-all hover:bg-opacity-10"
                      style={{ 
                        borderColor: '#333333',
                        backgroundColor: '#1a1a1a'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                    >
                      <div className="flex items-center gap-3">
                        <div style={{ color: '#ffffff' }}>
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold" style={{ color: '#ffffff' }}>
                            {result.platform.displayName}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {result.loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" style={{ color: '#888888' }} />
                        ) : (
                          <>
                            {result.available ? (
                              <CheckCircle className="h-4 w-4" style={{ color: '#00ff00' }} />
                            ) : (
                              <XCircle className="h-4 w-4" style={{ color: '#ff0000' }} />
                            )}
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs border px-2 py-1 transition-all"
                              style={{ 
                                borderColor: '#ffffff',
                                color: '#ffffff'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#ffffff';
                                e.currentTarget.style.color = '#0a0a0a';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#ffffff';
                              }}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 pt-8" style={{ borderTop: '2px solid #333333' }}>
          <p className="text-sm" style={{ color: '#888888' }}>
            SECURE AND FAST USERNAME CHECKING
          </p>
        </footer>
      </div>
    </div>
  );
}
