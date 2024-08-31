// src/components/Sidebar.tsx
import '../style/Sidebar.css';
import {ChatRoomProps} from "../page/ChatMain";
import {useEffect, useState} from "react";
import {AddUserModal} from "./AddUserModal";
import {useMutation} from "react-query";
import {createRoom, getUser} from "../Api";

export interface RoomInfo {
    roomId: string;
    roomName: string;
    participantsList: string[];
}
export interface SidebarProps {
    chatRoomList : ChatRoomProps[];
    refreshSidebar: () => void;
    selectChatRoom: (roomInfo: RoomInfo) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({chatRoomList,refreshSidebar,selectChatRoom}) => {
    const userName = localStorage.getItem("userName");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<RoomInfo>();

    const mutation = useMutation(createRoom, {
        onSuccess: (data) => {
            refreshSidebar();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const handlCloseModal = () => {
        setModalOpen(false);
    }
    const handleCreateRoom = (modalInfo: RoomInfo) => {
        setModalInfo(modalInfo);
        setModalOpen(false);

    }

    useEffect(()=>{
        mutation.mutate(modalInfo);
    },[modalInfo])





    // user 이름, 채팅방 리스트
    return (
        <aside className="chat-sidebar">
            <div className="profile-section">
                <img src="/path-to-avatar.png" alt="User Avatar" className="avatar" />
                <h3>{userName}님,</h3>
            </div>
            <div className="channel-list">
                <h4>Rooms</h4>
                <ul>
                    {chatRoomList?.map((data) => (
                        <li onClick={()=>selectChatRoom(data)} key={data.roomId}># {data.roomName}</li>
                    ))}
                </ul>
                <button onClick={() => setModalOpen(true)} className="add-room-button">
                    채팅방 추가
                </button>
            </div>
            {/* 모달 창 */}
            {modalOpen && (
                <AddUserModal closeModal={handlCloseModal} createRoom={handleCreateRoom} />
            )}
        </aside>
    );
};

export default Sidebar;
