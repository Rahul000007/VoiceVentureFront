<template>
  <div class="audio-call container mt-5">
    <h1 class="text-center mb-4">Audio Call</h1>
    <button class="btn btn-primary mb-3" @click="connectSocket">Connect to Socket</button>

    <div v-if="inCall && isConnected" class="text-center">
      <audio ref="localAudio" autoplay controls class="w-100 mb-3"></audio>
      <audio ref="remoteAudio" autoplay controls class="w-100 mb-3"></audio>
      <button class="btn btn-danger" @click="endCall">End Call</button>
    </div>
    <div v-else class="text-center">
      <button class="btn btn-success" @click="callRequest">Call Request</button>
    </div>
    <div v-if="showIncomingCallModal" class="audio-modal text-center mt-4">
      <div class="alert alert-info">
        <p>Incoming call from <strong>{{ callerName }}
        </strong>. Do you want to accept?</p>
      </div>
      <button class="btn btn-success" @click="acceptCall">Accept</button>
      <button class="btn btn-danger" @click="declineCall">Decline</button>
    </div>
  </div>
  <button @click="matchView" >match view </button>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'AudioCallView',
  computed: {
    ...mapGetters('audio', ['inCall', 'localStream', 'remoteStream', 'isConnected', 'showIncomingCallModal', 'callerName', 'localUserId'])
  },
  watch: {
    localStream(newStream) {
      if (newStream) {
        this.$refs.localAudio.srcObject = newStream;
      }
    },
    remoteStream(newStream) {
      if (newStream) {
        this.$refs.remoteAudio.srcObject = newStream;
      }
    },
  },

  methods: {
    ...mapActions('audio', ['callRequest', 'endCall', 'callAcceptReject', 'connectSocket']),
    acceptCall() {
      this.callAcceptReject({action: 'accept'});
    },
    declineCall() {
      this.callAcceptReject({action: 'decline'});
    },
    matchView(){
      this.$router.push("/match");
    }
  },
};
</script>

<style scoped>
.audio-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #005bff;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>

