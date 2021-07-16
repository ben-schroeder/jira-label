# jira-label
Add a label to an issue.

Heavily inspired by [atlassian/gajira-comment](https://github.com/atlassian/gajira-comment)

> ##### Only supports Jira Cloud. Does not support Jira Server (hosted)

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

```yaml
- name: Login
  uses: atlassian/gajira-login@master
  env:
    JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
    JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
    JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}

- name: Label issue
  uses: ben-schroeder/jira-label@v1
  with:
    issue: ABC-123
    label: shiny-new-label
```

Or you can use [Jira Find Issue Key Action](https://github.com/marketplace/actions/gajira-find-issue-key):

```yaml
- name: Login
  uses: atlassian/gajira-login@master
  env:
    JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
    JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
    JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}

- name: Find issue key in commit messages
  id: find-issue
  uses: atlassian/gajira-find-issue-key@master
  with:
    from: commits

- name: Label issue
  uses: ben-schroeder/jira-label@v1
  with:
    issue: ${{ steps.find-issue.outputs.issue }}
    label: shiny-new-label
```
