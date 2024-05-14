import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() io: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, @MessageBody() message: string) {
    this.io.emit('received', message);
    console.log(client);
    return {
      message: message
    };
  }
}
