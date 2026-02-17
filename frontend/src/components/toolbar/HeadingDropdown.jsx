import { DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
 } from "../ui/dropdown-menu";

import { Button } from "../ui/button"


const HeadingDropdown = ({ editor }) => {

    if (!editor) {
      return null;
    }

    const getActiveLevel = () => {
      for (let level = 1; level <= 4; level++) {
        if (editor.isActive("heading", {level})) {
          return level;
        }
      }
      return null;
    }

    const activeLevel = getActiveLevel();
    const currentLevel = activeLevel ? `H${activeLevel}` : 'P';
    const isHeadingActive = activeLevel !== null;

    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className={`
            px-2 py-1 rounded text-sm
            ${isHeadingActive ? "bg-accent" : ""}
          `}
          variant="ghost"
          size="sm"
        >
          {currentLevel}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().setParagraph().run()
          }
        >
          Paragraph
        </DropdownMenuItem>

        {[1, 2, 3, 4].map(level => (
          <DropdownMenuItem
            key={level}
            onClick={() =>
              editor.chain().focus().setHeading({ level }).run()
            }
            className={
              editor.isActive("heading", { level })
                ? "font-bold"
                : ""
            }
          >
            Heading {level}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

        
}

export default HeadingDropdown;