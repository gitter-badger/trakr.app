<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn
        dark
        v-bind="attrs"
        icon
        small
        v-on="on"
      >
        <v-icon v-if="IOconnected && udpConnected" x-small color="success">
          mdi-wifi-strength-4
        </v-icon>
        <v-icon v-else-if="IOconnected || udpConnected" x-small color="warning">
          mdi-wifi-strength-1
        </v-icon>
        <v-icon v-else x-small color="error">
          mdi-wifi-strength-outline
        </v-icon>
      </v-btn>
    </template>
    <v-card offset-x="true">
      <v-app-bar
        flat
        color="rgba(0, 0, 0, 0)"
      >
        <v-toolbar-title class="text-h6 pl-0">
          Connection
        </v-toolbar-title>

        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-chip
              v-bind="attrs"
              small
              outlined
              class="mx-3"
              :color="IOconnected ? 'success' : 'error'"
              v-on="on"
            >
              Socket.io
            </v-chip>
          </template>
          <span>{{ IOconnected ? 'Realtime connection established to trakr.app' : 'Not connected to trakr.app sockets' }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-chip
              v-bind="attrs"
              small
              class="mr-3"
              outlined
              :color="udpConnected ? 'success' : 'error'"
              v-on="on"
            >
              Game
            </v-chip>
          </template>
          <span>{{ udpConnected ? 'Client connected' : 'no UDP client found with your IP' }}</span>
        </v-tooltip>
      </v-app-bar>
      <v-card-subtitle>
        Logs:
      </v-card-subtitle>
      <v-card-text>
        <pre><code v-highlight="connectionLog.join('')" class="logs" /></pre>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  data: () => ({
    logs: '',
    menu: false
  }),
  computed: {
    connectionLog () { return this.$store.state.connectionLog },
    IOconnected () { return this.$store.state.sio.connected },
    udpConnected () { return this.$store.state.udp.connected }

  },
  watch: {
    connectionLog (val, oldval) {
      if (val.length === 0) {
        this.logs = 'empty logs'
      } else {
        this.logs = val.join('')
      }
    }
  }
}
</script>
