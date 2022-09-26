import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private route: Router
  ){}
 // private route: Router;
  isLoggedIn = false;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const cookie = this.isLoggedIn = this.storageService.isLoggedIn();
    this.redirect(cookie);
    return cookie;
  }
  redirect(flag: boolean) {
    if(!flag){
      this.route.navigate(['login']);
    }
  }
}
