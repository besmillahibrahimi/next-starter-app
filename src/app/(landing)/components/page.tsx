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
import { Direction, HorizontalDirection } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import SelectInput from "@/components/molecules/SelectInput";
import CustomSelect from "@/components/molecules/select/MySelect";

const variants: Record<string, string[]> = {
  variant: [
    "primary",
    "secondaryGray",
    "secondaryColor",
    "tertiaryGray",
    "tertiaryColor",
    "linkGray",
    "linkColor",
    "destructivePrimary",
    "secondary",
    "tertiary",
    "link",
  ],
  size: [
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "icon_sm",
    "icon_md",
    "icon_lg",
    "icon_xl",
    "icon_2xl",
  ],
};

export default function Components() {
  const [progress, setProgress] = useState(0);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isChecked, setIsChecked] = useState<true | false | "indeterminate">(
    "indeterminate"
  );

  useEffect(() => {
    const timer = setTimeout(() => setProgress(30), 1000);
    return () => clearTimeout(timer);
  }, []);

  const onCheckHandler = () => {
    isChecked == "indeterminate"
      ? setIsChecked(true)
      : isChecked == true
      ? setIsChecked(false)
      : setIsChecked(true);
  };

  const boolToString = (bool: boolean | string) => `${bool}`;
  const stringToBool = (bool: boolean | string): boolean | "indeterminate" =>
    bool === "true" ? true : bool === "false" ? false : "indeterminate";

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
                    <CgSun />
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

                    <span className="group-hover:hidden">{variant}</span>

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
              <Button variant="primary">Hover</Button>
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

      <h1 className="mt-16 utility font-bold tablet:text-wrap sm:text-wrap container">
        Progress
      </h1>
      <div className="flex flex-col space-x-8 px-8">
        <Progress value={progress} />
        <Progress
          value={30}
          showPercentageText={true}
          positionPercentageText={Direction.BOTTOM}
        />
        <Progress value={100} showPercentageText={true} />
        <Progress value={37} showPercentageText={true} />
        <Progress value={0} showPercentageText={true} />

        <Progress value={70} showPercentageCard={true} />
        <Progress value={37} showPercentageCard={true} />
        <Progress value={58} showPercentageCard={true} />
        <Progress
          value={10}
          showPercentageCard={true}
          positionPercentageCard={Direction.BOTTOM}
        />
      </div>
      <div className="flex space-x-8 px-8 py-8">
        <CircularProgress value={progress} shape="halfCircle" />
        <CircularProgress value={progress} shape="halfCircle" direction="rtl" />
        <CircularProgress value={40} />
        <CircularProgress value={75} label="Active Users" />
        <CircularProgress
          value={50}
          size={200}
          strokeWidth={12}
          shape="halfCircle"
          direction="rtl"
          renderLabel={(value) => (
            <div className="">
              <h6>active users</h6>
              <h6 className="text-4xl font-bold">{value}%</h6>
            </div>
          )}
        />
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="controlled-switch"
            checked={isSwitchOn}
            onCheckedChange={setIsSwitchOn}
            size="md"
          />
          <Label htmlFor="controlled-switch">{isSwitchOn ? "On" : "Off"}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="disabled-switch" disabled />
          <Label htmlFor="disabled-switch">Disabled</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="disabled-checked-switch" disabled defaultChecked />
          <Label htmlFor="disabled-checked-switch">Disabled Checked </Label>
        </div>
      </div>

      <div className="flex justify-center items-center w-full space-x-4 ">
        <div>
          <Checkbox
            id="terms1"
            checked={isChecked}
            onClick={() => onCheckHandler()}
            title="Remember me"
            desc="Save my login details for next time"
          />
        </div>

        <Checkbox id="terms2" checked={isChecked} shape="square" />
        <Checkbox
          id="terms3"
          checked={isChecked}
          onCheckedChange={setIsChecked}
          disabled
        />
        <Checkbox
          id="terms4"
          checked={isChecked}
          onClick={() => onCheckHandler()}
          size="md"
          shape="square"
          disabled
        />
        <Checkbox
          id="terms4"
          checked={isChecked}
          onClick={() => onCheckHandler()}
          size="md"
          shape="square"
        />

        <RadioGroup
          value={boolToString(isChecked)}
          defaultValue={boolToString(isChecked)}
          onValueChange={(v) => setIsChecked(stringToBool(v))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="indeterminate" id="r1" />
            <Label htmlFor="r1">indeterminate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={"true"} id="r2" />
            <Label htmlFor="r2">True</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={"false"} id="r3" />
            <Label htmlFor="r3">False</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-start w-full space-x-4 px-8 ">
        <Badge variant={"pillColor"} size="sm">
          pillColor
          <CgMoon />
        </Badge>
        <Badge variant={"pillOutline"} size="sm">
          pillOutline
          <CgMoon />
        </Badge>
        <Badge variant={"badgeColor"} size="sm">
          badgeColor
          <CgMoon />
        </Badge>
        <Badge variant={"badgeModern"} size="sm">
          badgeModern
          <CgMoon />
        </Badge>
      </div>

      <div className="flex justify-start w-full space-x-4 px-8 ">
        <Badge variant={"pillColor"} size="md">
          pillColor
        </Badge>
        <Badge variant={"pillOutline"} size="md">
          pillOutline
        </Badge>
        <Badge variant={"badgeColor"} size="md">
          badgeColor
        </Badge>
        <Badge variant={"badgeModern"} size="md">
          badgeModern
        </Badge>
      </div>

      <div className="flex justify-start w-full space-x-4 px-8 ">
        <Badge variant={"pillColor"} size="lg">
          pillColor
        </Badge>
        <Badge variant={"pillOutline"} size="lg">
          pillOutline
        </Badge>
        <Badge variant={"badgeColor"} size="lg">
          badgeColor
        </Badge>
        <Badge variant={"badgeModern"} size="lg">
          badgeModern
        </Badge>
      </div>

      <div className="flex justify-start w-full space-x-4 px-8 ">
        <Badge variant={"pillColor"} size="icon_sm">
          <CgMoon />
        </Badge>
        <Badge variant={"pillOutline"} size="icon_sm">
          <CgMoon />
        </Badge>
        <Badge variant={"badgeColor"} size="icon_sm">
          <CgMoon />
        </Badge>
        <Badge variant={"badgeModern"} size="icon_sm">
          <CgMoon />
        </Badge>
      </div>

      <div className="flex justify-start w-full space-x-4 px-8 ">
        <Badge variant={"pillColor"} size="icon_md">
          <CgMoon />
        </Badge>
        <Badge variant={"pillOutline"} size="icon_md">
          <CgMoon />
        </Badge>
        <Badge variant={"badgeColor"} size="icon_md">
          <CgMoon />
        </Badge>
        <Badge variant={"badgeModern"} size="icon_md">
          <CgMoon />
        </Badge>
      </div>

      <div className="flex justify-start w-full space-x-4 px-8 ">
        <Badge variant={"pillColor"} size="icon_lg">
          <CgMoon />
        </Badge>
        <Badge variant={"pillOutline"} size="icon_lg">
          <CgMoon />
        </Badge>
        <Badge variant={"badgeColor"} size="icon_lg">
          <CgMoon />
        </Badge>
        <Badge variant={"badgeModern"} size="icon_lg">
          <CgMoon />
        </Badge>
      </div>
    </div>
  );
}
