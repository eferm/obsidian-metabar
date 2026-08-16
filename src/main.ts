import { Plugin } from 'obsidian';

import { metadataPanel } from './metabar';

export default class MetaBarPlugin extends Plugin {
	onload(): void {
		this.registerEditorExtension(metadataPanel);
	}
}
