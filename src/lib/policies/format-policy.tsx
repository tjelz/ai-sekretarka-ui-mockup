import React from 'react';

/**
 * Formats policy text content into properly structured HTML with headings, lists, and sections
 */
export function formatPolicyContent(content: string): React.ReactNode {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      continue;
    }

    // Main title (first line or lines without numbers)
    if (i < 3 && !line.match(/^\d+\./)) {
      elements.push(
        <h1 key={`title-${key++}`} className="text-3xl font-bold text-gray-900 mb-4">
          {line}
        </h1>
      );
      continue;
    }

    // Date lines
    if (line.startsWith('Obowiązuje od:') || line.startsWith('Ostatnia aktualizacja:')) {
      elements.push(
        <p key={`date-${key++}`} className="text-sm text-gray-600 mb-2">
          {line}
        </p>
      );
      continue;
    }

    // Separator line
    if (line === '⸻' || line === '---') {
      elements.push(
        <hr key={`sep-${key++}`} className="my-8 border-gray-200" />
      );
      continue;
    }

    // Section headings (numbered)
    if (line.match(/^\d+\.\s+[A-ZĄĆĘŁŃÓŚŹŻ]/)) {
      const headingText = line.replace(/^\d+\.\s+/, '');
      elements.push(
        <h2 key={`heading-${key++}`} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          {line}
        </h2>
      );
      continue;
    }

    // Subsection headings (with letters or nested numbers)
    if (line.match(/^[A-Z]\.\s+/) || line.match(/^\d+\.\d+\.\s+/)) {
      elements.push(
        <h3 key={`subheading-${key++}`} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          {line}
        </h3>
      );
      continue;
    }

    // Bullet points
    if (line.startsWith('•') || line.startsWith('-')) {
      const text = line.replace(/^[•\-]\s*/, '');
      elements.push(
        <li key={`bullet-${key++}`} className="ml-6 mb-2 text-gray-700">
          {text}
        </li>
      );
      continue;
    }

    // Table rows (contains tabs or multiple pipes)
    if (line.includes('\t') || line.split('|').length > 2) {
      // Skip table formatting for now, treat as regular paragraph
      elements.push(
        <p key={`table-${key++}`} className="mb-4 text-gray-700 text-sm bg-gray-50 p-3 rounded">
          {line}
        </p>
      );
      continue;
    }

    // Regular paragraphs
    elements.push(
      <p key={`para-${key++}`} className="mb-4 text-gray-700 leading-relaxed">
        {line}
      </p>
    );
  }

  return <>{elements}</>;
}

/**
 * Parses policy metadata from content
 */
export function parsePolicyMetadata(content: string): {
  title: string;
  lastUpdated: string;
  effectiveDate: string;
} {
  const lines = content.split('\n');

  let title = lines[0]?.trim() || '';
  let effectiveDate = '';
  let lastUpdated = '';

  for (const line of lines.slice(0, 10)) {
    if (line.startsWith('Obowiązuje od:')) {
      effectiveDate = line.replace('Obowiązuje od:', '').trim();
    }
    if (line.startsWith('Ostatnia aktualizacja:')) {
      lastUpdated = line.replace('Ostatnia aktualizacja:', '').trim();
    }
  }

  return { title, lastUpdated, effectiveDate };
}
