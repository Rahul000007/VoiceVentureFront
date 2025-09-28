
<template>
  <div style="background: black">
    <div class="container d-flex justify-content-center align-items-center vh-100" style="background: black">
      <div class="card shadow-lg "
           style="width: 34rem; height: 49rem; border-radius: 50px; background:#FFFFFF; overflow: hidden;">

        <div class="p-5 pb-5 pb-lg-4 ">

          <!-- Card Header -->
          <div class="d-flex justify-content-around  ">

            <img :src="require('/src/assets/img/setting.png')" class="position-absolute top-0 start-0 ms-4 mt-4"
                 style="width: 30px; height: 30px;" alt="Settings Icon">

            <h1 class="fw-bold custom-text" style="font-family: 'Poppins', sans-serif; font-size: 1.5rem;">Voice
              Venture</h1>

            <img :src="require('/src/assets/img/message.png')" class="position-absolute top-0 end-0 me-3 mt-4"
                 style="width: 30px; height: 30px;" alt="User Profile Icon">

          </div>

          <!-- Profile Avatars -->
          <div class="d-flex justify-content-center align-items-center mt-3 ">

            <div class="rounded-circle border border-4 border-secondary w-50">
              <img :src="require('/src/assets/img/user1.png')" class="img-fluid rounded-circle" alt="User 1"
                   style="object-fit: contain;"/>
            </div>

            <div class="link-img-container">
              <img :src="require('/src/assets/img/link.png')" class="img-fluid" alt="---link---"
                   style="object-fit: contain;"/>
            </div>

            <div  class=" text-center  w-50 " >
              <div class="rounded-circle border border-4 border-secondary ">
                <img :src="require('/src/assets/img/user2.png')" class="img-fluid rounded-circle" alt="User 2"
                     style="object-fit: contain;"/>
              </div >
              <p v-if="matchedUserName">{{ matchedUserName }}</p>
            </div>

          </div>
          <!--  Loader-->
          <div class="d-flex justify-content-center" v-if="matching">
            <div class="loader"></div>
          </div>

          <audio ref="localAudio" autoplay controls  class="" ></audio>
          <audio ref="remoteAudio" autoplay controls class=""></audio>

          <!-- Matching Button -->
          <div class="d-flex justify-content-center mt-4" v-if="!matching && !matchAccepted">
            <button class="btn btn-outline-success px-4 w-75 rounded-5" @click="startMatching">Start Matching</button>
          </div>

          <!-- Accept Decline -->
          <div class="d-flex justify-content-around mt-4" v-if="matchFound && !matchAccepted">

            <button class="btn btn-outline-success px-4 w-50 rounded-4 " @click="acceptMatch">Accept</button>

            <div class="mx-4" style="width:40px; height: 10px;">
              <img :src="require('/src/assets/img/vertical1.png')" class="img-fluid" alt="---link---"
                   style="object-fit: contain;"/>
            </div>

            <button class="btn btn-outline-danger px-4 w-50 rounded-4 " @click="declineMatch">Decline</button>

          </div>

          <!-- End Call -->
          <div class="d-flex justify-content-center mt-4" v-if="matchedUserMatchAcceptanceStatus ==='ACCEPTED'">
            <button class="btn btn-outline-danger px-4 w-75 rounded-5" @click="endCall">End Call</button>
          </div>

        </div>

        <div class="px-lg-5 px-3 container">

          <div class="d-flex justify-content-evenly">
            <div class="card shadow-lg rounded-4 border-dark border " style="width: 7.7rem; height: 9rem;">
              <img :src="require('/src/assets/img/remove.png')"
                   class="position-absolute"
                   style="top: 0; right: 0; width: 30px; height: 30px; transform: translate(50%, -50%);"
                   alt="Cancel Icon">
              <div class="rounded-circle border border-5 border-secondary m-auto mt-1"
                   style="width: 65px; height: 65px;">
                <img :src="require('/src/assets/img/user2.png')" class="img-fluid  rounded-circle"
                     alt="User 2" style="object-fit: cover; width: 100%; height: 100%;"/>
              </div>
              <div class="card-body text-center p-0 m-0 mt-1">
                <p class="card-text mb-1">Shan Michal</p>
                <button class="btn btn-sm btn-outline-success rounded-5">Request</button>
              </div>
            </div>
            <div class="card shadow-lg rounded-4 border-dark border mx-2" style="width: 7.7rem; height: 9rem;">
              <img :src="require('/src/assets/img/remove.png')"
                   class="position-absolute"
                   style="top: 0; right: 0; width: 30px; height: 30px; transform: translate(50%, -50%);"
                   alt="Cancel Icon">
              <div class="rounded-circle border border-5 border-secondary m-auto mt-1"
                   style="width: 65px; height: 65px;">
                <img :src="require('/src/assets/img/user2.png')" class="img-fluid  rounded-circle"
                     alt="User 2" style="object-fit: cover; width: 100%; height: 100%;"/>
              </div>
              <div class="card-body text-center p-0 m-0 mt-1">
                <p class="card-text mb-1">Shan Michal</p>
                <button class="btn btn-sm btn-outline-success rounded-5">Request</button>
              </div>
            </div>
            <div class="card shadow-lg rounded-4 border-dark border" style="width: 7.7rem; height: 9rem;">
              <img :src="require('/src/assets/img/remove.png')"
                   class="position-absolute"
                   style="top: 0; right: 0; width: 30px; height: 30px; transform: translate(50%, -50%);"
                   alt="Cancel Icon">
              <div class="rounded-circle border border-5 border-secondary m-auto mt-1"
                   style="width: 65px; height: 65px;">
                <img :src="require('/src/assets/img/user2.png')" class="img-fluid  rounded-circle"
                     alt="User 2" style="object-fit: cover; width: 100%; height: 100%;"/>
              </div>
              <div class="card-body text-center p-0 m-0 mt-1">
                <p class="card-text mb-1">Shan Michal</p>
                <button class="btn btn-sm btn-outline-success rounded-5">Request</button>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-evenly mt-3">
            <div class="card shadow-lg rounded-4 border-dark border" style="width: 7.7rem; height: 9rem;">
              <img :src="require('/src/assets/img/remove.png')"
                   class="position-absolute"
                   style="top: 0; right: 0; width: 30px; height: 30px; transform: translate(50%, -50%);"
                   alt="Cancel Icon">
              <div class="rounded-circle border border-5 border-secondary m-auto mt-1"
                   style="width: 65px; height: 65px;">
                <img :src="require('/src/assets/img/user2.png')" class="img-fluid  rounded-circle"
                     alt="User 2" style="object-fit: cover; width: 100%; height: 100%;"/>
              </div>
              <div class="card-body text-center p-0 m-0 mt-1">
                <p class="card-text mb-1">Shan Michal</p>
                <button class="btn btn-sm btn-outline-success rounded-5">Request</button>
              </div>
            </div>
            <div class="card shadow-lg rounded-4 border-dark border mx-2" style="width: 7.7rem; height: 9rem;">
              <img :src="require('/src/assets/img/remove.png')"
                   class="position-absolute"
                   style="top: 0; right: 0; width: 30px; height: 30px; transform: translate(50%, -50%);"
                   alt="Cancel Icon">
              <div class="rounded-circle border border-5 border-secondary m-auto mt-1"
                   style="width: 65px; height: 65px;">
                <img :src="require('/src/assets/img/user2.png')" class="img-fluid  rounded-circle"
                     alt="User 2" style="object-fit: cover; width: 100%; height: 100%;"/>
              </div>
              <div class="card-body text-center p-0 m-0 mt-1">
                <p class="card-text mb-1">Shan Michal</p>
                <button class="btn btn-sm btn-outline-success rounded-5">Request</button>
              </div>
            </div>
            <div class="card shadow-lg rounded-4 border-dark border" style="width: 7.7rem; height: 9rem;">
              <img :src="require('/src/assets/img/remove.png')"
                   class="position-absolute"
                   style="top: 0; right: 0; width: 30px; height: 30px; transform: translate(50%, -50%);"
                   alt="Cancel Icon">
              <div class="rounded-circle border border-5 border-secondary m-auto mt-1"
                   style="width: 65px; height: 65px;">
                <img :src="require('/src/assets/img/user2.png')" class="img-fluid  rounded-circle"
                     alt="User 2" style="object-fit: cover; width: 100%; height: 100%;"/>
              </div>
              <div class="card-body text-center p-0 m-0 mt-1">
                <p class="card-text mb-1">Shan Michal</p>
                <button class="btn btn-sm btn-outline-success rounded-5">Request</button>
              </div>
            </div>
          </div>

        </div>

        <img :src="require('/src/assets/img/bell.png')" class="position-absolute bottom-0 start-0 mb-3 ms-3"
             style="width: 30px; height: 30px; object-fit: contain;" alt="Bell icon">

      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'AudioCallView',
  computed: {
    ...mapGetters('audio', ['inCall', 'localStream', 'remoteStream', 'isConnected', 'showIncomingCallModal', 'callerName', 'localUserId']),
    ...mapGetters('matching', ['matching', 'matchAcceptanceStatus', 'matchedUserName', 'matchedAchievement', 'matchedProficiencyLevel', 'matchedRating','matchedUserMatchAcceptanceStatus']),
    matchFound() {
      return this.matching && this.matchedUserId !== null;
    },
    matchAccepted() {
      return this.matchAcceptanceStatus === 'ACCEPTED';
    },
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
    ...mapActions('matching', ['startMatching', "acceptMatch", "declineMatch", "listenForMatchAcceptance"]),
    acceptCall() {
      this.callAcceptReject({action: 'accept'});
    },
    declineCall() {
      this.callAcceptReject({action: 'decline'});
    },
    matchView() {
      this.$router.push("/match");
    },
  },
};
</script>

<style scoped>

.link-img-container {
  margin-right: 5px;
  margin-left: 5px;
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-text {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  background: linear-gradient(45deg, #ff6a00, #ff00c6, #00aaff, #00ffcc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2), -2px -2px 8px rgba(0, 0, 0, 0.2);
  animation: glow 1.5s ease-in-out infinite alternate;
}

@keyframes glow {
  0% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.3);
  }
  100% {
    text-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 45px rgba(255, 255, 255, 0.6);
  }
}

.loader {
  display: inline-grid;
  padding: 5px;
  background: #fff;
  filter: blur(4px) contrast(12);
}

.loader:before {
  content: "";
  height: 40px;
  aspect-ratio: 3;
  --c: #0000 64%, #000 66% 98%, #0000 101%;
  background: radial-gradient(35% 146% at 50% 159%, var(--c)) 0 0,
  radial-gradient(35% 146% at 50% -59%, var(--c)) 100% 100%;
  background-size: calc(200% / 3) 50%;
  background-repeat: repeat-x;
  -webkit-mask: repeating-linear-gradient(90deg, #000 0 10%, #0000 0 20%);
  animation: l12 .8s infinite linear;
}

@keyframes l12 {
  to {
    background-position: -200% 0, -100% 100%
  }
}

</style>


