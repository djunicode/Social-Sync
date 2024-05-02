"use client"
import { io } from 'socket.io-client';

const url = process.env.NEXT_PUBLIC_API_URL
export const socket = io(url, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 5000,
    transports: ['websocket'],
    upgrade: false,
});