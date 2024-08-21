"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CgMoon, CgSun } from "react-icons/cg";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TooltipWrapper from "@/components/molecules/TooltipWrapper";
import { ArrowDirection, Direction } from "@/lib/constants";

const variants: Record<string, string[]> = {
  variant: ["default", "destructive", "outline", "secondary", "ghost", "link"],
  size: ["default", "sm", "lg", "icon"],
};

export default function Components() {
  return (
    <div className="flex flex-col space-y-5">
      <h1>Buttons</h1>
      {Object.keys(variants).map((key, i) => {
        return (
          <div key={key}>
            <h6>{key}</h6>
            <div className="flex space-x-4">
              {variants[key].map((variant, index) =>
                key === "size" ? (
                  <Button key={variant} size={variant as any}>
                    {variant}
                  </Button>
                ) : (
                  <Button
                    icon={<CgSun />}
                    iconPosition={"left"}
                    key={variant}
                    variant={variant as any}
                  >
                    <div className="group-hover:hidden">
                      <CgSun />
                    </div>

                    <div className="hidden group-hover:block">
                      <CgMoon />
                    </div>

                    <span className="group-hover:hidden">
                      Default {variant}
                    </span>

                    <span className="hidden group-hover:inline text-gray">
                      Hovered {variant}
                    </span>
                  </Button>
                )
              )}
            </div>
          </div>
        );
      })}

      <h1 className="mt-16 text-[#970f0f] font-[800] tablet:text-wrap sm:text-wrap container">
        Inputs
      </h1>
      {/* <div className="flex space-x-8">
        {Object.keys(inputVariants).map((item, i) => {
          return (
            <Input
              key={item}
              variant={item as any}
              //placeholder="Enter text"
              label="Default Input"
            />
          );
        })}
      </div> */}
      <div className="flex space-x-8">
        <Input
          variant="default"
          placeholder="Enter text"
          label="Default Input"
        />
        <Input variant="error" placeholder="Enter text" label="Error Input" />
        <Input
          variant="success"
          placeholder="Enter text"
          label="Success Input"
          className="pl-10"
          //disabled
        />
        <Input
          type="file"
          variant="file"
          placeholder="FILE :)"
          label="choose file"
        />
        <Input disabled placeholder="Disabled :(" />
      </div>

      <div>
        <div className="w-xs h-8 bg-brand-300-foreground text-gray-200-foreground rounded-xl text-[#fff] border-gray-200 border-2 ">
          test test test
        </div>
      </div>

      <div>
        <Input
          label="My Input"
          StartNode={<CgMoon className="bg-success-200" />}
          EndNode={<CgSun onClick={() => console.log("clicked end icon")} />}
        />
      </div>

      {/* <div>
        <div className="flex items-center">
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Choose an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
          <Input className="ml-2" placeholder="Enter text here" />
        </div>
      </div> */}

      <div className="flex w-[300px] items-center rounded-md overflow-hidden">
        {/* Select Component */}
        <Select>
          <SelectTrigger className="px-4 py-2 bg-gray-200 border-r w-1/3 rounded-r-none">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>

        {/* Input Component */}
        <Input
          placeholder="Enter text here"
          className="flex-1 px-4 py-2 rounded-l-none"
        />
      </div>

      <div className="flex justify-center border-tertiary bg-brand-warning-primary">
        <h1 className="font-bold text-2xl text-success-primary/50">
          H E L L O . . . :)
        </h1>
      </div>

      <div className="flex justify-around">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
              <div className="absolute w-2 h-2 bg-brand rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipWrapper triggerText="text" tooltipText="Tooltip text" />

        <TooltipWrapper
          triggerText={<Button>BOTTOM LEFT</Button>}
          tooltipText="Bottom Left Tooltip :)"
          arrowDirection={ArrowDirection.BOTTOM_LEFT}
          tooltipSide={Direction.TOP}
        />

        <TooltipWrapper
          triggerText={<Button>BOTTOM RIGHT</Button>}
          tooltipText="Bottom Right Tooltip :)"
          arrowDirection={ArrowDirection.BOTTOM_RIGHT}
          tooltipSide={Direction.TOP}
        />

        <TooltipWrapper
          triggerText={<Button>TOP</Button>}
          tooltipText="Top Tooltip :)"
          arrowDirection={ArrowDirection.BOTTOM}
          tooltipSide={Direction.TOP}
        />

        <TooltipWrapper
          triggerText={<Button>BOTTOM</Button>}
          tooltipText="Bottom  Tooltip :)"
          arrowDirection={ArrowDirection.TOP}
          tooltipSide={Direction.BOTTOM}
        />

        <TooltipWrapper
          triggerText={<Button>RIGHT</Button>}
          tooltipText="Right Tooltip :)"
          arrowDirection={ArrowDirection.RIGHT}
          tooltipSide={Direction.RIGHT}
        />

        <TooltipWrapper
          triggerText={<Button>LEFT</Button>}
          tooltipText="Left Tooltip :)"
          arrowDirection={ArrowDirection.LEFT}
          tooltipSide={Direction.LEFT}
        />

        <TooltipWrapper
          className="w-[270px]"
          triggerText={<Button>With Title</Button>}
          tooltipText={
            <div className="flex flex-col">
              <h1>Title</h1>
              <p>
                dehwiuqe qeihfqiefiq qfiuhewe fijregvjieroierg dehwiuqe
                qeihfqiefiq qfiuhewe fijregvjieroiergdehwiuqe qeihfqiefiq
                qfiuhewe fijregvjieroiergdehwiuqe qeihfqiefiq qfiuhewe
                fijregvjieroierg
              </p>
            </div>
          }
          // arrowDirection={ArrowDirection.LEFT}
          // tooltipSide={Direction.LEFT}
        />
      </div>
    </div>
  );
}
