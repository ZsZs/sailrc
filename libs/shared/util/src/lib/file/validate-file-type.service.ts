import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidateFileTypeService {
  private imageOrVideoFileTypes = [
    'application/ogg',
    'application/vnd.apple.mpegurl',
    'application/x-mpegURL',
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
  ];

  validate( file: File): boolean {
    return this.imageOrVideoFileTypes.includes(file.type);
  }
}
