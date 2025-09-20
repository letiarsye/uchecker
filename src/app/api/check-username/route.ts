import { NextRequest, NextResponse } from 'next/server';

interface PlatformConfig {
  [key: string]: {
    url: string;
    method: 'GET' | 'HEAD';
    headers?: Record<string, string>;
    successCodes: number[];
    availableWhenNotFound: boolean;
    customCheck?: (response: Response) => Promise<boolean>;
  };
}

const platformConfigs: PlatformConfig = {
  // Social Media - Instagram check düzeltmesi
  instagram: {
    url: 'https://www.instagram.com/{username}/',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 301, 302, 403],
    availableWhenNotFound: false,
    customCheck: async (response: Response) => {
      if (response.status === 403) {
        return false; // Bot tespiti, kullanıcı var kabul et
      }
      if (response.status === 200) {
        const text = await response.text();
        return text.includes('Sorry, this page isn\'t available') || text.includes('The link you followed may be broken');
      }
      return false; // 301/302 redirect varsa kullanıcı var
    }
  },
  'x (twitter)': {
    url: 'https://twitter.com/{username}',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 302],
    availableWhenNotFound: false,
    customCheck: async (response: Response) => {
      if (response.status === 302) {
        return false; // Redirect varsa kullanıcı var
      }
      const text = await response.text();
      return text.includes('This account doesn\'t exist') || text.includes('Account suspended');
    }
  },
  facebook: {
    url: 'https://www.facebook.com/{username}',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 302],
    availableWhenNotFound: false,
    customCheck: async (response: Response) => {
      if (response.status === 302) {
        return false; // Redirect varsa kullanıcı var
      }
      const text = await response.text();
      return text.includes('Sorry, this content isn\'t available') || text.includes('This page isn\'t available');
    }
  },
  tiktok: {
    url: 'https://www.tiktok.com/@{username}',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: false,
    customCheck: async (response: Response) => {
      const text = await response.text();
      return !text.includes('Couldn\'t find this account') && !text.includes('This account cannot be found');
    }
  },
  snapchat: {
    url: 'https://www.snapchat.com/add/{username}',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: false,
    customCheck: async (response: Response) => {
      const text = await response.text();
      return text.includes('Sorry,This content was not found') || text.includes('User not found');
    }
  },

  // Professional
  linkedin: {
    url: 'https://www.linkedin.com/in/{username}/',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  behance: {
    url: 'https://www.behance.net/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  dribbble: {
    url: 'https://dribbble.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },

  // Development
  github: {
    url: 'https://api.github.com/users/{username}',
    method: 'GET',
    headers: {
      'User-Agent': 'Username-Checker-App',
      'Accept': 'application/vnd.github.v3+json'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  gitlab: {
    url: 'https://gitlab.com/api/v4/users?username={username}',
    method: 'GET',
    headers: {
      'User-Agent': 'Username-Checker-App'
    },
    successCodes: [200],
    availableWhenNotFound: false,
    customCheck: async (response: Response) => {
      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) && data.length === 0;
      }
      return true;
    }
  },
  codepen: {
    url: 'https://codepen.io/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },

  // Content Creation
  youtube: {
    url: 'https://www.youtube.com/@{username}',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: false,
    customCheck: async (response: Response) => {
      const text = await response.text();
      return !text.includes('This channel does not exist') && !text.includes('404 Not Found');
    }
  },
  twitch: {
    url: 'https://www.twitch.tv/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  medium: {
    url: 'https://medium.com/@{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  pinterest: {
    url: 'https://www.pinterest.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },

  // Gaming
  steam: {
    url: 'https://steamcommunity.com/id/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  
  // Music & Entertainment
  spotify: {
    url: 'https://open.spotify.com/user/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  reddit: {
    url: 'https://www.reddit.com/user/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  stackoverflow: {
    url: 'https://stackoverflow.com/users/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },

  // Messaging & Communication
  telegram: {
    url: 'https://t.me/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },

  // New platforms
  vimeo: {
    url: 'https://vimeo.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  flickr: {
    url: 'https://www.flickr.com/people/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  tumblr: {
    url: 'https://{username}.tumblr.com',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  quora: {
    url: 'https://www.quora.com/profile/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  weibo: {
    url: 'https://weibo.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  vk: {
    url: 'https://vk.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  // Yeni eklenen platformlar
  playstation: {
    url: 'https://psnprofiles.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  whatsapp: {
    url: 'https://wa.me/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  onlyfans: {
    url: 'https://onlyfans.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  'apple-music': {
    url: 'https://music.apple.com/profile/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  netflix: {
    url: 'https://www.netflix.com/title/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  amazon: {
    url: 'https://www.amazon.com/gp/profile/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  ebay: {
    url: 'https://www.ebay.com/usr/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  tinder: {
    url: 'https://tinder.com/@{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  bumble: {
    url: 'https://bumble.com/app/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  kick: {
    url: 'https://kick.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  discord: {
    url: 'https://discord.com/users/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  'xbox-live': {
     url: 'https://account.xbox.com/en-us/profile?gamertag={username}',
     method: 'HEAD',
     headers: {
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
     },
     successCodes: [200],
     availableWhenNotFound: true
   },
   xbox: {
     url: 'https://account.xbox.com/en-us/profile?gamertag={username}',
     method: 'HEAD',
     headers: {
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
     },
     successCodes: [200],
     availableWhenNotFound: true
   },
   pexels: {
     url: 'https://www.pexels.com/@{username}',
     method: 'HEAD',
     headers: {
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
     },
     successCodes: [200],
     availableWhenNotFound: true
   },
   unsplash: {
    url: 'https://unsplash.com/@{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  // Eksik platformlar
  threads: {
    url: 'https://www.threads.net/@{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  bluesky: {
    url: 'https://bsky.app/profile/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  mastodon: {
    url: 'https://mastodon.social/@{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  clubhouse: {
    url: 'https://www.clubhouse.com/@{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  deviantart: {
    url: 'https://www.deviantart.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  etsy: {
    url: 'https://www.etsy.com/shop/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  patreon: {
    url: 'https://www.patreon.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  kickstarter: {
    url: 'https://www.kickstarter.com/profile/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  lastfm: {
    url: 'https://www.last.fm/user/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  soundcloud: {
    url: 'https://soundcloud.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  mixcloud: {
    url: 'https://www.mixcloud.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  bandcamp: {
    url: 'https://{username}.bandcamp.com',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  imdb: {
    url: 'https://www.imdb.com/find?q={username}&s=nm',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  signal: {
    url: 'https://signal.org/download/',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: false
  },
  element: {
    url: 'https://app.element.io/#/user/@{username}:matrix.org',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  slack: {
    url: 'https://{username}.slack.com',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  notion: {
    url: 'https://www.notion.so/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  obsidian: {
    url: 'https://obsidian.md/community/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  trello: {
    url: 'https://trello.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  asana: {
    url: 'https://app.asana.com/profile/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  figma: {
    url: 'https://www.figma.com/@{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  canva: {
    url: 'https://www.canva.com/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200],
    availableWhenNotFound: true
  },
  skype: {
    url: 'https://web.skype.com/en/profile/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  viber: {
    url: 'https://www.viber.com/en/contact/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  },
  line: {
    url: 'https://line.me/ti/p/{username}',
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    successCodes: [200, 404],
    availableWhenNotFound: false
  }
};

async function checkPlatformUsername(platform: string, username: string): Promise<boolean> {
  const config = platformConfigs[platform.toLowerCase()];
  if (!config) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const url = config.url.replace('{username}', encodeURIComponent(username));

  try {
    const response = await fetch(url, {
      method: config.method,
      headers: config.headers || {},
      signal: AbortSignal.timeout(5000) // 5 saniyeye düşürüldü
    });

    // Use custom check if available
    if (config.customCheck) {
      return await config.customCheck(response);
    }

    if (config.successCodes.includes(response.status)) {
      return false; // Username exists (not available)
    }

    if (response.status === 404) {
      return config.availableWhenNotFound; // Username available
    }

    // For other status codes, assume not available to be safe
    return false;
  } catch (error) {
    console.error(`Error checking ${platform} for username ${username}:`, error);
    // On error, assume not available to be safe
    return false;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const platform = searchParams.get('platform');
  const username = searchParams.get('username');

  if (!platform || !username) {
    return NextResponse.json(
      { error: 'Platform and username are required' },
      { status: 400 }
    );
  }

  if (username.length < 1 || username.length > 30) {
    return NextResponse.json(
      { error: 'Username must be between 1 and 30 characters' },
      { status: 400 }
    );
  }

  // Basic username validation
  const usernameRegex = /^[a-zA-Z0-9._-]+$/;
  if (!usernameRegex.test(username)) {
    return NextResponse.json(
      { error: 'Username contains invalid characters' },
      { status: 400 }
    );
  }

  try {
    const available = await checkPlatformUsername(platform, username);
    
    return NextResponse.json({
      platform,
      username,
      available,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in check-username API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}