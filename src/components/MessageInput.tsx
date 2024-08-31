// src/components/MessageInput.tsx
import React, { useState } from 'react';
import '../style/MessageInput.css';

export interface MessageInputProps {
    handleSendMessage: (message:string)=> void;
}

const MessageInput: React.FC<MessageInputProps> = ({handleSendMessage}) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };
    const handleSendClick = () => {
        console.log(message);
        if (message.trim() !== '') {
            handleSendMessage(message); // 메시지를 보내는 함수 호출
            setMessage(''); // 입력 필드 초기화
        }
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            handleSendClick();
        }
    }

    return (
        <div className="message-input-container">
            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
            />
            <button onClick={handleSendClick}>Send</button>
        </div>
    );
};

export default MessageInput;
