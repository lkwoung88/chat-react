import Header from "../components/Header";
import Sidebar, {RoomInfo} from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import React, {useEffect, useState} from "react";
import {useMutation} from "react-query";
import {getChatRoomList} from "../Api";

export interface ChatRoomProps {
    roomName: string;
    roomId: string;
    creatorId: string;
    participantsList: string[];
    createdAt: string;
}

export const ChatMain = () =>{
    const [chatRoomList, setChatRoomList] = useState<ChatRoomProps[]>([]);
    const [selectedChatRoomId, setSelectedChatRoomId] = useState<string>('');
    const [selectedChatRoomName, setSelectedChatRoomName] = useState<string>('');
    const [selectedChatRoom, setSelectedChatRoom] = useState<RoomInfo>();
    const mutation = useMutation(getChatRoomList, {
        onSuccess: (data) => {
            console.log('getChatRoomList successful', data);
            setChatRoomList(data.responseBody);
        },
        onError: (error) => {
            console.error('getChatRoomList failed', error);
        },
    });

    const handleSelectChatRoom = (roomInfo: RoomInfo) =>{
        setSelectedChatRoom(roomInfo);
    }

    const handleChatRoomClick = (chatRoomId:string, chatRoomName:string) =>{
        setSelectedChatRoomId(chatRoomId);
        setSelectedChatRoomName(chatRoomName);
    }

    const handleChatRoomRefresh = () =>{
        mutation.mutate();
    }

    useEffect(()=>{
        mutation.mutate();
    },[]);

    useEffect(()=>{
        setSelectedChatRoomId(chatRoomList[0]?.roomId);
        setSelectedChatRoomName(chatRoomList[0]?.roomName);
    },[chatRoomList])

    return(
        <>
            <Header selectedChatRoomName={selectedChatRoom?.roomName}/>
            <div className="main-layout">
                <Sidebar chatRoomList={chatRoomList} refreshSidebar={handleChatRoomRefresh} selectChatRoom={handleSelectChatRoom}/>
                <div className="chat-container">
                    <ChatWindow chatRoom={selectedChatRoom} />
                </div>
            </div>
        </>
    )
}