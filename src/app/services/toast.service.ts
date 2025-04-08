import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _message = [""];
  private _visible = [false];
  
  constructor() { }

  get message() { return this._message }
  get visible() { return this._visible }

  show(message: string) {
    this._message[0] = message;
    this._visible[0] = true;

    setTimeout(() => {
      this._visible[0] = false;
    }, 300000);
  }
}