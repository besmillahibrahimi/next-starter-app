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
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import CircularProgress from "@/components/molecules/progress/CircularProgress";

const variants: Record<string, string[]> = {
  variant: ["default", "destructive", "outline", "secondary", "ghost", "link"],
  size: ["default", "sm", "lg", "icon"],
};

export default function Components() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(30), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col space-y-5 p-8">
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

      <div>
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
      </div>

      <div className="flex justify-between py-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
              {/* <div className="absolute w-2 h-2 bg-brand rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2" /> */}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipWrapper body="Tooltip :)">
          <Button>Tooltip</Button>
        </TooltipWrapper>

        <TooltipWrapper body="Tooltip :)">
          <Button>Tooltip</Button>
        </TooltipWrapper>

        <TooltipWrapper
          title={"hi"}
          body={`  dehwiuqe qeihfqiefiq qfiuhewe fijregvjieroierg dehwiuqe
                qeihfqiefiq qfiuhewe fijregvjieroiergdehwiuqe qeihfqiefiq
                qfiuhewe fijregvjieroiergdehwiuqe qeihfqiefiq qfiuhewe
                fijregvjieroierg`}
        >
          <Button>Tooltip</Button>
        </TooltipWrapper>

        <TooltipWrapper
          title={"hi"}
          body={`  dehwiuqe qeihfqiefiq qfiuhewe fijregvjieroierg dehwiuqe
                qeihfqiefiq qfiuhewe fijregvjieroiergdehwiuqe qeihfqiefiq
                qfiuhewe fijregvjieroiergdehwiuqe qeihfqiefiq qfiuhewe
                fijregvjieroierg`}
        >
          <span>
            <CgMoon size={40} />
          </span>
        </TooltipWrapper>
      </div>

      <h1 className="mt-16 text-primary font-bold tablet:text-wrap sm:text-wrap container">
        Progress
      </h1>
      <div className="flex space-x-8 px-8">
        <Progress value={30} />
        <Progress value={50} />
        <Progress value={70} />
        <Progress value={60} />
        <Progress value={10} />
        <Progress value={100} />
        <Progress value={0} />
        <Progress value={progress} />
        <Progress value={10}></Progress>
      </div>
      <div className="flex space-x-8 px-8 py-8">
        <CircularProgress value={progress} shape="halfCircle" />
        <CircularProgress value={progress} shape="halfCircle" direction="rtl" />
        <CircularProgress value={50} size={80} strokeWidth={5} />
        <CircularProgress value={75} size={160} strokeWidth={12} label="hiii" />
        <CircularProgress
          value={90}
          size={200}
          strokeWidth={12}
          shape="halfCircle"
        />
        <CircularProgress
          value={10}
          size={200}
          strokeWidth={12}
          shape="halfCircle"
          direction="rtl"
        />
      </div>
    </div>
  );
}
