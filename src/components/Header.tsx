// src/components/Header.tsx
import React from 'react';
import '../style/Header.css';

export interface ChatRoomNameProps {
    selectedChatRoomName: string | undefined;
}

const Header: React.FC<ChatRoomNameProps> = ({selectedChatRoomName}) => {
    return (
        <header className="chat-header">
            <div className="header-content">
                <h2># {selectedChatRoomName}</h2>
                <div className="header-actions">
                    {/*<button>Invite</button>*/}
                    {/*<button>Settings</button>*/}
                </div>
            </div>
        </header>
    );
};

export default Header;
