import React, { useState } from 'react';
import '../style/Signup.css';
import {useMutation} from "react-query";
import {signup} from "../Api";

interface SignupProps {
    onSwitchToLogin: () => void;
}

export interface SignupData {
    userId: string,
    userName: string,
    password: string
}

// id, password, name
export const Signup= ({ onSwitchToLogin }: SignupProps) => {
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const mutation = useMutation(signup, {
        onSuccess: (data) => {
            console.log({data});
            if(data.code !== 200){
                alert(data.message);
                return;
            }
            alert('성공');
            // 추가적인 성공 처리 로직
        },
        onError: (error) => {
            console.error('Signup failed', error);
            // 추가적인 실패 처리 로직
        },
    });

    const handleSignup = () => {
        if(!id){
            alert('Id is empty');
        }
        if(!name){
            alert('Name is empty');
        }
        if(!password || !confirmPassword){
            alert('Password is empty');
        }
        if(password !== confirmPassword){
            alert('Password is different from confirm password')
        }
        const signupData: SignupData = { userId: id, userName: name, password: password };
        mutation.mutate(signupData);

        // 회원가입 로직 추가
    };
    return (
        <div className="signup-container">
            <header>
                <h2>Sign Up</h2>
            </header>
            <div className="signup-form">
                <input
                    type="id"
                    placeholder="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    type="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleSignup}>Sign Up</button>
                <p>
                    Already have an account?
                    <span onClick={onSwitchToLogin}> Log In</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
