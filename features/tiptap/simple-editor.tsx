'use client';

import { Emoji, gitHubEmojis } from '@tiptap/extension-emoji';
import { Highlight } from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import { Typography } from '@tiptap/extension-typography';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cn } from '@/lib/utils';

// --- Tiptap Node ---

import '@/features/tiptap/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/features/tiptap/tiptap-node/code-block-node/code-block-node.scss';
import '@/features/tiptap/tiptap-node/heading-node/heading-node.scss';
import '@/features/tiptap/tiptap-node/image-node/image-node.scss';
import '@/features/tiptap/tiptap-node/list-node/list-node.scss';
import '@/features/tiptap/tiptap-node/paragraph-node/paragraph-node.scss';

//
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);
lowlight.register({ js, ts });

interface SimpleEditorProps {
  content: string;
  words: number;
  onChange?: (content: string, words: number) => void;
  editable?: boolean;
  className?: string;
  id: string;
  disabled?: boolean;
}

export default function SimpleEditor({
  content,
  editable = false,
  className,
  disabled,
}: SimpleEditorProps) {
  const editor = useEditor({
    editable: editable && !disabled,
    extensions: [
      StarterKit,
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Typography,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Emoji.configure({
        emojis: gitHubEmojis.filter(
          (emoji) => !emoji.name.includes('regional')
        ),
        forceFallbackImages: true,
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
      },
    },
    content,
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="relative">
        <div className={cn('w-full', className)}>
          <EditorContent
            className={cn('whitespace-pre-wrap break-words')}
            disabled={disabled}
            editor={editor}
            role="presentation"
          />
        </div>
      </div>
    </EditorContext.Provider>
  );
}
