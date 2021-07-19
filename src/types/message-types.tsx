export interface CreateMessageType{
  jobOfferId: string,
  body: string,
  senderName: string,
  senderOptions: string,
}

export interface MessageType{
  senderName: string,
  message: string,
  senderOptions: string,
  createdAt: Date,
}
