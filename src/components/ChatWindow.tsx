// src/components/ChatWindow.tsx
import React, { useEffect, useRef, useState } from 'react';
import '../style/ChatWindow.css';
import { RoomInfo } from './Sidebar';
import { useMutation } from 'react-query';
import { getMessageList } from '../Api';
import { nowDateToString } from '../Util/common';
import { MessageType } from '../Util/constants';
import MessageInput from './MessageInput';
import StompService from '../Util/stomp';
import { IFrame, IMessage } from '@stomp/stompjs';

export interface ChatWindowProps {
    chatRoom: RoomInfo | undefined;
}

export interface MessageListProps {
    roomId: string | undefined;
    startDate: string;
    messageType: string;
}

export interface Message {
    message: string;
    senderId: string;
    messageTime: string;
    senderName: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatRoom }: ChatWindowProps) => {
    const [messageListProps, setMessageListProps] = useState<MessageListProps>();
    const [messageList, setMessageList] = useState<Message[]>([]);
    const stompService = useRef<StompService | null>(null);

    const mutation = useMutation(getMessageList, {
        onSuccess: (data) => {
            setMessageList(data.responseBody);
            console.log('getMessageList successful', data);
        },
        onError: (error) => {
            console.error('getMessageList failed', error);
        },
    });

    useEffect(() => {
        if (!chatRoom || !chatRoom.roomId) {
            console.error('Chat room or room ID is not available.');
            return;
        }

        const messageListProps: MessageListProps = {
            roomId: chatRoom.roomId,
            startDate: nowDateToString(),
            messageType: MessageType.TALK,
        };
        setMessageListProps(messageListProps);

        stompService.current = new StompService();

        const url = `/sub/chat/room/${chatRoom.roomId}`;
        const onConnect = () => {
            console.log('Connected to STOMP');
            stompService.current!.subscribe(url, (msg: IMessage) => {
                const newMessage = JSON.parse(msg.body) as Message;
                console.log('Received message:', newMessage);
                setMessageList((prevMessages) => [...prevMessages, newMessage]);
            });
        };

        const onError = (frame: IFrame) => {
            console.error('STOMP error:', frame);
        };

        stompService.current?.disconnect();
        stompService.current?.connect(onConnect, onError);

        return () => {
            stompService.current?.disconnect();
        };
    }, [chatRoom]);

    useEffect(() => {
        if (messageListProps) {
            mutation.mutate(messageListProps);
        }
    }, [messageListProps]);

    const handleSendMessage = (message: string) => {
        stompService.current!.sendMessage('/pub/chat/message',{
            userId:'',
            requestBody:{
                messageType:'TALK',
                chatRoomId: chatRoom?.roomId,
                senderId: localStorage.getItem('userId'), // 여기에 실제 사용자 ID를 설정하세요.
                message: message,
            }
        });
    }


    return (
        <div className="chat-window">
            <div className="message-list">
                {messageList && messageList.length > 0 ? (
                    messageList.map((data, index) => (
                        <div className="message" key={index}>
                            <div className="message-avatar">
                                <img src="/path-to-avatar.png" alt="User Avatar" />
                            </div>
                            <div className="message-content">
                                <div className="message-header">
                                    <span className="message-username">{data.senderName}</span>
                                    <span className="message-timestamp">{data.messageTime}</span>
                                </div>
                                <p>{data.message}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-messages">아직 메시지가 없습니다</div>
                )}

            </div>
            <MessageInput handleSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
