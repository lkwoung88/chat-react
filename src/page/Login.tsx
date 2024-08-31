import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useMutation } from 'react-query';
import '../style/Login.css';
import {login} from "../Api";
import exp from "constants";

interface LoginProps {
    onSwitchToSignup: () => void;
    onLoginSuccess: (loginResData: LoginResData) => void;
}
export interface LoginData {
    userId: string;
    password: string;
}
export interface LoginResData {
    token: string,
    type: string,
    userId: string,
    userName: string,
    authorities: []
}

const Login = ({ onSwitchToSignup, onLoginSuccess }: LoginProps) => {
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const mutation = useMutation(login, {
        onSuccess: (data) => {
            console.log('Login successful', data);
            onLoginSuccess(data.responseBody); // JWT 토큰을 받아 처리합니다.
            // 추가적인 성공 처리 로직
        },
        onError: (error) => {
            console.error('Login failed', error);
            alert('아이디 패스워드를 확인해주세요');
            // 추가적인 실패 처리 로직
        },
    });

    const loginRequest = (loginData : LoginData) => {
        mutation.mutate(loginData);
    }

    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const loginData: LoginData = { userId: userId, password: password };
        loginRequest(loginData);
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            const loginData: LoginData = { userId: userId, password: password };
            loginRequest(loginData);
        }
    }

    return (
        <div className="login-container">
            <header>
                <h2>Log In</h2>
            </header>
            <div className="login-form">
                <input
                    type="id"
                    placeholder="id"
                    value={userId}
                    onChange={handleIdChange}
                    onKeyDown={handleEnterPress}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyDown={handleEnterPress}
                />
                <button onClick={handleLogin}>Log In</button>
                <p>
                    Don't have an account?
                    <span onClick={onSwitchToSignup}> Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
