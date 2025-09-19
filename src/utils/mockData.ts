export const mockCountries = [
  { name: { common: 'United States' }, cca2: 'US', idd: { root: '+1', suffixes: [''] }, flag: '🇺🇸' },
  { name: { common: 'United Kingdom' }, cca2: 'GB', idd: { root: '+44', suffixes: [''] }, flag: '🇬🇧' },
  { name: { common: 'India' }, cca2: 'IN', idd: { root: '+91', suffixes: [''] }, flag: '🇮🇳' },
  { name: { common: 'Canada' }, cca2: 'CA', idd: { root: '+1', suffixes: [''] }, flag: '🇨🇦' },
  { name: { common: 'Australia' }, cca2: 'AU', idd: { root: '+61', suffixes: [''] }, flag: '🇦🇺' },
  { name: { common: 'Germany' }, cca2: 'DE', idd: { root: '+49', suffixes: [''] }, flag: '🇩🇪' },
  { name: { common: 'France' }, cca2: 'FR', idd: { root: '+33', suffixes: [''] }, flag: '🇫🇷' },
  { name: { common: 'Japan' }, cca2: 'JP', idd: { root: '+81', suffixes: [''] }, flag: '🇯🇵' },
  { name: { common: 'Brazil' }, cca2: 'BR', idd: { root: '+55', suffixes: [''] }, flag: '🇧🇷' },
  { name: { common: 'Mexico' }, cca2: 'MX', idd: { root: '+52', suffixes: [''] }, flag: '🇲🇽' },
];

export const aiResponses = [
  "That's an interesting question! Let me think about that for a moment.",
  "I understand what you're asking. Here's my perspective on that:",
  "Based on the information you've provided, I would suggest:",
  "That's a great point. I think there are several ways to approach this:",
  "I appreciate you sharing that with me. From my analysis:",
  "Let me break that down for you in a clear and helpful way:",
  "That's something I can definitely help you with. Here's what I think:",
  "I find that topic fascinating. Let me share some insights:",
  "Good question! I've been thinking about similar topics lately:",
  "I can see why that would be important to you. My thoughts are:",
];

export const generateAIResponse = (): string => {
  return aiResponses[Math.floor(Math.random() * aiResponses.length)];
};