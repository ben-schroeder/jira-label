const Jira = require('./common/net/Jira')

module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const issueId = this.argv.issue || this.config.issue || null
    const { label: label } = this.argv

    if (issueId && label) {
      console.log(`Adding label to ${issueId}: \n${label}`)
      await this.Jira.addLabel(issueId, label)
    } else {
      console.log('No issue or label found.')
    }

    return {}
  }

}
