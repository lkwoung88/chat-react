import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import {getUser} from "../Api";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {RoomInfo} from "./Sidebar";

export interface addUserModalParam {
    closeModal: () => void;
    createRoom: (modalInfo: RoomInfo) => void;
}

export interface UserIdAndName {
    userId: string;
    userName: string;
}

export const AddUserModal = ({closeModal, createRoom}: addUserModalParam) => {
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [selectedUsersId, setSelectedUsersId] = useState<string[]>([]);
    const [selectedUsersName, setSelectedUsersName] = useState<string[]>([]);
    const [users, setUsers] = useState<UserIdAndName[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserIdAndName[]>([]);
    const [initValue,setInitValue] = useState<string>('0');
    const mutation = useMutation(getUser, {
            onSuccess: (data) => {
                console.log(data);
                setUsers((prevUsers) =>[...prevUsers,...data.responseBody]);
            },
            onError: (error) => {
                console.log(error);
            },
        });

    useEffect(()=>{
        mutation.mutate();
    },[])

    const handleSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const target = event.target.value;
        if(target === '0'){
            return;
        }
        const selectedUserId = target.split('-')[0];
        const selectedUserName = target.split('-')[1];
        const selectedUser: UserIdAndName = {userId: selectedUserId, userName: selectedUserName};
        if(target && !selectedUsers.includes(selectedUser)){
            setSelectedUsers([...selectedUsers,selectedUser]);
        }
        setInitValue('0');
    }

    const handleRemoveUser = (removeId: string) =>{
        const updatedUsers = selectedUsers.filter(user => user.userId !== removeId);
        setSelectedUsers(updatedUsers);
    }

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h4>새 채팅방 만들기</h4>
                    <input
                        type="text"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="채팅방 이름 입력"
                        className="add-room-input"
                    />
                    <select value={initValue} onChange={handleSelectedUser} className="user-dropdown">
                        <option value={initValue} key=''>사용자 선택</option>
                        {users?.map((data)=>(
                            // 썸네일 추가
                            <option value={data.userId +'-'+data.userName} key={data.userId +'-'+data.userName}>{data.userName}</option>
                        ))}
                    </select>
                    <div className="selected-users">
                        {selectedUsers?.map((data)=>(
                            <div className="selected-user">
                                {data.userName}
                                <button onClick={()=>handleRemoveUser(data.userId)} className="remove-user-button">제거</button>
                            </div>
                        ))}
                    </div>
                    <div className="button-group">
                        <button onClick={()=> createRoom({
                            roomName: newRoomName,
                            participantsList: selectedUsers.map(data=>data.userId),
                            roomId:''
                        })} className="add-room-confirm-button">
                            추가
                        </button>
                        <button onClick={() => closeModal()} className="add-room-cancel-button">
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </>)
}