import { io, Socket } from "socket.io-client";

export class WebRTCService {
  private localStream: MediaStream | null = null;
  private peerConnection: RTCPeerConnection | null = null;
  private socket: Socket | null = null;

  constructor(socketUrl: string) {
    // Initialize socket connection
    this.socket = io(socketUrl);
    
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    });
  }

  async startCall(isVideo: boolean) {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: isVideo,
      audio: true
    });

    this.localStream.getTracks().forEach(track => {
      this.peerConnection?.addTrack(track, this.localStream!);
    });

    return this.localStream;
  }

  async createOffer() {
    const offer = await this.peerConnection?.createOffer();
    await this.peerConnection?.setLocalDescription(offer);
    this.socket?.emit('offer', offer);
  }

  async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.peerConnection?.setRemoteDescription(answer);
  }

  async handleOffer(offer: RTCSessionDescriptionInit) {
    await this.peerConnection?.setRemoteDescription(offer);
    const answer = await this.peerConnection?.createAnswer();
    await this.peerConnection?.setLocalDescription(answer);
    this.socket?.emit('answer', answer);
  }
}
