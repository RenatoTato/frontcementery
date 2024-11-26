import { Iglesia } from "./iglesia.model";

export interface SocialFilter {
    stage_type?: string; 
    iglesia?: Iglesia;  // ID de la iglesia relacionada          // Tipo de plataforma social (por ejemplo, Facebook, Instagram)
}
