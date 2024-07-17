import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";



interface IMyInput extends  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    control: any;    
    formMessage: any;
    className: string;
    name: string;
    label: string;
}


const MyInput: React.FC<IMyInput> = (params: IMyInput) => {

    return(
        <FormField
        control={params.control}
        name={params.name}
        render={({ field }) => (
            <FormItem className={params.className}>
                <FormLabel>{params.label}</FormLabel>
                <FormControl>
                    <Input {...field} type={params.type} />
                </FormControl>

                <FormMessage className="text-red-700"/>

            </FormItem>
        )}
        />
    )


}

export default MyInput;


