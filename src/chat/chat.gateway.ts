import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsGuard } from 'src/common/guards/ws-guard';
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() io: Server;
  private clients: Set<Socket> = new Set();
  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { to: string; message: string }) {
    try {
      this.io.to(data.to).emit('direct-message', data.message);
      return {
        message: data.message
      };
    } catch (err) {
      console.log(err);
    }
  }
}
