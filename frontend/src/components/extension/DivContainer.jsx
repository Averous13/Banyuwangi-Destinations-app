import { Node } from '@tiptap/core'

const DivContainer = Node.create({
  name: 'divContainer',
  
  group: 'block',
  
  content: 'block+',
  
  parseHTML() {
    return [
      {
        tag: 'div[data-type="container"]',
      },
    ]
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', { 
      'data-type': 'container',
      class: 'article-container'
    }, 0]
  },
  
  addCommands() {
    return {
      setDivContainer: () => ({ commands }) => {
        return commands.wrapIn(this.name)
      },
      toggleDivContainer: () => ({ commands }) => {
        return commands.toggleWrap(this.name)
      },
    }
  },
})

export default DivContainer