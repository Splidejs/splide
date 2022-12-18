import { buildHtml as _buildHtml, BuildHtmlConfig, insertHtml as _insertHtml, InsertHtmlConfig } from '@test';
import { SLIDES } from './pics';


export function buildHtml(config: BuildHtmlConfig = {}): string {
  const src = config.useImage ? SLIDES : undefined;
  return _buildHtml({ ...config, src });
}

export function insertHtml(config: InsertHtmlConfig = {}): void {
  const src = config.useImage ? SLIDES : undefined;
  _insertHtml({ ...config, src });
}