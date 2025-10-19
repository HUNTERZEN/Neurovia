import { connect as connectVideo, Room, RemoteParticipant } from 'twilio-video';
import { Client as ConversationsClient } from '@twilio/conversations';

export class CommunicationService {
  private videoRoom: Room | null = null;
  private conversationsClient: ConversationsClient | null = null;

  // Initialize Video Call
  async initializeVideoCall(accessToken: string, roomName: string) {
    try {
      this.videoRoom = await connectVideo(accessToken, {
        name: roomName,
        audio: true,
        video: { width: 1280, height: 720 }
      });

      // Handle participants
      this.videoRoom.on('participantConnected', (participant: RemoteParticipant) => {
        console.log('Participant connected:', participant.identity);
        this.attachParticipantTracks(participant);
      });

      this.videoRoom.on('participantDisconnected', (participant: RemoteParticipant) => {
        console.log('Participant disconnected:', participant.identity);
        this.detachParticipantTracks(participant);
      });

      return this.videoRoom;
    } catch (error) {
      console.error('Error connecting to video room:', error);
      throw error;
    }
  }

  // Initialize Voice Call (audio only)
  async initializeVoiceCall(accessToken: string, roomName: string) {
    try {
      this.videoRoom = await connectVideo(accessToken, {
        name: roomName,
        audio: true,
        video: false // Audio only
      });

      return this.videoRoom;
    } catch (error) {
      console.error('Error connecting to voice room:', error);
      throw error;
    }
  }

  // Initialize Chat
  async initializeChat(accessToken: string) {
    try {
      this.conversationsClient = await ConversationsClient.create(accessToken);
      return this.conversationsClient;
    } catch (error) {
      console.error('Error initializing chat:', error);
      throw error;
    }
  }

  // Attach participant video/audio tracks
  private attachParticipantTracks(participant: RemoteParticipant) {
    const participantDiv = document.createElement('div');
    participantDiv.id = participant.identity;

    const isAttachable = (t: unknown): t is { attach: (...args: unknown[]) => HTMLElement | HTMLElement[] } => {
      return typeof t === 'object' && t !== null && 'attach' in t && typeof (t as { attach?: unknown }).attach === 'function';
    };

    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        const track = publication.track;
        if (track && isAttachable(track)) {
          const attached = track.attach();
          if (Array.isArray(attached)) {
            attached.forEach(node => participantDiv.appendChild(node));
          } else {
            participantDiv.appendChild(attached);
          }
        }
      }
    });

    participant.on('trackSubscribed', track => {
      if (isAttachable(track)) {
        const attached = track.attach();
        if (Array.isArray(attached)) {
          attached.forEach(node => participantDiv.appendChild(node));
        } else {
          participantDiv.appendChild(attached);
        }
      }
    });

    document.getElementById('remote-media')?.appendChild(participantDiv);
  }

  private detachParticipantTracks(participant: RemoteParticipant) {
    const participantDiv = document.getElementById(participant.identity);
    participantDiv?.remove();
  }

  // Disconnect from room
  disconnect() {
    if (this.videoRoom) {
      this.videoRoom.disconnect();
      this.videoRoom = null;
    }
  }
}
