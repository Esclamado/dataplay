import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socketInstance:any;
  socketId:any;

  constructor(
    private socket: Socket
  ) { }

  intializeSocket(){
    this.socket.connect();

  }

  getSocketId(){
    return this.socket
      .fromEvent("askForUserId")
      .pipe(map(data => data));
  }

  saveSocketId(data){
    this.socket.emit('userIdReceived',data);
  }

  sendNotif(notif: any) {
    this.socket.emit("admin notif", notif);
  }

  sendAtheleteNotif(notif: any) {
    this.socket.emit("notif", notif);
  }

  sendActivityLog(data){
    this.socket.emit('activity log', data);
    this.sendNotif(data);
  }

  getNotif(){
    return this.socket
      .fromEvent("admin notif")
      .pipe(map( data => data ));
  }

  getActivityLog() {
    return this.socket
      .fromEvent("activity log")
      .pipe(map( data => data));
  }

}
