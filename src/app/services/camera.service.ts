import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Filesystem, Directory} from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences'; 

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  /**
   * Tutoiral https://ionicframework.com/docs/angular/your-first-app/taking-photos
   * Service that handles taking photos and file sytsyem storage
   */

  constructor() { }

  public async addNewPhotoToDevice(){
    /**
     * Takes a photo by device and stores it in mobile
     * device file system.
     * This servuce will be used globaly so must stated as a provider
     * in app.module.ts and then injected as dependacy in a componment.
     * This will be used in event-modal to cpature images
     */

    const capturePhoto = await Camera.getPhoto({
      // Promots user to take a photo or select from photo album
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100

    })


  }
}
