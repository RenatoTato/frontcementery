import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  calculateTotalPages(totalItems: number, pageSize: number): number {
    return Math.ceil(totalItems / pageSize);
  }

  validatePageChange(currentPage: number, step: number, totalPages: number): number {
    const newPage = currentPage + step;
    return Math.max(1, Math.min(newPage, totalPages));
  }
}

