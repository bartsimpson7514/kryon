// Function to format JSON with color
const formatJsonWithColor = (json: Record<string, any>) => {
  const jsonString = JSON.stringify(json, null, 2)

  // Regex to find JSON keys and values
  const jsonKeyRegex = /"([\w]+)":/g
  const jsonValueRegex = /: ("[^"]*"|[\d.]+|true|false|null)/g

  return jsonString
    .replace(jsonKeyRegex, '<span class="json-key">"$1"</span>:')
    .replace(jsonValueRegex, ': <span class="json-value">$1</span>')
}

export default formatJsonWithColor
