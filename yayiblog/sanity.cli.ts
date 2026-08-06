import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'b1ckqrmg',
    dataset: 'production'
  },
  deployment: {
    appId: 'b51mxvu6gcdlvwhwd7lwwrtb',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
