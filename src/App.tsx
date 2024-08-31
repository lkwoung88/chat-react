import React, { useState } from 'react';
import './style/App.css';
import Signup from "./page/Signup";
import {QueryClient, QueryClientProvider} from "react-query"
import Login, {LoginResData} from "./page/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import {ChatMain} from "./page/ChatMain";



export const App = () => {
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const queryClient = new QueryClient();
    const handleSwitchToSignup = () => {
        setIsSignup(true);
    };

    const handleSwitchToLogin = () => {
        setIsSignup(false);
    };

    const handleLoginSuccess = (loginResData: LoginResData) => {
        localStorage.setItem('token', loginResData.token);
        localStorage.setItem('userId', loginResData.userId);
        localStorage.setItem('userName', loginResData.userName);
        setIsLoggedIn(true);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className="app-container">
                {isLoggedIn ? (
                    <>
                        <ChatMain/>
                    </>
                ) : (
                    isSignup ? (
                        <Signup onSwitchToLogin={handleSwitchToLogin} />
                    ) : (
                        <Login onSwitchToSignup={handleSwitchToSignup} onLoginSuccess={handleLoginSuccess} />
                    )
                )}
            </div>
        </QueryClientProvider>
    );
};




export default App;
