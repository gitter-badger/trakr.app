<template>
  <div>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          target="_blank"
          :href="bugurl"
          v-on="on"
        >
          <v-icon>mdi-bug</v-icon>
        </v-btn>
      </template>
      <span>Report bug</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  data: () => ({
    gitIssueUrl: 'https://github.com/GREEB/trakr.app/issues/new?assignees=&labels=&template=bug_report.md&title='
  }),
  computed: {
    bugurl () {
      return this.gitIssueUrl + encodeURIComponent('Issue on: /' + this.$route.name + ' READ OPEN ISSUES FIRST, THANKS')
    }
  }
}
</script>
