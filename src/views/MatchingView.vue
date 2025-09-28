<template>
<!--  <div v-if="!matching">-->
    <button class="btn btn-primary mb-3" @click="startMatching">Start Matching</button>
<!--  </div>-->

<!--  <div v-else>-->
    <!--    <MatchedUserCard :user="currentMatchedUser" />-->
    <div class="alert alert-info">
      {{ matchedUserName }}
    </div>
    <div>

      <button @click="connectSocket">Accept</button>
      <button @click="acceptMatch">Accept</button>
      <button @click="declineMatch">Decline</button>
    </div>

    <div v-if="matchAcceptanceStatus === 'PENDING'">
      Waiting for the other user to respond...
    </div>
<!--  </div>-->

</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'MatchingView',
  computed: {
    ...mapGetters('matching', ['matching', 'matchAcceptanceStatus', 'matchedUserName'])
  },
  watch: {},

  methods: {
    ...mapActions('matching', ['startMatching',"acceptMatch","declineMatch","listenForMatchAcceptance"]),
    ...mapActions('audio',['connectSocket']),
  },
};

</script>
