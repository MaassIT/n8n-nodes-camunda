import {
	Duration,
	ZBClient,
	ZBClientOptions
} from 'zeebe-node';

import { IDataObject, IExecuteFunctions, ITriggerFunctions } from 'n8n-workflow';

export default async function getZeebeClient(this: IExecuteFunctions | ITriggerFunctions): Promise<ZBClient> {
  let zbClientOptions: ZBClientOptions = {} as ZBClientOptions;

	const credentials = await this.getCredentials('camundaApi') as IDataObject;

  zbClientOptions.useTLS = credentials.useTLS as boolean;
	zbClientOptions.retry = credentials.retry as boolean;
	zbClientOptions.maxRetries = credentials.maxRetries as number;
	zbClientOptions.maxRetryTimeout = Duration.seconds.of(credentials.maxRetryTimeout as number);

	if (credentials === undefined || credentials === null) {
		throw new Error('No credentials got returned!');
	}

	if (credentials.environment === 'cloud') {
		zbClientOptions.camundaCloud = {
			clientId: credentials.clientId as string,
			clientSecret: credentials.clientSecret as string,
			clusterId: credentials.clusterId as string,
		};
		return new ZBClient(zbClientOptions);
	} else if (credentials.environment === 'selfHostedOAuth') {
		zbClientOptions.oAuth = {
			url: credentials.oAuthTokenUrl as string,
			audience: credentials.audience as string,
			clientId: credentials.clientId as string,
			clientSecret: credentials.clientSecret as string,
		};
	} else if (credentials.environment === 'selfHostedBasicAuth') {
		zbClientOptions.basicAuth = {
			username: credentials.username as string,
			password: credentials.password as string,
		};
	}

	return new ZBClient(credentials.url as string, zbClientOptions);
}
