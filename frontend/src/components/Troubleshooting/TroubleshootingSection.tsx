"use client"

import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TroubleshootingSection = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content : `<p>Welcome to the Troubleshooting Section</p>`
  })
  return (
    <EditorContent editor={editor}/>
  )
}

export default TroubleshootingSection