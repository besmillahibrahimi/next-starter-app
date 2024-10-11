"use client";

import { Command as CommandPrimitive, useCommandState } from "cmdk";
import * as React from "react";
import { forwardRef, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { CgSun } from "react-icons/cg";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import { InputClasses } from "@/lib/styles/common";

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;

  /** Group the options by providing key. */
  [key: string]: any;
}

interface GroupOption {
  [key: string]: Option[];
}

interface MultipleSelectorProps {
  value?: Option[];
  defaultOptions?: Option[];
  /** manually controlled options */
  options?: Option[];
  placeholder?: string;
  /** Loading component. */
  loadingIndicator?: React.ReactNode;
  /** Empty component. */
  emptyIndicator?: React.ReactNode;
  /** Debounce time for async search. Only work with `onSearch`. */
  delay?: number;
  /**
   * Only work with `onSearch` prop. Trigger search when `onFocus`.
   * For example, when user click on the input, it will trigger the search to get initial options.
   **/
  triggerSearchOnFocus?: boolean;
  /** async search */
  onSearch?: (value: string) => Promise<Option[]>;
  /**
   * sync search. This search will not showing loadingIndicator.
   * The rest props are the same as async search.
   * i.e.: creatable, groupBy, delay.
   **/
  onSearchSync?: (value: string) => Option[];
  onChange?: (options: Option[] | string[] | unknown[]) => void;

  /** Limit the maximum number of selected options. */
  maxSelected?: number;
  /** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
  onMaxSelected?: (maxLimit: number) => void;
  /** Hide the placeholder when there are options selected. */
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  /** Group the options base on provided key. */
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  /**
   * First item selected is a default behavior by cmdk. That is why the default is true.
   * This is a workaround solution by add a dummy item.
   *
   * @reference: https://github.com/pacocoursey/cmdk/issues/171
   */
  selectFirstItem?: boolean;
  /** Allow user to create option when there is no option matched. */
  creatable?: boolean;
  /** Props of `Command` */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  /** Props of `CommandInput` */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "value" | "placeholder" | "disabled"
  >;
  /** hide the clear all button. */
  hideClearAllButton?: boolean;
  type?: "badge" | "text";
  renderItem?: (item: SelectItemType | any) => React.ReactNode;
  renderSelectedItems?: (
    items: SelectItemType[] | any[],
    unselectItem?: (item: SelectItemType | any) => void
  ) => React.ReactNode;
  getItemValue?: (item: SelectItemType | any) => string;
  onChangeValue?: (item: SelectItemType | any) => any;

  wrapSelectedItem?: boolean;
  size?: "sm" | "md";
}

export interface MultipleSelectorRef {
  selectedValue: Option[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: Option[], groupBy?: string) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      "": options,
    };
  }

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption: GroupOption, picked: Option[]) {
  return groupOption;
  const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption;

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (val) => !picked.find((p) => p.value === val.value)
    );
  }
  return cloneOption;
}

function isOptionsExist(groupOption: GroupOption, targetOption: Option[]) {
  for (const [, value] of Object.entries(groupOption)) {
    if (
      value.some((option) => targetOption.find((p) => p.value === option.value))
    ) {
      return true;
    }
  }
  return false;
}

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
const CommandEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CommandPrimitive.Empty>
>(({ className, ...props }, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      ref={forwardedRef}
      className={cn("py-6 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});

CommandEmpty.displayName = "CommandEmpty";

const MultipleSelector = React.forwardRef<
  MultipleSelectorRef,
  MultipleSelectorProps
>(
  (
    {
      value,
      onChange,
      placeholder = "Search",
      defaultOptions: arrayDefaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      onSearchSync,
      loadingIndicator,
      emptyIndicator,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
      hideClearAllButton = false,
      renderItem,
      getItemValue,
      renderSelectedItems,
      onChangeValue,
      wrapSelectedItem = false,
      type = "text",
      size = "sm",
    }: MultipleSelectorProps,
    ref: React.Ref<MultipleSelectorRef>
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [onScrollbar, setOnScrollbar] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null); // Added this

    const getValue = (option: any) =>
      getItemValue
        ? getItemValue(option)
        : typeof option === "object"
        ? option.value
        : option;

    const mapValueToOption = React.useCallback(
      (value: string[] | any[]) =>
        typeof value[0] === "string"
          ? arrayOptions!.filter((o) =>
              value.includes(onChangeValue ? onChangeValue(o) : getValue(o))
            )
          : value,
      [value, arrayOptions]
    );

    const [selected, setSelected] = React.useState<Option[] | any[]>(
      value ?? []
    );
    const [options, setOptions] = React.useState<GroupOption>(
      transToGroupOption(arrayDefaultOptions, groupBy)
    );
    const [inputValue, setInputValue] = React.useState("");
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current as HTMLInputElement,
        focus: () => inputRef?.current?.focus(),
        reset: () => setSelected([]),
      }),
      [selected]
    );

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        inputRef.current.blur();
      }
    };

    const handleOnChangeOptions = React.useCallback(
      (options: Option[] | any[]) => options?.map(onChangeValue ?? getValue),
      [options]
    );

    const handleUnselect = React.useCallback(
      (option: Option) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        setSelected(newOptions);
        onChange?.(handleOnChangeOptions(newOptions));
      },
      [onChange, selected]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "" && selected.length > 0) {
              const lastSelectOption = selected[selected.length - 1];
              // If last item is fixed, we should not remove it.
              if (!lastSelectOption.fixed) {
                handleUnselect(selected[selected.length - 1]);
              }
            }
          }
          // This is not a default behavior of the <input /> field
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [handleUnselect, selected]
    );

    useEffect(() => {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchend", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      };
    }, [open]);

    useEffect(() => {
      if (value) {
        setSelected(mapValueToOption(value));
      }
    }, [value]);

    useEffect(() => {
      /** If `onSearch` is provided, do not trigger options updated. */
      if (!arrayOptions || onSearch) {
        return;
      }
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
    }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      /** sync search */

      const doSearchSync = () => {
        const res = onSearchSync?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
      };

      const exec = async () => {
        if (!onSearchSync || !open) return;

        if (triggerSearchOnFocus) {
          doSearchSync();
        }

        if (debouncedSearchTerm) {
          doSearchSync();
        }
      };

      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    useEffect(() => {
      /** async search */

      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      };

      const exec = async () => {
        if (!onSearch || !open) return;

        if (triggerSearchOnFocus) {
          await doSearch();
        }

        if (debouncedSearchTerm) {
          await doSearch();
        }
      };

      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    const CreatableItem = () => {
      if (!creatable) return undefined;
      if (
        isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
        selected.find((s) => s.value === inputValue)
      ) {
        return undefined;
      }

      const Item = (
        <CommandItem
          value={inputValue}
          className="cursor-pointer"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value: string) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length);
              return;
            }
            setInputValue("");
            const newOptions = [...selected, { value, label: value }];
            setSelected(newOptions);
            onChange?.(handleOnChangeOptions(newOptions));
          }}
        >
          {`Create "${inputValue}"`}
        </CommandItem>
      );

      // For normal creatable
      if (!onSearch && inputValue.length > 0) {
        return Item;
      }

      // For async search creatable. avoid showing creatable item before loading at first.
      if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
        return Item;
      }

      return undefined;
    };

    const EmptyItem = React.useCallback(() => {
      if (!emptyIndicator) return undefined;

      // For async search that showing emptyIndicator
      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          <CommandItem value="-" disabled>
            {emptyIndicator}
          </CommandItem>
        );
      }

      return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
    }, [creatable, emptyIndicator, onSearch, options]);

    const selectables = React.useMemo<GroupOption>(
      () => removePickedOption(options, selected),
      [options, selected]
    );

    /** Avoid Creatable Selector freezing or lagging when paste a long string. */
    const commandFilter = React.useCallback(() => {
      if (commandProps?.filter) {
        return commandProps.filter;
      }

      if (creatable) {
        return (value: string, search: string) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
        };
      }
      // Using default filter in `cmdk`. We don't have to provide it.
      return undefined;
    }, [creatable, commandProps?.filter]);

    const isInSelected = (candidate: SelectItemType | any) =>
      selected.some((o) => getValue(o) === getValue(candidate));

    return (
      <Command
        ref={dropdownRef}
        {...commandProps}
        onKeyDown={(e) => {
          handleKeyDown(e);
          commandProps?.onKeyDown?.(e);
        }}
        className={cn(
          " overflow-visible bg-transparent border border-primary rounded-md shadow-sm placeholder:text-muted-foreground [&>span]:line-clamp-1",
          `${
            disabled
              ? "cursor-not-allowed opacity-50 "
              : "ring-offset-background focus:outline-none focus:ring-2 focus:ring-brand hover:ring-brand hover:ring-2"
          }`,
          commandProps?.className
        )}
        shouldFilter={
          commandProps?.shouldFilter !== undefined
            ? commandProps.shouldFilter
            : !onSearch
        } // When onSearch is provided, we don't want to filter the options. You can still override it.
        filter={commandFilter()}
      >
        <div
          className={cn(
            "rounded-md border border-input text-sm flex justify-start items-center",
            {
              "": selected.length !== 0,
              "cursor-text": !disabled && selected.length !== 0,
            },
            InputClasses.size[size].default,
            className
          )}
          onClick={() => {
            if (disabled) return;
            inputRef?.current?.focus();
          }}
        >
          <div className=" flex justify-center items-center pr-3">
            <MagnifyingGlassIcon
              width="25"
              height="25"
              className="text-gray-400 h-[1.25rem] w-[1.25rem]"
            />
          </div>
          <div className={`overflow-hidden`}>
            {renderSelectedItems ? (
              <div
                className={`flex ${
                  wrapSelectedItem ? "flex-wrap" : "flex-nowrap"
                }`}
              >
                {renderSelectedItems(selected, handleUnselect)}
                {/* Avoid having the "Search" Icon */}
                <CommandPrimitive.Input
                  {...inputProps}
                  ref={inputRef}
                  value={inputValue}
                  disabled={disabled}
                  onValueChange={(value) => {
                    setInputValue(value);
                    inputProps?.onValueChange?.(value);
                  }}
                  onBlur={(event) => {
                    if (!onScrollbar) {
                      setOpen(false);
                    }
                    inputProps?.onBlur?.(event);
                  }}
                  onFocus={(event) => {
                    setOpen(true);
                    triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
                    inputProps?.onFocus?.(event);
                  }}
                  placeholder={
                    hidePlaceholderWhenSelected && selected.length !== 0
                      ? ""
                      : placeholder
                  }
                  className={cn(
                    "flex-1 bg-transparent outline-none  text-placeholder ",
                    `${disabled ? "cursor-not-allowed opacity-50 " : ""}`,
                    {
                      "w-full": hidePlaceholderWhenSelected,
                      "px-3 py-2": selected.length === 0,
                      "ml-1": selected.length !== 0,
                    },
                    inputProps?.className
                  )}
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelected(selected.filter((s) => s.fixed));
                    onChange?.(
                      handleOnChangeOptions(selected.filter((s) => s.fixed))
                    );
                  }}
                  className={cn(
                    "absolute right-0 h-6 w-6 p-0",
                    (hideClearAllButton ||
                      disabled ||
                      selected.length < 1 ||
                      selected.filter((s) => s.fixed).length ===
                        selected.length) &&
                      "hidden"
                  )}
                >
                  {/* <Cross2Icon /> */}
                </button>
              </div>
            ) : (
              <div
                className={` flex ${
                  wrapSelectedItem
                    ? "flex-wrap gap-y-1"
                    : "flex-nowrap overflow-x-auto scroll-h-small"
                } gap-x-2 pl-1 `}
              >
                {selected?.map((option) => {
                  return (
                    <>
                      {type == "badge" ? (
                        <Badge
                          size={"sm"}
                          key={option.value}
                          className={cn(
                            "py-xxs px-xs data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground",
                            "data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground",

                            badgeClassName
                          )}
                          data-fixed={option.fixed}
                          data-disabled={disabled || undefined}
                          variant={"badgeColor"}
                        >
                          {renderItem ? renderItem(option) : option.label}
                          <button
                            className={cn(
                              "rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
                              (disabled || option.fixed) && "hidden"
                            )}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleUnselect(option);
                              }
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onClick={() => handleUnselect(option)}
                          >
                            <Cross2Icon
                              width="10"
                              height="10"
                              className="text-fg-quinary"
                            />
                          </button>
                        </Badge>
                      ) : renderItem ? (
                        renderItem(option)
                      ) : (
                        <p className="text-text-md font-medium text-primary">
                          {option.label}
                        </p>
                      )}
                    </>
                  );
                })}
                {/* Avoid having the "Search" Icon */}
                <CommandPrimitive.Input
                  {...inputProps}
                  ref={inputRef}
                  value={inputValue}
                  disabled={disabled}
                  onValueChange={(value) => {
                    setInputValue(value);
                    inputProps?.onValueChange?.(value);
                  }}
                  onBlur={(event) => {
                    if (!onScrollbar) {
                      setOpen(false);
                    }
                    inputProps?.onBlur?.(event);
                  }}
                  onFocus={(event) => {
                    setOpen(true);
                    triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
                    inputProps?.onFocus?.(event);
                  }}
                  placeholder={
                    hidePlaceholderWhenSelected && selected.length !== 0
                      ? ""
                      : placeholder
                  }
                  className={cn(
                    "flex-1 outline-none  text-placeholder ",
                    `${disabled ? "cursor-not-allowed opacity-50 " : ""}`,

                    {
                      "w-full": hidePlaceholderWhenSelected,
                      "px-3 py-xxs": selected.length === 0,
                      "ml-1": selected.length !== 0,
                    },
                    inputProps?.className
                  )}
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelected(selected.filter((s) => s.fixed));
                    onChange?.(
                      handleOnChangeOptions(selected.filter((s) => s.fixed))
                    );
                  }}
                  className={cn(
                    "absolute right-0 h-6 w-6 p-0",
                    (hideClearAllButton ||
                      disabled ||
                      selected.length < 1 ||
                      selected.filter((s) => s.fixed).length ===
                        selected.length) &&
                      "hidden"
                  )}
                >
                  {/* <Cross2Icon /> */}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="relative ">
          {open && (
            <CommandList
              className="absolute top-1 z-10 w-full rounded-md border bg-primary text-popover-foreground shadow-md outline-none animate-in"
              onMouseLeave={() => {
                setOnScrollbar(false);
              }}
              onMouseEnter={() => {
                setOnScrollbar(true);
              }}
              onMouseUp={() => {
                inputRef?.current?.focus();
              }}
            >
              {isLoading ? (
                <>{loadingIndicator}</>
              ) : (
                <>
                  {EmptyItem()}
                  {CreatableItem()}
                  {!selectFirstItem && (
                    <CommandItem value="-" className="hidden" />
                  )}
                  {Object.entries(selectables).map(([key, dropdowns]) => (
                    <CommandGroup
                      key={key}
                      heading={key}
                      className="h-full overflow-auto"
                    >
                      <>
                        {dropdowns.map((option) => {
                          return (
                            <CommandItem
                              node={option?.node}
                              key={option.value}
                              value={option.value}
                              disabled={option.disable}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={() => {
                                if (selected.length >= maxSelected) {
                                  onMaxSelected?.(selected.length);
                                  return;
                                }
                                setInputValue("");
                                if (!isInSelected(option)) {
                                  const newOptions = [...selected, option];
                                  setSelected(newOptions);
                                  onChange?.(handleOnChangeOptions(newOptions));
                                }
                              }}
                              className={cn(
                                `cursor-pointer flex items-center justify-between my-1 ${
                                  isInSelected(option) &&
                                  "bg-active pointer-events-none text-muted-foreground opacity-50"
                                }`,
                                option.disable &&
                                  "cursor-default text-muted-foreground pointer-events-none opacity-50"
                              )}
                            >
                              {renderItem ? renderItem(option) : option?.label}
                              {isInSelected(option) && (
                                <CheckIcon className="h-4 w-4" />
                              )}
                            </CommandItem>
                          );
                        })}
                      </>
                    </CommandGroup>
                  ))}
                </>
              )}
            </CommandList>
          )}
        </div>
      </Command>
    );
  }
);

MultipleSelector.displayName = "MultipleSelector";
export default MultipleSelector;
