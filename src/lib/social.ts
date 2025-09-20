import { IconType } from 'react-icons';
import { 
  FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaGitlab, 
  FaFacebook, FaTiktok, FaSnapchat, FaBehance, FaDribbble,
  FaCodepen, FaYoutube, FaTwitch, FaMedium, FaPinterest,
  FaSteam, FaTelegram, FaReddit, FaDiscord, FaSpotify,
  FaStackOverflow, FaXbox, FaVimeo, FaFlickr, FaTumblr,
  FaQuora, FaSkype, FaViber, FaLine, FaWeibo, FaVk,
  FaSlack, FaEtsy, FaPatreon, FaKickstarter, FaDeviantart,
  FaLastfm, FaSoundcloud, FaMixcloud, FaBandcamp, FaImdb,
  FaAmazon, FaEbay, FaHeart
} from 'react-icons/fa';
import { 
  SiPlaystation, SiWhatsapp, SiOnlyfans, SiTwitch, SiClubhouse,
  SiMastodon, SiSignal, SiElement, SiMatrix, SiThreads,
  SiBluesky, SiNotion, SiObsidian, SiTrello, SiAsana,
  SiSlack, SiFigma, SiCanva, SiUnsplash, SiPexels, SiKick,
  SiDiscord, SiApplemusic, SiNetflix,
  SiAmazonprime, SiTinder
} from 'react-icons/si';

export interface SocialPlatform {
  id: string;
  name: string;
  displayName: string;
  baseUrl: string;
  icon: IconType;
  color: string;
  category: PlatformCategory;
  placeholder: string;
  description: string;
}

export enum PlatformCategory {
  SOCIAL = 'social',
  PROFESSIONAL = 'professional',
  DEVELOPMENT = 'development',
  CONTENT = 'content',
  GAMING = 'gaming',
  MESSAGING = 'messaging'
}

export const socialPlatforms: SocialPlatform[] = [
  // Social Media
  {
    id: 'instagram',
    name: 'instagram',
    displayName: 'Instagram',
    baseUrl: 'https://www.instagram.com/',
    icon: FaInstagram,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Photo and video sharing platform'
  },
  {
    id: 'twitter',
    name: 'x (twitter)',
    displayName: 'X (Twitter)',
    baseUrl: 'https://twitter.com/',
    icon: FaTwitter,
    color: 'bg-black',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Microblogging and social network platform'
  },
  {
    id: 'facebook',
    name: 'facebook',
    displayName: 'Facebook',
    baseUrl: 'https://www.facebook.com/',
    icon: FaFacebook,
    color: 'bg-blue-600',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Social network platform'
  },
  {
    id: 'tiktok',
    name: 'tiktok',
    displayName: 'TikTok',
    baseUrl: 'https://www.tiktok.com/@',
    icon: FaTiktok,
    color: 'bg-black',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Short video sharing platform'
  },
  {
    id: 'snapchat',
    name: 'snapchat',
    displayName: 'Snapchat',
    baseUrl: 'https://www.snapchat.com/add/',
    icon: FaSnapchat,
    color: 'bg-yellow-400',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Instant messaging and photo sharing'
  },

  // Professional
  {
    id: 'linkedin',
    name: 'linkedin',
    displayName: 'LinkedIn',
    baseUrl: 'https://www.linkedin.com/in/',
    icon: FaLinkedin,
    color: 'bg-blue-700',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Professional networking platform'
  },
  {
    id: 'behance',
    name: 'behance',
    displayName: 'Behance',
    baseUrl: 'https://www.behance.net/',
    icon: FaBehance,
    color: 'bg-blue-500',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Creative portfolio platform'
  },
  {
    id: 'dribbble',
    name: 'dribbble',
    displayName: 'Dribbble',
    baseUrl: 'https://dribbble.com/',
    icon: FaDribbble,
    color: 'bg-pink-500',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Design community platform'
  },

  // Development platforms
  {
    id: 'github',
    name: 'github',
    displayName: 'GitHub',
    baseUrl: 'https://github.com/',
    icon: FaGithub,
    color: 'bg-gray-800',
    category: PlatformCategory.DEVELOPMENT,
    placeholder: 'username',
    description: 'Code development and version control platform'
  },
  {
    id: 'gitlab',
    name: 'gitlab',
    displayName: 'GitLab',
    baseUrl: 'https://gitlab.com/',
    icon: FaGitlab,
    color: 'bg-orange-600',
    category: PlatformCategory.DEVELOPMENT,
    placeholder: 'username',
    description: 'DevOps and code development platform'
  },
  {
    id: 'codepen',
    name: 'codepen',
    displayName: 'CodePen',
    baseUrl: 'https://codepen.io/',
    icon: FaCodepen,
    color: 'bg-gray-900',
    category: PlatformCategory.DEVELOPMENT,
    placeholder: 'username',
    description: 'Online code editor and community'
  },
  {
    id: 'stackoverflow',
    name: 'stackoverflow',
    displayName: 'Stack Overflow',
    baseUrl: 'https://stackoverflow.com/users/',
    icon: FaStackOverflow,
    color: 'bg-orange-500',
    category: PlatformCategory.DEVELOPMENT,
    placeholder: 'user-id',
    description: 'Programming Q&A platform'
  },

  // Content platforms
  {
    id: 'youtube',
    name: 'youtube',
    displayName: 'YouTube',
    baseUrl: 'https://www.youtube.com/@',
    icon: FaYoutube,
    color: 'bg-red-600',
    category: PlatformCategory.CONTENT,
    placeholder: 'channelname',
    description: 'Video sharing and streaming platform'
  },
  {
    id: 'twitch',
    name: 'twitch',
    displayName: 'Twitch',
    baseUrl: 'https://www.twitch.tv/',
    icon: FaTwitch,
    color: 'bg-purple-600',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Live streaming platform'
  },
  {
    id: 'medium',
    name: 'medium',
    displayName: 'Medium',
    baseUrl: 'https://medium.com/@',
    icon: FaMedium,
    color: 'bg-gray-900',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Blog and article sharing platform'
  },
  {
    id: 'pinterest',
    name: 'pinterest',
    displayName: 'Pinterest',
    baseUrl: 'https://www.pinterest.com/',
    icon: FaPinterest,
    color: 'bg-red-500',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Visual discovery and collection platform'
  },

  // Gaming platforms
  {
    id: 'steam',
    name: 'steam',
    displayName: 'Steam',
    baseUrl: 'https://steamcommunity.com/id/',
    icon: FaSteam,
    color: 'bg-blue-900',
    category: PlatformCategory.GAMING,
    placeholder: 'username',
    description: 'Gaming platform and community'
  },
  {
    id: 'playstation',
    name: 'playstation',
    displayName: 'PlayStation',
    baseUrl: 'https://psnprofiles.com/',
    icon: SiPlaystation,
    color: 'bg-blue-800',
    category: PlatformCategory.GAMING,
    placeholder: 'psnid',
    description: 'PlayStation gaming platform'
  },

  // Messaging platforms
  {
    id: 'telegram',
    name: 'telegram',
    displayName: 'Telegram',
    baseUrl: 'https://t.me/',
    icon: FaTelegram,
    color: 'bg-blue-500',
    category: PlatformCategory.MESSAGING,
    placeholder: 'username',
    description: 'Instant messaging application'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    displayName: 'WhatsApp',
    baseUrl: 'https://wa.me/',
    icon: SiWhatsapp,
    color: 'bg-green-500',
    category: PlatformCategory.MESSAGING,
    description: 'WhatsApp messaging platform',
    placeholder: ''
  },
  {
    id: 'reddit',
    name: 'reddit',
    displayName: 'Reddit',
    baseUrl: 'https://www.reddit.com/user/',
    icon: FaReddit,
    color: 'bg-orange-600',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Social news and discussion platform'
  },
  {
    id: 'spotify',
    name: 'spotify',
    displayName: 'Spotify',
    baseUrl: 'https://open.spotify.com/user/',
    icon: FaSpotify,
    color: 'bg-green-500',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Music streaming platform'
  },
  {
    id: 'vimeo',
    name: 'vimeo',
    displayName: 'Vimeo',
    baseUrl: 'https://vimeo.com/',
    icon: FaVimeo,
    color: 'bg-blue-600',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Video sharing and hosting platform'
  },
  {
    id: 'flickr',
    name: 'flickr',
    displayName: 'Flickr',
    baseUrl: 'https://www.flickr.com/people/',
    icon: FaFlickr,
    color: 'bg-pink-600',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Photo sharing and storage platform'
  },
  {
    id: 'tumblr',
    name: 'tumblr',
    displayName: 'Tumblr',
    baseUrl: 'https://',
    icon: FaTumblr,
    color: 'bg-indigo-900',
    category: PlatformCategory.SOCIAL,
    placeholder: 'blogname',
    description: 'Microblog and social media platform'
  },
  {
    id: 'quora',
    name: 'quora',
    displayName: 'Quora',
    baseUrl: 'https://www.quora.com/profile/',
    icon: FaQuora,
    color: 'bg-red-700',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Q&A and knowledge sharing platform'
  },
  {
    id: 'skype',
    name: 'skype',
    displayName: 'Skype',
    baseUrl: 'skype:',
    icon: FaSkype,
    color: 'bg-blue-500',
    category: PlatformCategory.MESSAGING,
    placeholder: 'username',
    description: 'Video and voice calling platform'
  },
  {
    id: 'viber',
    name: 'viber',
    displayName: 'Viber',
    baseUrl: 'viber://contact?number=',
    icon: FaViber,
    color: 'bg-purple-600',
    category: PlatformCategory.MESSAGING,
    placeholder: 'phonenumber',
    description: 'Instant messaging and calling app'
  },
  {
    id: 'line',
    name: 'line',
    displayName: 'LINE',
    baseUrl: 'https://line.me/ti/p/',
    icon: FaLine,
    color: 'bg-green-400',
    category: PlatformCategory.MESSAGING,
    placeholder: 'username',
    description: 'Asia-based messaging application'
  },
  {
    id: 'weibo',
    name: 'weibo',
    displayName: 'Weibo',
    baseUrl: 'https://weibo.com/',
    icon: FaWeibo,
    color: 'bg-red-600',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'China-based social media platform'
  },
  {
    id: 'vk',
    name: 'vk',
    displayName: 'VKontakte',
    baseUrl: 'https://vk.com/',
    icon: FaVk,
    color: 'bg-blue-700',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Russia-based social network platform'
  },
  {
    id: 'threads',
    name: 'threads',
    displayName: 'Threads',
    baseUrl: 'https://www.threads.net/@',
    icon: SiThreads,
    color: 'bg-black',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Meta\'s text-based social platform'
  },
  {
    id: 'bluesky',
    name: 'bluesky',
    displayName: 'Bluesky',
    baseUrl: 'https://bsky.app/profile/',
    icon: SiBluesky,
    color: 'bg-blue-500',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username.bsky.social',
    description: 'Decentralized social network'
  },
  {
    id: 'mastodon',
    name: 'mastodon',
    displayName: 'Mastodon',
    baseUrl: 'https://mastodon.social/@',
    icon: SiMastodon,
    color: 'bg-purple-600',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Decentralized social network'
  },
  {
    id: 'clubhouse',
    name: 'clubhouse',
    displayName: 'Clubhouse',
    baseUrl: 'https://www.clubhouse.com/@',
    icon: SiClubhouse,
    color: 'bg-green-600',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Audio-based social network'
  },
  {
    id: 'deviantart',
    name: 'deviantart',
    displayName: 'DeviantArt',
    baseUrl: 'https://www.deviantart.com/',
    icon: FaDeviantart,
    color: 'bg-green-700',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Art and creative community'
  },
  {
    id: 'etsy',
    name: 'etsy',
    displayName: 'Etsy',
    baseUrl: 'https://www.etsy.com/shop/',
    icon: FaEtsy,
    color: 'bg-orange-500',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'shopname',
    description: 'Handmade and vintage marketplace'
  },
  {
    id: 'patreon',
    name: 'patreon',
    displayName: 'Patreon',
    baseUrl: 'https://www.patreon.com/',
    icon: FaPatreon,
    color: 'bg-red-500',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Creator subscription platform'
  },
  {
    id: 'kickstarter',
    name: 'kickstarter',
    displayName: 'Kickstarter',
    baseUrl: 'https://www.kickstarter.com/profile/',
    icon: FaKickstarter,
    color: 'bg-green-500',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Crowdfunding platform'
  },
  {
    id: 'lastfm',
    name: 'lastfm',
    displayName: 'Last.fm',
    baseUrl: 'https://www.last.fm/user/',
    icon: FaLastfm,
    color: 'bg-red-600',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Music tracking and discovery'
  },
  {
    id: 'soundcloud',
    name: 'soundcloud',
    displayName: 'SoundCloud',
    baseUrl: 'https://soundcloud.com/',
    icon: FaSoundcloud,
    color: 'bg-orange-600',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Audio sharing platform'
  },
  {
    id: 'mixcloud',
    name: 'mixcloud',
    displayName: 'Mixcloud',
    baseUrl: 'https://www.mixcloud.com/',
    icon: FaMixcloud,
    color: 'bg-blue-400',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'DJ mix and podcast platform'
  },
  {
    id: 'bandcamp',
    name: 'bandcamp',
    displayName: 'Bandcamp',
    baseUrl: 'https://bandcamp.com/',
    icon: FaBandcamp,
    color: 'bg-blue-600',
    category: PlatformCategory.CONTENT,
    placeholder: 'artistname',
    description: 'Independent music platform'
  },
  {
    id: 'imdb',
    name: 'imdb',
    displayName: 'IMDb',
    baseUrl: 'https://www.imdb.com/name/',
    icon: FaImdb,
    color: 'bg-yellow-500',
    category: PlatformCategory.CONTENT,
    placeholder: 'nm0000000',
    description: 'Movie and TV database'
  },
  {
    id: 'signal',
    name: 'signal',
    displayName: 'Signal',
    baseUrl: 'https://signal.org/',
    icon: SiSignal,
    color: 'bg-blue-600',
    category: PlatformCategory.MESSAGING,
    placeholder: 'phonenumber',
    description: 'Secure messaging app'
  },
  {
    id: 'element',
    name: 'element',
    displayName: 'Element',
    baseUrl: 'https://app.element.io/',
    icon: SiElement,
    color: 'bg-green-600',
    category: PlatformCategory.MESSAGING,
    placeholder: 'username',
    description: 'Matrix-based messaging'
  },
  {
    id: 'slack',
    name: 'slack',
    displayName: 'Slack',
    baseUrl: 'https://slack.com/app_redirect?channel=',
    icon: SiSlack,
    color: 'bg-purple-600',
    category: PlatformCategory.MESSAGING,
    placeholder: 'username',
    description: 'Team communication platform'
  },
  {
    id: 'notion',
    name: 'notion',
    displayName: 'Notion',
    baseUrl: 'https://www.notion.so/',
    icon: SiNotion,
    color: 'bg-gray-800',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Productivity and note-taking'
  },
  {
    id: 'obsidian',
    name: 'obsidian',
    displayName: 'Obsidian',
    baseUrl: 'https://obsidian.md/',
    icon: SiObsidian,
    color: 'bg-purple-800',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Knowledge management tool'
  },
  {
    id: 'trello',
    name: 'trello',
    displayName: 'Trello',
    baseUrl: 'https://trello.com/',
    icon: SiTrello,
    color: 'bg-blue-500',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Project management tool'
  },
  {
    id: 'asana',
    name: 'asana',
    displayName: 'Asana',
    baseUrl: 'https://app.asana.com/',
    icon: SiAsana,
    color: 'bg-red-500',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Team project management'
  },
  {
    id: 'figma',
    name: 'figma',
    displayName: 'Figma',
    baseUrl: 'https://www.figma.com/@',
    icon: SiFigma,
    color: 'bg-purple-500',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Design collaboration tool'
  },
  {
    id: 'canva',
    name: 'canva',
    displayName: 'Canva',
    baseUrl: 'https://www.canva.com/',
    icon: SiCanva,
    color: 'bg-blue-400',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Graphic design platform'
  },
  {
    id: 'unsplash',
    name: 'unsplash',
    displayName: 'Unsplash',
    baseUrl: 'https://unsplash.com/@',
    icon: SiUnsplash,
    color: 'bg-gray-900',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Stock photography platform'
  },
  {
    id: 'discord',
    name: 'discord',
    displayName: 'Discord',
    baseUrl: 'https://discord.com/users/',
    icon: FaDiscord,
    color: 'bg-indigo-600',
    category: PlatformCategory.MESSAGING,
    placeholder: 'userid',
    description: 'Gaming and community chat platform'
  },
  {
    id: 'xbox',
    name: 'xbox',
    displayName: 'Xbox Live',
    baseUrl: 'https://account.xbox.com/en-us/Profile?GamerTag=',
    icon: FaXbox,
    color: 'bg-green-600',
    category: PlatformCategory.GAMING,
    placeholder: 'gamertag',
    description: 'Xbox gaming platform'
  },
  {
    id: 'onlyfans',
    name: 'onlyfans',
    displayName: 'OnlyFans',
    baseUrl: 'https://onlyfans.com/',
    icon: SiOnlyfans,
    color: 'bg-blue-500',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Content creator platform'
  },
  {
    id: 'apple-music',
    name: 'apple-music',
    displayName: 'Apple Music',
    baseUrl: 'https://music.apple.com/profile/',
    icon: SiApplemusic,
    color: 'bg-red-500',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Music streaming service'
  },
  {
    id: 'netflix',
    name: 'netflix',
    displayName: 'Netflix',
    baseUrl: 'https://www.netflix.com/',
    icon: SiNetflix,
    color: 'bg-red-600',
    category: PlatformCategory.CONTENT,
    placeholder: 'profile',
    description: 'Video streaming platform'
  },
  {
    id: 'amazon',
    name: 'amazon',
    displayName: 'Amazon',
    baseUrl: 'https://www.amazon.com/gp/profile/amzn1.account.',
    icon: FaAmazon,
    color: 'bg-orange-500',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'profile-id',
    description: 'E-commerce and services platform'
  },
  {
    id: 'ebay',
    name: 'ebay',
    displayName: 'eBay',
    baseUrl: 'https://www.ebay.com/usr/',
    icon: FaEbay,
    color: 'bg-blue-600',
    category: PlatformCategory.PROFESSIONAL,
    placeholder: 'username',
    description: 'Online marketplace'
  },
  {
    id: 'tinder',
    name: 'tinder',
    displayName: 'Tinder',
    baseUrl: 'https://tinder.com/@',
    icon: SiTinder,
    color: 'bg-pink-500',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Dating application'
  },
  {
    id: 'bumble',
    name: 'bumble',
    displayName: 'Bumble',
    baseUrl: 'https://bumble.com/app/',
    icon: FaHeart,
    color: 'bg-yellow-400',
    category: PlatformCategory.SOCIAL,
    placeholder: 'username',
    description: 'Dating and networking app'
  },
  {
    id: 'kick',
    name: 'kick',
    displayName: 'Kick',
    baseUrl: 'https://kick.com/',
    icon: SiKick,
    color: 'bg-green-500',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Live streaming platform'
  },
  {
    id: 'pexels',
    name: 'pexels',
    displayName: 'Pexels',
    baseUrl: 'https://www.pexels.com/@',
    icon: SiPexels,
    color: 'bg-green-500',
    category: PlatformCategory.CONTENT,
    placeholder: 'username',
    description: 'Free stock photos and videos'
  }
];

export const getCategoryDisplayName = (category: PlatformCategory): string => {
  const categoryNames = {
    [PlatformCategory.SOCIAL]: 'Social Media',
    [PlatformCategory.PROFESSIONAL]: 'Professional',
    [PlatformCategory.DEVELOPMENT]: 'Development',
    [PlatformCategory.CONTENT]: 'Content Creation',
    [PlatformCategory.GAMING]: 'Gaming',
    [PlatformCategory.MESSAGING]: 'Messaging'
  };
  return categoryNames[category];
};

export const getPlatformsByCategory = (category: PlatformCategory): SocialPlatform[] => {
  return socialPlatforms.filter(platform => platform.category === category);
};

export const getAllCategories = (): PlatformCategory[] => {
  return Object.values(PlatformCategory);
};

export const getPlatformById = (id: string): SocialPlatform | undefined => {
  return socialPlatforms.find(platform => platform.id === id);
};