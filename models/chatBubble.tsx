export type ChatBubbleType = {
    message: Message,
    name: string
}

type Message = {
    text:string,
    user:string
}