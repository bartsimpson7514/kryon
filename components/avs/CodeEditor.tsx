"use client"

import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs"
import "prismjs/themes/prism-tomorrow.min.css"
import "prismjs/components/prism-go"

function CodeEditor({ value, onChange }: any) {
  return (
    <div className="h-56 overflow-scroll rounded-md border-none bg-dimgrey p-2 text-16">
      <Editor
        value={value || ""}
        onValueChange={onChange}
        highlight={(code) => highlight(code, languages.go, "go")}
        padding={10}
        style={{
          fontFamily: "monospace",
          fontSize: 16,
          minHeight: "8rem",
          width: "100%",
          outline: "0",
          boxShadow: "none",
        }}
        className="code-editor !outline-0" // Add your custom class here
      />
    </div>
  )
}

export default CodeEditor
