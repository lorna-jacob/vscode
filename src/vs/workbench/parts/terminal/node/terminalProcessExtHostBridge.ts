/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ITerminalChildProcess, IMessageToTerminalProcess, IMessageFromTerminalProcess } from 'vs/workbench/parts/terminal/node/terminal';
import { EventEmitter } from 'events';

export class TerminalProcessExtHostBridge extends EventEmitter implements ITerminalChildProcess {
	public connected: boolean;

	constructor() {
		super();

		let i = 0;
		setTimeout(() => {
			this.emit('message', { type: 'pid', content: -1 } as IMessageFromTerminalProcess);
			this.emit('message', { type: 'data', content: `test ${i++}\r\n` } as IMessageFromTerminalProcess);
		}, 0);
		setInterval(() => {
			this.emit('message', { type: 'data', content: `test ${i++}\r\n` } as IMessageFromTerminalProcess);
		}, 1000);
	}

	public send(message: IMessageToTerminalProcess): boolean {
		console.log('TerminalProcessExtHostBridge#send', arguments);
		return true;
	}
}