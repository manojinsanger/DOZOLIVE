// zegoService.js
import KeyCenter from '@/zegodata/KeyCenter';
import ZegoExpressEngine from 'zego-express-engine-reactnative';

class ZegoService {
  constructor() {
    this.engine = null;
    this.eventHandlers = {};
    this.initialized = false;
  }

  async initEngine() {
    if (this.initialized) return;
    
    try {
      this.engine = await ZegoExpressEngine.createEngineWithProfile({
        appID: KeyCenter.appID,
        appSign: KeyCenter.appSign,
        scenario: 0,
      });
      
      this.initialized = true;
      console.log('Zego Engine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Zego engine:', error);
      throw error;
    }
  }

  async loginRoom(roomID, user, config = { userUpdate: true }) {
    if (!this.initialized) await this.initEngine();
    try {
      await this.engine.loginRoom(roomID, user, config);
      console.log('Logged in to room successfully');
    } catch (error) {
      console.error('Login room failed:', error);
      throw error;
    }
  }

  async logoutRoom() {
    if (!this.initialized) return;
    try {
      await this.engine.logoutRoom();
      console.log('Logged out from room successfully');
    } catch (error) {
      console.error('Logout room failed:', error);
      throw error;
    }
  }

  async startPublishingStream(streamID) {
    if (!this.initialized) return;
    try {
      await this.engine.startPublishingStream(streamID);
      console.log('Started publishing stream successfully');
    } catch (error) {
      console.error('Start publishing stream failed:', error);
      throw error;
    }
  }

  async stopPublishingStream() {
    if (!this.initialized) return;
    try {
      await this.engine.stopPublishingStream();
      console.log('Stopped publishing stream successfully');
    } catch (error) {
      console.error('Stop publishing stream failed:', error);
      throw error;
    }
  }

  async startPlayingStream(streamID, viewConfig = {}) {
    if (!this.initialized) return;
    try {
      await this.engine.startPlayingStream(streamID, viewConfig);
      console.log('Started playing stream successfully');
    } catch (error) {
      console.error('Start playing stream failed:', error);
      throw error;
    }
  }

  async stopPlayingStream(streamID) {
    if (!this.initialized) return;
    try {
      await this.engine.stopPlayingStream(streamID);
      console.log('Stopped playing stream successfully');
    } catch (error) {
      console.error('Stop playing stream failed:', error);
      throw error;
    }
  }

  async mutePublishStreamAudio(mute) {
    if (!this.initialized) return;
    try {
      await this.engine.mutePublishStreamAudio(mute);
      console.log(`Publish stream audio ${mute ? 'muted' : 'unmuted'} successfully`);
    } catch (error) {
      console.error('Mute publish stream audio failed:', error);
      throw error;
    }
  }

  async mutePlayStreamAudio(streamID, mute) {
    if (!this.initialized) return;
    try {
      await this.engine.mutePlayStreamAudio(streamID, mute);
      console.log(`Play stream audio ${mute ? 'muted' : 'unmuted'} successfully`);
    } catch (error) {
      console.error('Mute play stream audio failed:', error);
      throw error;
    }
  }

  async sendCustomCommand(command, message, toUserIDs) {
    if (!this.initialized) return;
    try {
      await this.engine.sendCustomCommand(command, message, toUserIDs);
      console.log('Custom command sent successfully');
    } catch (error) {
      console.error('Send custom command failed:', error);
      throw error;
    }
  }

  async setRoomExtraInfo(key, value) {
    if (!this.initialized) return;
    try {
      await this.engine.setRoomExtraInfo(key, value);
      console.log('Room extra info set successfully');
    } catch (error) {
      console.error('Set room extra info failed:', error);
      throw error;
    }
  }

  async getRoomExtraInfo() {
    if (!this.initialized) return {};
    try {
      const info = await this.engine.getRoomExtraInfo();
      return info || {};
    } catch (error) {
      console.error('Get room extra info failed:', error);
      return {};
    }
  }

  async setSeatLockStatus(seatNumber, isLocked) {
    if (!this.initialized) return;
    try {
      await this.setRoomExtraInfo(
        `seat_${seatNumber}_status`, 
        JSON.stringify({
          locked: isLocked,
          timestamp: Date.now()
        })
      );
    } catch (error) {
      console.error('Failed to set seat lock status:', error);
      throw error;
    }
  }

  async getSeatLockStatus(seatNumber) {
    if (!this.initialized) return false;
    try {
      const info = await this.getRoomExtraInfo();
      const seatStatus = info[`seat_${seatNumber}_status`];
      
      if (!seatStatus) return false;
      
      try {
        const parsed = JSON.parse(seatStatus);
        return parsed.locked === true;
      } catch {
        return seatStatus === 'true';
      }
    } catch (error) {
      console.error('Failed to get seat lock status:', error);
      return false;
    }
  }

  async setRoomLockStatus(isLocked) {
    if (!this.initialized) return;
    try {
      await this.setRoomExtraInfo('room_lock_status', isLocked.toString());
    } catch (error) {
      console.error('Failed to set room lock status:', error);
      throw error;
    }
  }

  async getRoomLockStatus() {
    if (!this.initialized) return false;
    try {
      const info = await this.getRoomExtraInfo();
      return info['room_lock_status'] === 'true';
    } catch (error) {
      console.error('Failed to get room lock status:', error);
      return false;
    }
  }

  on(event, handler) {
    if (!this.initialized) {
      console.warn('Cannot set event handler - engine not initialized');
      return;
    }
    this.engine.on(event, handler);
    this.eventHandlers[event] = handler;
  }

  off(event) {
    if (!this.initialized || !this.eventHandlers[event]) return;
    this.engine.off(event, this.eventHandlers[event]);
    delete this.eventHandlers[event];
  }

  async destroyEngine() {
    if (!this.initialized) return;
    try {
      await this.engine.destroyEngine();
      this.initialized = false;
      this.engine = null;
      console.log('Engine destroyed successfully');
    } catch (error) {
      console.error('Destroy engine failed:', error);
      throw error;
    }
  }
}

export default new ZegoService();