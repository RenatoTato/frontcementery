export enum SocialPlatform {
  Twitter = 'Twitter',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Youtube = 'Youtube'
}
export interface Social {
    id?: number;  // Opcional si el backend genera un ID automáticamente
    stage_type: SocialPlatform;  // Plataforma (Twitter, Facebook, Instagram, Youtube)
    url?: string;  // URL de la red social (opcional)
    iglesia?: number;  // ID de la iglesia relacionada
  }