import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class CamundaApi implements ICredentialType {
	name = 'camundaApi';
	displayName = 'Camunda API';
	documentationUrl =
		'https://github.com/maassit/n8n-nodes-camunda/tree/master/docs/credentials.md';
	properties: INodeProperties[] = [
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
					{
							name: 'Cloud',
							value: 'cloud',
					},
					{
						name: 'Self Hosted with oAuth',
						value: 'selfHostedOAuth',
					},
					{
						name: 'Self Hosted with Basic Auth',
						value: 'selfHostedBasicAuth',
					},
					{
						name: 'Self Hosted without Auth',
						value: 'selfHosted',
					},
		],
			required: true,
			default: 'cloud',
		},
		{
			displayName: 'Camunda API URL',
			name: 'url',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
						environment: [
								'selfHosted',
								'selfHostedBasicAuth',
								'selfHostedOAuth',
						],
				},
			},
		},
		{
			displayName: 'Use TLS',
			name: 'useTLS',
			type: 'boolean',
			required: true,
			default: true,
			displayOptions: {
				show: {
						environment: [
								'selfHosted',
								'selfHostedBasicAuth',
								'selfHostedOAuth',
						],
				},
			},
			description:
				'Weather to use a https connection or a http connection.',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
						environment: [
								'selfHostedBasicAuth',
						],
				},
			},
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
						environment: [
								'selfHostedBasicAuth',
						],
				},
			},
		},
		{
			displayName: 'OAuth Token URL',
			name: 'oAuthTokenUrl',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
						environment: [
								'selfHostedOAuth',
						],
				},
			},
		},
		{
			displayName: 'Audience',
			name: 'audience',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
						environment: [
								'selfHostedOAuth',
						],
				},
			},
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
						environment: [
								'selfHostedOAuth',
								'cloud'
						],
				},
			},
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
						environment: [
								'selfHostedOAuth',
								'cloud'
						],
				},
			},
		},
		{
			displayName: 'Cluster ID',
			name: 'clusterId',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
						environment: [
								'cloud',
						],
				},
			},
		},
		{
			displayName: 'Cluster Region',
			name: 'clusterRegion',
			type: 'string',
			default: 'bru-2',
			displayOptions: {
				show: {
						environment: [
								'cloud',
						],
				},
			},
		},
		{
			displayName: 'Retry',
			name: 'retry',
			type: 'boolean',
			default: true,
		},
		{
			displayName: 'Max Retries',
			name: 'maxRetries',
			type: 'number',
			default: '-1',
			displayOptions: {
				show: {
						retry: [
								true,
						],
				},
			},
		},
		{
			displayName: 'Max Retry Timeout in seconds',
			name: 'maxRetryTimeout',
			type: 'number',
			default: 30,
			displayOptions: {
				show: {
						retry: [
								true,
						],
				},
			},
			description: 'Time in seconds to wait between retries',
		}
	];
}
