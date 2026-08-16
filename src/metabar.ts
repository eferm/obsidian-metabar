import type { EditorState } from '@codemirror/state';
import { type EditorView, type Panel, showPanel, type ViewUpdate } from '@codemirror/view';
import { editorInfoField, type TFile } from 'obsidian';

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
});

function formatDate(timestamp: number): string {
	return DATE_FORMATTER.format(new Date(timestamp));
}

function formatMetadata(file: TFile): string {
	return `Created: ${formatDate(file.stat.ctime)}  ·  Modified: ${formatDate(file.stat.mtime)}`;
}

function updatePanel(dom: HTMLElement, state: EditorState): void {
	const file = state.field(editorInfoField, false)?.file;
	dom.textContent = file ? formatMetadata(file) : '';
}

function createMetadataPanel(view: EditorView): Panel {
	const dom = createDiv({ cls: 'metabar' });
	updatePanel(dom, view.state);

	let container: HTMLElement;

	return {
		top: true,
		dom,
		mount(): void {
			container = dom.parentElement as HTMLElement;
			container.classList.add('metabar-container');
		},
		update(update: ViewUpdate): void {
			updatePanel(dom, update.state);
		},
		destroy(): void {
			container.classList.remove('metabar-container');
		},
	};
}

export const metadataPanel = showPanel.of(createMetadataPanel);
