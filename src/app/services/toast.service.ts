import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _message = [""];
  private _visible = [false];
  toastClass: string[] = [];
  
  constructor() { }

  get message() { return this._message }
  get visible() { return this._visible }

  show(message: string, cssClass: string = 'success') {
    this._message[0] = message;
    this._visible[0] = true;
    this.toastClass[0] = cssClass;

    setTimeout(() => {
      this._visible[0] = false;
    }, 3000);
  }
}