import { Plugin } from 'obsidian';

import { createMetadataPanelExtension } from './metabar';

export default class MetaBarPlugin extends Plugin {
	onload(): void {
		this.registerEditorExtension(createMetadataPanelExtension(this.app.vault));
	}
}
