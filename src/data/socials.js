// Social + contact links. `key` selects the icon (see SocialIcon). Email triggers
// the copy-cursor behaviour. Identity (email) comes from the swappable site config.
import { site } from '../config/site'

export const EMAIL = site.email

export const socials = [
  { key: 'email', name: 'Email', href: `mailto:${EMAIL}`, cursor: 'email' },
  { key: 'linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com/in/abishai-george-e-gosula/' },
  // TODO: replace placeholder handles with real ones.
  { key: 'instagram', name: 'Instagram', href: 'https://instagram.com/' },
  { key: 'youtube', name: 'YouTube', href: 'https://youtube.com/' },
  { key: 'x', name: 'X', href: 'https://x.com/' },
]
