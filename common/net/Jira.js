const serviceName = 'jira'
const { format } = require('url')
const client = require('./client')(serviceName)

class Jira {
    constructor ({ baseUrl, token, email }) {
        this.baseUrl = baseUrl
        this.token = token
        this.email = email
    }

    async addLabel (issueId, data) {
        return this.fetch('addLabel', {
            pathname: `/rest/api/2/issue/${issueId}`,
        }, {
            method: 'PUT',
            body: JSON.stringify({update:{labels:[{add: data}]}}),
        })
    }

    async fetch (apiMethodName,
                 { host, pathname, query },
                 { method, body, headers = {} } = {}) {
        const url = format({
            host: host || this.baseUrl,
            pathname,
            query,
        })

        if (!method) {
            method = 'GET'
        }

        if (headers['Content-Type'] === undefined) {
            headers['Content-Type'] = 'application/json'
        }

        if (headers.Authorization === undefined) {
            headers.Authorization = `Basic ${Buffer.from(`${this.email}:${this.token}`).toString('base64')}`
        }

        // strong check for undefined
        // cause body variable can be 'false' boolean value
        if (body && headers['Content-Type'] === 'application/json') {
            body = JSON.stringify(body)
        }

        const state = {
            req: {
                method,
                headers,
                body,
                url,
            },
        }

        try {
            await client(state, `${serviceName}:${apiMethodName}`)
        } catch (error) {
            const fields = {
                originError: error,
                source: 'jira',
            }

            delete state.req.headers

            throw Object.assign(
                new Error('Jira API error'),
                state,
                fields
            )
        }

        return state.res.body
    }
}

module.exports = Jira
