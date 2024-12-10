export interface ObituarioFilter {
    place?: string;                // Lugar del obituario (por ejemplo, capilla)
    name?: string;
    cementery?: string;            // Cementerio asociado
    deceased?: number;             // ID del difunto
    start_date?: string;              // Fecha de inicio para el filtro con fecha de muerte
    end_date?: string;                // Fecha de fin para el filtro con fecha de muerte
    sborn_date?: string;  
    eborn_date?: string; 
    search?: string;
}
