import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Message } from './schema/message.schema';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: { senderId: string; recipientId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message: Message = await this.chatService.createMessage(
      data.senderId,
      data.recipientId,
      data.content,
    );
    const recipientSocket = this.findSocketByUserId(data.recipientId);
    if (recipientSocket) {
      recipientSocket.emit('receiveMessage', message);
    }
    client.emit('receiveMessage', message);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const messages: Message[] = await this.chatService.getMessages(data.userId);
    client.emit('messages', messages);
  }

  private findSocketByUserId(userId: string): Socket {
    const connectedClients = this.server.sockets.sockets;
    for (const socketId in connectedClients) {
      if (connectedClients.hasOwnProperty(socketId)) {
        const socket = connectedClients[socketId];
        const user = socket.data.user;
        if (user && user._id.toString() === userId) {
          return socket;
        }
      }
    }
    return null;
  }
}
